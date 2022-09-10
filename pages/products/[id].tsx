import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Button from "~/components/button";
import FavoriteButton from "~/components/favorite-button";
import { useProducts } from "~/context/products";
import { useWishlist } from "~/context/wishlist";

export default function ProductDetail() {
  const { query } = useRouter();
  const products = useProducts();
  const wishlist = useWishlist();

  const product = useMemo(
    () => products.find((product) => String(product.id) === query.id),
    [products, query.id]
  );

  if (!product) {
    return <h1>Product could not be found</h1>;
  }

  return (
    <div className="group relative flex flex-col py-6 lg:flex-row">
      <div className="relative aspect-square h-96 overflow-hidden">
        <Image
          layout="fill"
          src={product.image}
          alt=""
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-6 flex-1 space-y-4 lg:ml-6 lg:mt-0">
        <h1 className="text-2xl font-semibold text-gray-700">
          {product.title}
        </h1>
        <p className="text-gray-500">{product.description}</p>
        <p className="whitespace-nowrap text-lg font-medium text-gray-900">
          € {product.price.toFixed(2)}
        </p>
        <div className="flex space-x-2">
          <FavoriteButton
            favorited={wishlist.state.includes(product.id)}
            onClick={() =>
              wishlist.dispatch({ type: "toggle", payload: product.id })
            }
          />
          <Button title="Voeg toe aan winkelwagen">In winkelwagen</Button>
        </div>
      </div>
    </div>
  );
}
