import {useContext, useState} from "react";
import {UserContext} from "../userContext";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import AccountPlace from "./AccountPlace";
import AccountBooking from "./AccountBooking";

function Account() {
  const {subpage} = useParams();
  const {ready, user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  function linkClasses(type = null) {
    let classes = "py-2 px-6 bg-gray-200 rounded-full";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes = "py-2 px-6 bg-blue-500 rounded-full text-white";
    }
    return classes;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/logout");
    setUser(null);
  }

  if (!ready) {
    // console.log("I'm loading", ready, user);
    return "Loading...";
  }

  if (!user) {
    // console.log("No User, redircting", user);
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <nav className="w-full flex gap-4 mt-4 mb-8 font-semibold items-center justify-center">
        <Link className={linkClasses("profile", subpage)} to={"/account"}>
          My Profile
        </Link>
        <Link
          className={linkClasses("bookings", subpage)}
          to={"/account/bookings"}
        >
          My Bookings
        </Link>
        <Link className={linkClasses("places", subpage)} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>

      {/* Profile Area */}
      {subpage === undefined && (
        //
        <div className="text-center max-w-lg mx-auto">
          <p>
            Logged In as {user.fullname} ({user.email})
          </p>
          <button
            onClick={logout}
            className="max-w-md mt-2 bg-blue-500 rounded-full text-white py-2 px-4"
          >
            Logout
          </button>
        </div>
      )}

      {/* My Places Area */}
      {subpage === "places" && (
        //
        <AccountPlace />
      )}

      {/* My Bookings Area */}
      {subpage === "bookings" && (
        //
        <AccountBooking />
      )}
    </div>
  );
}

export default Account;
