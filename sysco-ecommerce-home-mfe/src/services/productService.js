// products GET,POST,PATCH,PUT

import { productApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../constants/constants";

export async function getProducts() {
  return productApiInstance
    .request({
      url: `/products`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}
