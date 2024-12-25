import * as yup from 'yup';

export const createProductValidation = yup.object({
    product:yup.string().required(),
    price:yup.string().required(),
    amount:yup.string().required(),
    image:yup.string(),
    category: yup.string().required(),
    description: yup.string()
});

export const updateProductValidation = yup.object({
    product:yup.string(),
    price:yup.string(),
    amount:yup.string(),
    image:yup.string(),
    category: yup.string(),
    description: yup.string()
})