import Image from "next/image";
import Link from "next/link";
import { Product } from "~/types/product";
import HeartSvg from "./heart-svg";

interface Props {
  product: Product;
  favorited?: boolean;
}

export default function ProductItem({ product, favorited = false }: Props) {
  return (
    <div className="group relative">
      <div className="relative aspect-square w-full overflow-hidden group-hover:opacity-75">
        <Image
          layout="fill"
          src={product.image}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        {favorited && (
          <div className="absolute top-2 right-2 text-brand">
            <HeartSvg filled />
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.id}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.title}
              </a>
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <span className="whitespace-nowrap pl-2 text-sm font-medium text-gray-900">
          € {product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
