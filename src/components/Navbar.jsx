import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "TravBud", href: "/travbud" },
];

// Removes a trailing slash so "/services/" matches "/services"
const clean = (path) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

// activePath (optional): pass the current path if you use React Router:
//   <Navbar activePath={useLocation().pathname} />
// Without it, the navbar reads the path from the browser URL.
export default function Navbar({ activePath }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const current = clean(
    activePath ?? (typeof window !== "undefined" ? window.location.pathname : "/")
  );

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link className="nav__logo" to="/" onClick={close} aria-label="TRVL home">
          TRVL<span className="nav__logo-dot" aria-hidden="true" />
        </Link>

        <nav
          id="nav-menu"
          className={open ? "nav__menu nav__menu--open" : "nav__menu"}
          aria-label="Main"
        >
          <ul className="nav__links">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  onClick={close}
                  className={current === href ? "nav__link nav__link--active" : "nav__link"}
                  aria-current={current === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="nav__cta" to="/contact-us" onClick={close}>
            Contact Us
          </Link>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}