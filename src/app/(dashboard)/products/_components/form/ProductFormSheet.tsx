"use client";

import { useRef, LegacyRef, useState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  FormSheetContent,
  FormSheetBody,
  FormSheetHeader,
  FormSheetFooter,
} from "@/components/shared/form/FormSheet";
import {
  FormTextInput,
  FormTextarea,
  FormPriceInput,
  FormSelectInput,
  FormCategoryInput,
  FormBrandInput
} from "@/components/shared/form";
import { SubmitButton } from "@/components/shared/form/SubmitButton";

import { productFormSchema } from "./schema";
import { objectToFormData } from "@/helpers/objectToFormData";
import { ProductServerActionResponse } from "@/types/server-action";

type ProductFormData = z.infer<typeof productFormSchema>;

const defaultVariant = {
  color: "",
  storage: 0,
  price: 0,
  stock_quantity: 0,
};

const defaultValues: ProductFormData = {
  model: "",
  brand_id: "00000000-0000-0000-0000-000000000000",
  category_id: "00000000-0000-0000-0000-000000000000",
  condition: "",
  carrier_status: "unlocked",
  base_price: 0,
  description: "",
  images: [""],
  specifications: {
    processor: "",
    display: "",
    camera: "",
    battery: "",
    material: "",
  },
  variants: [defaultVariant],
};

type BaseProductFormProps = {
  title: string;
  description: string;
  submitButtonText: string;
  actionVerb: string;
  children: React.ReactNode;
  action: (formData: FormData) => Promise<ProductServerActionResponse>;
};

type AddProductFormProps = BaseProductFormProps & {
  initialData?: never;
};

type EditProductFormProps = BaseProductFormProps & {
  initialData: Partial<ProductFormData>;
};

type ProductFormProps = AddProductFormProps | EditProductFormProps;

