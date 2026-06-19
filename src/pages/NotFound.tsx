import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-8xl font-bold text-orange-500">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-zinc-400">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="
          mt-6
          rounded-lg
          bg-orange-500
          px-6
          py-3
          font-semibold
          text-black
          hover:bg-orange-400
        "
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;