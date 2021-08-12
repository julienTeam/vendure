import gql from 'graphql-tag';
import productQuery from './productQuery';
import { CustomQuery } from '@vue-storefront/core';
import { Context, ProductParams, Product, GetProductResponse, RequestDataStructure } from '../../types';

const getProduct = async (context: Context, params: ProductParams, customQuery?: CustomQuery): Promise<GetProductResponse> => {
  const productVariables = {
    ...params
  };

  const { product } = context.extendQuery(
    customQuery, { product: { query: productQuery, variables: productVariables } }
  );

  const request = await context.client.query<RequestDataStructure<'product', Product>>({
    query: gql`${product.query}`,
    variables: product.variables,
    fetchPolicy: 'no-cache'
  });
  return request;

};

export default getProduct;
