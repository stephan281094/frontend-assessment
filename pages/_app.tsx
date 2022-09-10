import type { AppProps } from "next/app";
import Layout from "~/components/layout";
import { ProductsProvider } from "~/context/products";
import { WishlistProvider } from "~/context/wishlist";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <WishlistProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WishlistProvider>
    </ProductsProvider>
  );
}
