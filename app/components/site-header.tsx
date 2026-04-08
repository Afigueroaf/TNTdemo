"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      // Normalize: fully opaque after 80px of scroll
      const progress = Math.min(window.scrollY / 80, 1);
      header.style.setProperty("--header-scroll", progress.toFixed(3));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial value

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="siteHeader" ref={headerRef}>
      <Link className="siteHeaderLogo" href="/" aria-label="TNT Marketing — inicio">
        <Image
          src="/tnt-logo.png"
          alt="TNT Marketing"
          width={220}
          height={86}
          priority
        />
      </Link>
    </header>
  );
}