export default function ProductFormSheet({
  title,
  description,
  submitButtonText,
  actionVerb,
  initialData,
  children,
  action,
}: ProductFormProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [container, setContainer] = useState(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ...defaultValues,
      ...initialData,
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control: form.control, name: "images" as never });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control: form.control, name: "variants" });

  useEffect(() => {
    if (initialData) form.reset({ ...defaultValues, ...initialData });
  }, [form, initialData]);

  const onSubmit = (data: ProductFormData) => {
    const payload = {
      ...data,
      variants: JSON.stringify(data.variants),
      specifications: JSON.stringify(data.specifications),
    };

    const formData = objectToFormData(payload);
    formData.delete("images");
    data.images.forEach((url) => formData.append("images", url));

    startTransition(async () => {
      const result = await action(formData);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof ProductFormData, {
            message: result.validationErrors![key],
          });
        });
        form.setFocus(
          Object.keys(result.validationErrors)[0] as keyof ProductFormData,
        );
      } else if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        form.reset(defaultValues);
        toast.success(`Product ${actionVerb} successfully!`, {
          position: "top-center",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setIsSheetOpen(false);
      }
    });
  };

  const onInvalid = (errors: FieldErrors<ProductFormData>) => {
    if (errors.variants?.root) {
      toast.error(errors.variants.root.message || "Please add at least one variant.");
    } else if (errors.variants?.message) {
      toast.error(errors.variants.message || "Please add at least one variant.");
    } else if (errors.images?.root) {
      toast.error(errors.images.root.message || "Please provide valid images.");
    } else if (errors.images?.message) {
      toast.error(errors.images.message || "Please provide valid images.");
    }

    const firstError = Object.keys(errors)[0];
    if (firstError) form.setFocus(firstError as keyof ProductFormData);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {children}

      <SheetContent className="w-[90%] max-w-5xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="size-full"
          >
            <FormSheetContent>
              <FormSheetHeader>
                <div className="flex flex-col">
                  <SheetTitle>{title}</SheetTitle>
                  <SheetDescription>{description}</SheetDescription>
                </div>
              </FormSheetHeader>

              <FormSheetBody>
                <div
                  className="space-y-8"
                  ref={setContainer as LegacyRef<HTMLDivElement>}
                >
                  {/* Basic Info */}
                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Basic Information
                    </h3>

                    <FormTextInput
                      control={form.control}
                      name="model"
                      label="Model"
                      placeholder="e.g. iPhone 16 Pro"
                    />

                    <FormBrandInput
                      control={form.control}
                      name="brand_id"
                      label="Brand"
                    />

                    <FormCategoryInput
                      control={form.control}
                      name="category_id"
                      label="Category"
                    />


                    <FormSelectInput
                      control={form.control}
                      name="condition"
                      label="Condition"
                      placeholder="Select condition"
                      options={[
                        { label: "New", value: "NEW" },
                        { label: "UK Used", value: "UK_USED" },
                        { label: "Eco Friendly", value: "ECOFRIENDLY" },
                      ]}
                    />

                    <FormSelectInput
                      control={form.control}
                      name="carrier_status"
                      label="Carrier Status"
                      placeholder="Select carrier status"
                      options={[
                        { label: "Unlocked", value: "unlocked" },
                        { label: "Locked", value: "locked" },
                      ]}
                    />

                    <FormPriceInput
                      control={form.control}
                      name="base_price"
                      label="Base Price"
                      placeholder="999.99"
                    />

                    <FormTextarea
                      control={form.control}
                      name="description"
                      label="Description"
                      placeholder="Describe the product..."
                    />
                  </section>

                  <Separator />

                  {/* Images */}
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Images
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendImage("" as never)}
                      >
                        <Plus className="size-4 mr-1" /> Add Image
                      </Button>
                    </div>

                    {imageFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <FormTextInput
                          control={form.control}
                          name={`images.${index}`}
                          label={`Image ${index + 1}`}
                          placeholder="https://example.com/image.jpg"
                        />
                        {imageFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="mt-6 shrink-0 text-destructive hover:text-destructive"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </section>

                  <Separator />

                  {/* Specifications */}
                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Specifications
                    </h3>

                    {(
                      [
                        { name: "specifications.processor", label: "Processor", placeholder: "A18 Pro" },
                        { name: "specifications.display", label: "Display", placeholder: '6.3" Super Retina XDR' },
                        { name: "specifications.camera", label: "Camera", placeholder: "48MP Main, 48MP Ultra Wide" },
                        { name: "specifications.battery", label: "Battery", placeholder: "Up to 29 hours video playback" },
                        { name: "specifications.material", label: "Material", placeholder: "Titanium" },
                      ] as const
                    ).map(({ name, label, placeholder }) => (
                      <FormTextInput
                        key={name}
                        control={form.control}
                        name={name}
                        label={label}
                        placeholder={placeholder}
                      />
                    ))}
                  </section>

                  <Separator />

                  {/* Variants */}
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Variants
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendVariant(defaultVariant)}
                      >
                        <Plus className="size-4 mr-1" /> Add Variant
                      </Button>
                    </div>

                    {variantFields.map((field, index) => (
                      <Card key={field.id} className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            Variant {index + 1}
                          </p>
                          {variantFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeVariant(index)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>

                        <FormTextInput
                          control={form.control}
                          name={`variants.${index}.color`}
                          label="Color"
                          placeholder="Blue Titanium"
                        />

                        <FormTextInput
                          control={form.control}
                          name={`variants.${index}.storage`}
                          label="Storage (GB)"
                          placeholder="256"
                          type="number"
                        />

                        <FormPriceInput
                          control={form.control}
                          name={`variants.${index}.price`}
                          label="Price"
                          placeholder="1099.99"
                        />

                        <FormTextInput
                          control={form.control}
                          name={`variants.${index}.stock_quantity`}
                          label="Stock Quantity"
                          placeholder="25"
                          type="number"
                        />
                      </Card>
                    ))}
                  </section>
                </div>
              </FormSheetBody>

              <FormSheetFooter>
                <SubmitButton isPending={isPending} className="flex-1">
                  {submitButtonText}
                </SubmitButton>
              </FormSheetFooter>
            </FormSheetContent>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}