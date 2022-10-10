'use strict';

exports.getProductsList = async (event) => {
  const { PRODUCTS } =  await import('./products.mjs');
  const { HEADERS } = await import('./constants.mjs');
  const response = {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify(PRODUCTS)
  }
  return response;
};
