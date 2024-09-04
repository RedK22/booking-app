import {Route, Routes} from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Layout from "./Pages/Layout";
import Register from "./Pages/Register";
import axios from "axios";
import {UserContextProvider} from "./userContext";
import Account from "./Pages/Account";

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
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:subpage/:action?" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
