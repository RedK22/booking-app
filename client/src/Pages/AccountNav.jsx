import {Link, useLocation} from "react-router-dom";

export default function AccountNav() {
  const {pathname} = useLocation();
  let subpage = pathname.split("/")?.[2];

  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6 bg-gray-200 rounded-full";
    if (type === subpage) {
      classes = "py-2 px-6 bg-blue-500 rounded-full text-white";
    }
    return classes;
  }

  return (
    <nav className="w-full flex gap-4 mt-4 mb-8 font-semibold items-center justify-center">
      <Link className={linkClasses("profile")} to={"/account"}>
        My Profile
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        My Bookings
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        My Accommodations
      </Link>
    </nav>
  );
}
