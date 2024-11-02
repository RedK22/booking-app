import {Route, Routes} from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Layout from "./Pages/Layout";
import Register from "./Pages/Register";
import axios from "axios";
import {UserContextProvider} from "./userContext";
import Account from "./Pages/Account";
import AccountPlace from "./Pages/AccountPlace";
import PlacesForm from "./Pages/PlacesForm";
import AccountBooking from "./Pages/AccountBooking";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/bookings" element={<AccountBooking />} />
          <Route path="/account/places" element={<AccountPlace />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
