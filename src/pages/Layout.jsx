import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <><nav><ul>
        <div className="top-0 w-full flex flex-row gap-3 p-4 bg-black">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/test">Test</Link>
            </li>
        </div>
        </ul></nav>
        <Outlet />
    </>
  )
};

export default Layout;
