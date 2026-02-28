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
} from "@/components/shared/form";
import { SubmitButton } from "@/components/shared/form/SubmitButton";

import { updateProductFormSchema } from "./schema";
import { ProductServerActionResponse } from "@/types/server-action";

type UpdateProductFormData = z.infer<typeof updateProductFormSchema>;

const defaultValues: UpdateProductFormData = {
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
};

type BaseProductFormProps = {
  title: string;
  description: string;
  submitButtonText: string;
  actionVerb: string;
  initialData: Partial<UpdateProductFormData>;
  children?: React.ReactNode;
  action: (payload: any) => Promise<ProductServerActionResponse>;
};

export default function UpdateProductFormSheet({
  title,
  description,
  submitButtonText,
  actionVerb,
  initialData,
  children,
  action,
}: BaseProductFormProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [container, setContainer] = useState(null);

  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductFormSchema),
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

  useEffect(() => {
    if (initialData) form.reset({ ...defaultValues, ...initialData });
  }, [form, initialData]);

  const onSubmit = (data: UpdateProductFormData) => {
    // Send raw JSON instead of FormData as required by the backend
    const payload = {
      base_price: data.base_price,
      description: data.description,
      images: data.images.filter((img) => img !== ""),
      specifications: data.specifications,
    };

    startTransition(async () => {
      const result = await action(payload);

      if ("validationErrors" in result) {
        Object.keys(result.validationErrors).forEach((key) => {
          form.setError(key as keyof UpdateProductFormData, {
            message: result.validationErrors![key],
          });
        });
        form.setFocus(
          Object.keys(result.validationErrors)[0] as keyof UpdateProductFormData,
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

  const onInvalid = (errors: FieldErrors<UpdateProductFormData>) => {
    if (errors.images?.root) {
      toast.error(errors.images.root.message || "Please provide valid images.");
    } else if (errors.images?.message) {
      toast.error(errors.images.message || "Please provide valid images.");
    }

    const firstError = Object.keys(errors)[0];
    if (firstError) form.setFocus(firstError as keyof UpdateProductFormData);
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