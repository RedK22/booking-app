import {useContext, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        "/login",
        {email, password},
        {withCredentials: true}
      );
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login Failed!");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="-mt-24">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={loginUser}>
          <input
            className="w-full mt-2 rounded-lg outline-none p-2 border-2 border-gray-300 text-black"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full mt-2 rounded-lg outline-none p-2 border-2 border-gray-300"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="px-4 py-2 mt-2 w-full font-semibold bg-blue-500 hover:bg-blue-600 hover:shadow-md transition-all text-white rounded-lg">
            Login
          </button>
          <p className="text-sm mt-2 text-gray-800">
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
