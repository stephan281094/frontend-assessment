import { useEffect, useState } from "react";

export function useScroll() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    setScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
}
