import ProductItem from "~/components/product-item";
import { useProducts } from "~/context/products";
import { useWishlist } from "~/context/wishlist";

export default function Home() {
  const products = useProducts();
  const wishlist = useWishlist();

  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 py-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            favorited={!!wishlist.state[product.id]}
          />
        ))}
      </div>
    </>
  );
}
