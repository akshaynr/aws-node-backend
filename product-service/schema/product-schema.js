const yup = require('yup');
const { BAD_REQUEST } = require('../error.js');

 const productSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    price: yup.number().required().positive(),
    count: yup.number().required().positive().integer(),
 });

const validateProductSchema = async(product) => {
    try{
        return productSchema.validate(product);
    } catch(error){
        throw new Error(BAD_REQUEST.message, BAD_REQUEST.statusCode);
    }
 }

module.exports = { validateProductSchema };