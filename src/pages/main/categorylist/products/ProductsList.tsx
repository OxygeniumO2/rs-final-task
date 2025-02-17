import { ProductType } from '../../../../api/catalogue-api';
import { ProductCard } from './card/ProductCard';
import styles from './products.module.scss';

type ProductListType = {
  productList: ProductType[] | null;
};

export const ProductList = ({ productList }: ProductListType) => {
  return (
    <div className={styles.container}>
      {productList?.map((product) => (
        <ProductCard dataTestid={`product-card-${product.id}`} key={product.id} product={product} />
      ))}
    </div>
  );
};
