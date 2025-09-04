import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@apollo/client/react'
import * as yup from 'yup'
import { CREATE_PRODUCT, UPDATE_CATEGORY } from '../../../graphql/mutations'
import { GET_BRANDS, GET_CATEGORIES, GET_SUB_CATEGORIES } from '../../../graphql/queries'
import { CategoriesResponseType, CategoryType } from '../../../types/apps/categoryTypes'
import { BrandsResponseType, BrandType } from '../../../types/apps/brandTypes'
import { SubCategoriesResponseType, SubCategoryType } from '../../../types/apps/subCategoryTypes'

const productSchema = yup.object({
  //production information
  name: yup.string().required().max(255),
  sku: yup.string().optional().max(255),
  barcode: yup.string().optional().max(255),
  description: yup.string().optional().max(5000),

  //images
  images: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .test('fileType', 'Only .png, .jpg, .jpeg, and .gif files are allowed', file =>
          file ? ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type) : false
        )
        .test('fileSize', 'Each file must be 2MB or smaller', file => (file ? file.size <= 2000000 : false))
    )
    .min(1, 'At least one image is required')
    .max(5, 'You can only upload up to 5 files'),

  //variants
  variants: yup.array().of(
    yup.object().shape({
      option: yup.string().required('Option is required'),
      value: yup.string().required('Value is required'),
      quantity: yup.number().required().typeError('Quantity must be a number').min(0),
      price: yup.number().typeError('Variant must be a number').required().min(1),
      discount: yup
        .number()
        .typeError('Variant Discount must be a number')
        .max(100, 'Variant Discount cannot be more than 100%')
        .min(0)
    })
  ),

  //pricing and quantity
  basicPrice: yup.number().typeError('Base Price must be a number').required().min(1),
  currency: yup.string().oneOf(['GHS', 'USD', 'EUR', 'GBP', 'NGN']).required(),
  discount: yup.number().typeError('Discount must be a number').max(100, 'Discount cannot be more than 100%').min(0),
  quantity: yup.number().required().typeError('Quantity must be a number').min(0),
  taxRate: yup.number().optional().typeError('Tax rate must be a number').min(0),

  // organize
  category: yup.string().required(),
  subcategory: yup.string().optional(),
  brand: yup.string().optional(),
  status: yup.string().required(),
  tags: yup.array().min(1, 'At least one tag is required')
})

type ProductFormValues = yup.InferType<typeof productSchema>

interface Category {
  id: string
  name: string
  description?: string
  image: string
}

export const useAddProductForm = ({ category }: { category?: Category }) => {
  const isEditMode = !!category
  const [addProduct] = useMutation(CREATE_PRODUCT)
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [brands, setBrands] = useState<BrandType[]>([])
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([])

  const { data: categoriesData } = useQuery<CategoriesResponseType>(GET_CATEGORIES)
  const { data: brandsData } = useQuery<BrandsResponseType>(GET_BRANDS)
  const { data: subCategoriesData } = useQuery<SubCategoriesResponseType>(GET_SUB_CATEGORIES)

  useEffect(() => {
    if (categoriesData?.categories) {
      setCategories(categoriesData.categories)
    }
  }, [categoriesData])

  useEffect(() => {
    if (brandsData?.brands) {
      setBrands(brandsData.brands)
    }
  }, [brandsData])

  useEffect(() => {
    if (subCategoriesData?.subCategories) {
      setSubCategories(subCategoriesData.subCategories)
    }
  }, [subCategoriesData])

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProductFormValues>({
    mode: 'onChange',
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      barcode: '',
      description: '',
      images: [],
      variants: [],
      basicPrice: 0,
      discount: 0,
      quantity: 0,
      category: '',
      brand: '',
      status: '',
      tags: []
    }
  })

  const onSubmit = useCallback(
    async (values: ProductFormValues) => {
      console.log(values)
      // setIsSubmitting(true)
      // try {
      //   let imageUrls: string[] = isEditMode && category ? [category.image] : []
      //   const uploadResult = await uploadMultipleImages(values.images as File[])
      //   imageUrls = uploadResult.files.map((file: { url: string }) => file.url)
      //   console.log(imageUrls)
      //
      //   const input = {
      //     categoryId: values.category,
      //     images: imageUrls,
      //     isActive: values.status === 'true',
      //     name: values.name,
      //     price: values.basicPrice,
      //     quantity: 100, // later
      //     description: values.description || null,
      //     sku: values.sku || null,
      //     subcategoryId: values.subcategory || null,
      //     brandId: values.brand || null
      //   }
      //
      //   if (isEditMode && category) {
      //     await updateCategory({
      //       variables: { updateCategoryId: category.id, input },
      //       refetchQueries: [GET_PRODUCTS]
      //     })
      //     toast.success('Product updated successfully!')
      //   } else {
      //     await addProduct({
      //       variables: { createProductInput: input },
      //       refetchQueries: [GET_PRODUCTS]
      //     })
      //     toast.success('Product added successfully!')
      //   }
      //   reset()
      // } catch (error: any) {
      //   toast.error(error?.message || `Failed to ${isEditMode ? 'update' : 'add'} product. Please try again.`)
      // } finally {
      //   setIsSubmitting(false)
      // }
    },
    [addProduct, updateCategory, reset, isEditMode, category]
  )

  return {
    isEditMode,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    categories,
    brands,
    subCategories,
    reset
  }
}
