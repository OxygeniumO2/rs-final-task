import { ECommerceLS } from '../interfaces/interfaces';
import { apiClient } from './commers-tools-api';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

type CategoryConfig = {
  data?: URLSearchParams;
  headers: {
    Authorization: string;
  };
};

export type CategoryResults = {
  description: {
    ['en-US']: string;
  };
  id: string;
  key: string;
  name: {
    ['en-US']: string;
  };
  slug: {
    ['en-US']: string;
  };
  version: number;
};

type CategoryObj = {
  count: number;
  limit: number;
  offset: number;
  results: CategoryResults[];
  total: number;
};

type ImagesType = {
  dimensions: {
    h: number;
    w: number;
  };
  label: string;
  url: string;
};

export type ProductType = {
  id: string;
  key: string;
  description: {
    ['en-US']: string;
  };
  masterVariant: {
    images: ImagesType[];
  };
  name: {
    en: string;
    ['en-US']: string;
  };
  productType: { typeId: string; id: string };
  version: number;
};

export async function getCategories(sort: string = '', limit: number = 0): Promise<CategoryResults[] | null> {
  let selectedCategories = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (sort || limit) {
      const data = new URLSearchParams();
      data.append('sort', `${sort}`);
      data.append('limit', `${limit}`);
      config['data'] = data;
    }

    const response = await apiClient.get(`/${projectKey}/categories`, config);
    const { results } = response.data as CategoryObj;
    selectedCategories = results;
  }
  return selectedCategories;
}

export async function getProductsByCategory(
  categoryID: string[] = ['c1dbe964-d17a-4600-b63c-3a69a095668a', 'ded52f2e-0d4d-4015-bbde-70c0142c61f0'],
  limit: number = 15,
): Promise<ProductType[] | null> {
  let selectedProducts = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const arr: string[] = categoryID;
    const categoryIDJoined =
      arr.length === 0 ? 'c1dbe964-d17a-4600-b63c-3a69a095668a' : arr.length === 1 ? arr[0] : arr.join('","');
    const response = await apiClient.get(
      `/${projectKey}/product-projections/search?filter=categories.id:"${categoryIDJoined}"&limit=${limit}`,
      config,
    );
    const { results } = response.data;
    selectedProducts = results;
  }
  return selectedProducts;
}

export async function getProductByKey(key: string): Promise<ProductType | null> {
  let selectedProduct = null;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
    const config: CategoryConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await apiClient.get(`/${projectKey}/products/key=${key}`, config);
    selectedProduct = response.data;
  }
  return selectedProduct;
}
