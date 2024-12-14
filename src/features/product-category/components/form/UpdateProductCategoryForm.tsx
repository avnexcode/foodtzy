import { useForm } from "react-hook-form";
import { UpdateProductCategoryFormInner } from "./UpdateProductCategoryFormInner";

import { useUpdateProductCategory } from "../../api/useUpdateProductCategory";
import { type UpdateProductCategoryFormSchema } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAddressFormSchema } from "@/features/address/types";
import { useToast } from "@/hooks/use-toast";
import { useProductCategoriesId } from "../../api/useProductCategoryId";
import { Form } from "@/components/ui/form";

export const UpdateProductCategorForm = () => {
    const {toast} = useToast();
    const {data: productCategory, refetch: refetchProductCategories} = useProductCategoriesId('');

    const {mutate: updateProductCategory, isPending: isUpdateProductCategoryPending} = 
        useUpdateProductCategory({
            id: productCategory?.id,
            onSuccess: async() => {
                await refetchProductCategories();
                toast({
                    title: 'Success',
                    description: 'Success update profile',
                })
            },
            onError: async error => {
                toast({
                    title: 'Success',
                    variant: 'destructive',
                    description: error.response?.data.error ?? error.message,
                });
            },
        });

        const form = useForm<UpdateProductCategoryFormSchema>({
            defaultValues: {
                name: "",
                description: ""
            },
            resolver: zodResolver(updateAddressFormSchema)
        })

        const onSubmit = (values: UpdateProductCategoryFormSchema) => updateProductCategory(values)


    return (
        <Form {...form}>
            <UpdateProductCategoryFormInner 
            form_id="update-product-category-form"
            form={form}
            onSubmit={onSubmit}
            />
        </Form>
    )
};