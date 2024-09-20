const BASE_URL = 'http://localhost:3000';

export const PRODUCTS_URL = BASE_URL + '/api/products';
export const PRODUCTS_METALTYPES_URL = PRODUCTS_URL + '/metalType';
export const PRODUCTS_CATEGORIES_URL = PRODUCTS_URL + '/category';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCTS_BY_METALTYPE_URL = PRODUCTS_URL + '/metalType/';
export const PRODUCTS_BY_CATEGORY_URL = PRODUCTS_URL + '/category/';
export const PRODUCTS_BY_ID_URL = PRODUCTS_URL + '/';
export const DELETE_PRODUCT_BY_ID_URL = PRODUCTS_URL + '/delete/';

export const BANNER_URL = BASE_URL + '/api/banner';

export const USERS_LOGIN_URL = BASE_URL + '/api/users/login';
export const USERS_REGISTER_URL = BASE_URL + '/api/users/register';