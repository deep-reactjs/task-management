import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto text-center mt-4">
      <h1 className="text-lg font-semibold">404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="underline">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
