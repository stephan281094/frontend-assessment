import Link from "next/link";
import HeartSvg from "~/components/heart-svg";
import LogoSvg from "~/components/logo-svg";
import { cx } from "~/utils/cx";
import { useScroll } from "~/utils/use-scroll";

interface Props {
  wishlist?: number[];
}

export default function Header({ wishlist = [] }: Props) {
  const scrollY = useScroll();

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
          <Link href="/favorieten">
            <a
              className="relative text-brand hover:opacity-75"
              title="Bekijk je favoriete producten"
            >
              <span className="sr-only">Favorieten</span>
              <HeartSvg filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white">
                  {wishlist.length > 9 ? "9+" : wishlist.length}
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
