import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import HeartSvg from "~/components/heart-svg";
import LogoSvg from "~/components/logo-svg";
import { useProducts } from "~/context/products";
import { useWishlist } from "~/context/wishlist";
import { cx } from "~/utils/cx";
import { useScroll } from "~/utils/use-scroll";
import ProductListItem from "./product-list-item";

export default function Header() {
  const router = useRouter();
  const products = useProducts();
  const wishlist = useWishlist();
  const scrollY = useScroll();
  const [open, setOpen] = useState(false);

  const favoriteProducts = useMemo(() => {
    return wishlist.state
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean);
  }, [products, wishlist.state]);

  // Close wishlist when switching pages
  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  const handleWishlist = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setOpen(!open);
  };

  return (
    <nav
      className={cx("sticky top-0 z-10 flex bg-white", scrollY > 0 && "shadow")}
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center px-4">
        <Link href="/">
          <a className="hover:opacity-75">
            <span className="sr-only">Intergamma logo</span>
            <LogoSvg />
          </a>
        </Link>
        <div className="ml-auto flex">
          <Popover.Root open={open} onOpenChange={setOpen} modal>
            <Popover.Trigger>
              <Link href="/favorieten">
                <a
                  className="relative block text-brand hover:opacity-75"
                  title="Bekijk je favoriete producten"
                  onClick={handleWishlist}
                >
                  <span className="sr-only">Favorieten</span>
                  <HeartSvg filled={wishlist.state.length > 0} />
                  {wishlist.state.length > 0 && (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white">
                      {wishlist.state.length > 9 ? "9+" : wishlist.state.length}
                    </span>
                  )}
                </a>
              </Link>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className="top-5 z-20 max-w-md rounded bg-white shadow-2xl"
                align="end"
                alignOffset={-16}
                sideOffset={4}
              >
                <Popover.Arrow fill="#fff" />
                <div className="flex border-b border-gray-100 py-2 px-4">
                  <span className="flex-1">
                    <Link href="/favorieten">
                      <a className="underline-offset-2 hover:underline">
                        Mijn favorieten
                      </a>
                    </Link>
                  </span>
                  <Popover.Close className="text-xs text-gray-500">
                    Sluiten
                  </Popover.Close>
                </div>
                <div className="flex flex-col p-2">
                  {favoriteProducts.length === 0 ? (
                    <p className="max-w-xs py-2 text-center text-sm">
                      Je hebt op dit moment geen producten in je favorieten.
                    </p>
                  ) : (
                    favoriteProducts.map((product) => (
                      <ProductListItem
                        key={product!.id}
                        product={product!}
                        onDelete={() =>
                          wishlist.dispatch({
                            type: "toggle",
                            payload: product!.id,
                          })
                        }
                      />
                    ))
                  )}
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </nav>
  );
}
