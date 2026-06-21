import { Link } from "react-router-dom";

function NotFound() {
  const token = localStorage.getItem("token");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">

        <h1 className="text-7xl font-bold text-red-600">
          404
        </h1>

        <p className="mt-4 text-xl">
          Page Not Found
        </p>

        <Link
          to={token ? "/dashboard" : "/"}
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-white"
        >
          {token ? "Go To Dashboard" : "Go To Login"}
        </Link>

      </div>
    </div>
  );
}

export default NotFound;