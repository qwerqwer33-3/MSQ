import { withBasePath } from "../lib/basePath";

const links = [
  { href: "/", label: "Home" },
  { href: "/pi", label: "PI" },
  { href: "/research", label: "Research" },
  { href: "/members", label: "Members" },
  // { href: "/members2", label: "Members 2" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
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
            <a key={l.href} href={withBasePath(l.href)}>{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
