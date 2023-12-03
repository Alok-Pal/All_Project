import yup from 'yup'


const productSchema = yup.object({
    image: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    category_Id: yup.array()
        .of(yup.string().required('id is required'))
        .min(1, 'At least one id is required')
        .required('Array is required'),
})

export default productSchema