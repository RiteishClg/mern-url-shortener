import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-5 md:px-20 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">EmiShort</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/create" className="active:text-white">Create ShortUrl</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
