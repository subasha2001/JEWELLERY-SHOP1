const BASE_URL = 'http://localhost:3000';

export const PRODUCTS_URL = BASE_URL + '/api/products';
export const PRODUCTS_METALTYPES_URL = PRODUCTS_URL + '/metalType';
export const PRODUCTS_CATEGORIES_URL = PRODUCTS_URL + '/category';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCTS_BY_METALTYPE_URL = PRODUCTS_URL + '/metalType/';
export const PRODUCTS_BY_CATEGORY_URL = PRODUCTS_URL + '/category/';
export const PRODUCTS_BY_ID_URL = PRODUCTS_URL + '/';
export const DELETE_PRODUCT_BY_ID_URL = PRODUCTS_URL + '/deleteProduct/';

export const BANNER_URL = BASE_URL + '/api/banner';
export const DELETE_BANNER_BY_ID_URL = BANNER_URL + '/deleteBanner/';

export const USERS_LOGIN_URL = BASE_URL + '/api/users/login';
export const USERS_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDER_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDER_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDER_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDER_URL + '/pay';