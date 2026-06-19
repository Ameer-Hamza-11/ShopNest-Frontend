import { Link } from "react-router-dom";

const Footer = () => {
  const footerLink =
    "text-sm text-zinc-400 transition-colors duration-300 hover:text-orange-500";

  return (
    <footer
      className="
        mt-auto

        border-t
        border-white/5

        bg-zinc-950

        px-5
        py-10
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl

          flex
          flex-wrap

          items-center
          justify-between

          gap-5
        "
      >
        {/* Brand */}
        <div>
          <h3
            className="
              mb-2.5
              text-xl
              font-bold
              text-orange-500
            "
          >
            ShopNest
          </h3>

          <p
            className="
              text-sm
              text-zinc-400
            "
          >
            Premium E-Commerce Platform.
          </p>
        </div>

        {/* Links */}
        <div
          className="
            flex
            flex-wrap
            gap-5
          "
        >
          <Link to="/about" className={footerLink}>
            About Us
          </Link>

          <Link to="/return" className={footerLink}>
            Return Policy
          </Link>

          <Link to="/disclaimer" className={footerLink}>
            Disclaimer
          </Link>
        </div>

        {/* Copyright */}
        <div
          className="
            text-sm
            text-zinc-400
          "
        >
          © {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;