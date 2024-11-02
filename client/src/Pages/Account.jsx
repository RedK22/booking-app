import {useContext, useState} from "react";
import {UserContext} from "../userContext";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import AccountPlace from "./AccountPlace";
import AccountBooking from "./AccountBooking";
import AccountNav from "./AccountNav";

function Account() {
  const {subpage} = useParams();
  const {ready, user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

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
      <AccountNav />
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
