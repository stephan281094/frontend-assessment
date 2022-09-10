import Header from "./header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-6xl px-4">{children}</main>
    </>
  );
}
