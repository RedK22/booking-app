import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful, Now you can login!");
    } catch (error) {
      alert("Registration failed, Please try again later!");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="-mt-24">
        <h1 className="text-3xl font-semibold text-center">Register</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={registerUser}>
          <input
            className="w-full mt-2 rounded-lg outline-none p-2 border-2 border-gray-300 text-black"
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="w-full mt-2 rounded-lg outline-none p-2 border-2 border-gray-300 text-black"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full mt-2 rounded-lg outline-none p-2 border-2 border-gray-300"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button className="px-4 py-2 mt-2 w-full font-semibold bg-blue-500 hover:bg-blue-600 hover:shadow-md transition-all text-white rounded-lg">
            Register
          </button>
          <p className="text-sm mt-2 text-gray-800">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
