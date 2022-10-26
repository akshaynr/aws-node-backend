'use strict';


exports.getProductById = async (event) => {
  try{
    const { HEADERS } = await import('./constants.mjs');
    const { PRODUCTS } =  await import('./products.mjs');
    const { productId } = event.pathParameters;
    const productData = PRODUCTS.find((element) => element.id == productId);

    if(productNotAvailable(productData)){
      throw new Error('Product Not Found', 400);
    }

    const response = {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(productData)
    }
  return response;
  } catch(error){
    throw new Error(error.message, error.statusCode);
  }
};

const productNotAvailable = (product) => {
  return !product;
} 
