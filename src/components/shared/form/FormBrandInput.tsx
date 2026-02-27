"use client";

import { forwardRef, Ref } from "react";
import { useQuery } from "@tanstack/react-query";
import { Control, FieldValues, Path } from "react-hook-form";

import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { fetchBrandsDropdown } from "@/services/brands";
import FetchDropdownContainer from "@/components/shared/FetchDropdownContainer";

type FormBrandInputProps<TFormData extends FieldValues> = {
    control: Control<TFormData>;
    name: Path<TFormData>;
    label: string;
    container?: HTMLDivElement;
};

const FormBrandInput = forwardRef(function FormBrandInputRender<
    TFormData extends FieldValues,
>(
    { control, name, label, container }: FormBrandInputProps<TFormData>,
    ref: Ref<HTMLButtonElement>,
) {
    const {
        data: brands,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["brands", "dropdown"],
        queryFn: () => fetchBrandsDropdown(),
        staleTime: 5 * 60 * 1000,
    });

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:gap-x-4 md:space-y-0">
                    <FormLabel className="md:shrink-0 md:w-1/4 md:mt-2 leading-snug">
                        {label}
                    </FormLabel>

                    <div className="space-y-2 w-full">
                        <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                        >
                            <FormControl>
                                <SelectTrigger ref={ref} className="md:basis-1/5">
                                    <SelectValue placeholder="Brand" />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent portalContainer={container}>
                                <FetchDropdownContainer
                                    isLoading={isLoading}
                                    isError={isError}
                                    errorMessage="Failed to load brands"
                                >
                                    <SelectItem key="all" value="all">
                                        All Brands
                                    </SelectItem>

                                    {!isLoading &&
                                        !isError &&
                                        brands &&
                                        brands.map((brand) => (
                                            <SelectItem key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                </FetchDropdownContainer>
                            </SelectContent>
                        </Select>

                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
}) as <TFormData extends FieldValues>(
    props: FormBrandInputProps<TFormData> & { ref?: Ref<HTMLButtonElement> },
) => React.ReactElement;

export default FormBrandInput;
