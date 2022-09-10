import { useWishlist } from "~/context/wishlist";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const wishlist = useWishlist();

  return (
    <>
      <Header wishlist={wishlist.state} />
      <main className="container mx-auto max-w-6xl px-4">{children}</main>
    </>
  );
}
