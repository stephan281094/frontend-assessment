import Image from "next/image";
import Link from "next/link";
import { Product } from "~/types/product";
import CrossSvg from "./cross-svg";

interface Props {
  product: Product;
  onDelete: () => void;
}

export default function ProductListItem({ product, onDelete }: Props) {
  return (
    <div className="flex space-x-2 p-2">
      <div className="group relative flex flex-1 space-x-2 hover:opacity-75">
        <div className="relative col-span-2 overflow-hidden">
          <Image
            width={40}
            height={40}
            src={product.image}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-1 justify-between">
          <span className="text-sm text-gray-700">
            <Link href={`/products/${product.id}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.title}
              </a>
            </Link>
          </span>
        </div>
        <span className="whitespace-nowrap pl-2 text-sm font-medium text-gray-900">
          € {product.price.toFixed(2)}
        </span>
      </div>
      <div>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => onDelete()}
          title="Verwijder uit favorieten"
        >
          <CrossSvg size="16" />
        </button>
      </div>
    </div>
  );
}
