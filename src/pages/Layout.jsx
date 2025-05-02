import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-full">
      <nav><ul>
        <div className="top-0 w-full flex flex-row gap-3 py-4 px-8 bg-black">
            <li>
                <Link to="/">Query</Link>
            </li>
            <li>
                <Link to="/journal">Journal</Link>
            </li>
        </div>
      </ul></nav>
      <Outlet/>
    </div>
  )
};

export default Layout;
