"use client";

import { usePathname } from "next/navigation";
import { withBasePath } from "../lib/basePath";

const links = [
  { href: "/", label: "Home" },
  { href: "/pi", label: "PI" },
  { href: "/research", label: "Research" },
  { href: "/members", label: "Members" },
  // { href: "/members2", label: "Members 2" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/activities", label: "Activities" },
  { href: "/news", label: "News" }
];

export default function Nav() {
  const pathname = usePathname() || "/";
  const trimSlash = (value) => {
    if (!value) return "/";
    if (value === "/") return "/";
    return value.replace(/\/+$/, "");
  };

  const isActiveLink = (href) => {
    const normalizedPath = trimSlash(pathname);
    const rawHref = trimSlash(href);
    const basedHref = trimSlash(withBasePath(href));

    if (href === "/") {
      return normalizedPath === rawHref || normalizedPath === basedHref;
    }

    return (
      normalizedPath === rawHref ||
      normalizedPath.startsWith(`${rawHref}/`) ||
      normalizedPath === basedHref ||
      normalizedPath.startsWith(`${basedHref}/`)
    );
  };

  return (
    <header className="navbar">
      <div className="container navInner">
        <a className="navBrand" href={withBasePath("/")}>
          <img
            className="navLogo"
            src={withBasePath("/logo-msq.svg")}
            width="32"
            height="32"
            alt="MSQ Lab logo"
          />
          <span>MSQ Lab</span>
        </a>
        <nav className="navLinks">
          {links.map((l) => (
            <a
              key={l.href}
              href={withBasePath(l.href)}
              className={isActiveLink(l.href) ? "isActive" : ""}
              aria-current={isActiveLink(l.href) ? "page" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
