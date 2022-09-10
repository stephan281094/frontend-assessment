import { useMemo } from "react";
import ProductItem from "~/components/product-item";
import { useProducts } from "~/context/products";
import { useWishlist } from "~/context/wishlist";

export default function Favorites() {
  const products = useProducts();
  const wishlist = useWishlist();

  const favoriteProducts = useMemo(() => {
    return wishlist.state
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean);
  }, [products, wishlist.state]);

  return (
    <div className="py-6">
      <div className="flex">
        <h1 className="flex-1 text-2xl font-semibold">Mijn favorieten</h1>
        {wishlist.state.length > 0 && (
          <button
            className="text-sm text-gray-500 underline-offset-2 hover:underline"
            onClick={() => wishlist.dispatch({ type: "clear" })}
          >
            Favorieten verwijderen
          </button>
        )}
      </div>
      {wishlist.state.length === 0 ? (
        <p className="mt-4">
          Je hebt op dit moment geen producten in je favorieten.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-6 py-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {favoriteProducts.map((product) => (
            <ProductItem product={product!} key={product!.id} favorited />
          ))}
        </div>
      )}
    </div>
  );
}
