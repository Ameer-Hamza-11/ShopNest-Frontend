import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const cartItems = useAppSelector((state)=> state.cart.cartItems)

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const navLinkClass = `
    relative
    text-[15px]
    font-medium
    text-zinc-400
    transition-colors
    duration-300
    hover:text-white

    after:absolute
    after:left-0
    after:-bottom-1.5
    after:h-[2px]
    after:w-0
    after:rounded-full
    after:bg-orange-500
    after:transition-all
    after:duration-300

    hover:after:w-full
  `;

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-zinc-950/80
        backdrop-blur-xl
        border-b border-white/5
        shadow-[0_4px_30px_rgba(0,0,0,0.5)]
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-4 sm:px-6 lg:px-8
          py-4

          flex
          items-center
          justify-between
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            flex items-center gap-2.5

            text-2xl md:text-[28px]
            font-bold
            text-white

            tracking-[-1px]

            drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)]
          "
        >
          <img
            src="/ShopNestLogo.png"
            alt="ShopNest"
            className="
              h-9 w-9
              rounded-lg
              object-cover

              drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]
            "
          />

          ShopNest

          <span className="text-orange-500 text-4xl leading-none">
            .
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link to="/shop" className={navLinkClass}>
              Shop
            </Link>
          </li>

          <li>
            <Link to="/cart" className={navLinkClass}>
              Cart ({cartItems.length})
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/profile" className={navLinkClass}>
                  Hi, {user.name.split(" ")[0]}
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link to="/admin" className={navLinkClass}>
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="
                    border border-red-500/30
                    text-red-500

                    hover:bg-red-500/10
                    hover:border-red-500
                  "
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={navLinkClass}>
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden
            text-zinc-300
            hover:text-orange-500
            transition-colors
          "
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="
            md:hidden

            border-t
            border-zinc-800

            bg-zinc-950/95
            backdrop-blur-xl
          "
        >
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link
                to="/shop"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Cart ({cartItems.length})
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className={navLinkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    Hi, {user.name.split(" ")[0]}
                  </Link>
                </li>

                {user.role === "admin" && (
                  <li>
                    <Link
                      to="/admin"
                      className={navLinkClass}
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  </li>
                )}

                <li>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="
                      w-full
                      justify-start

                      border border-red-500/30
                      text-red-500

                      hover:bg-red-500/10
                      hover:border-red-500
                    "
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;