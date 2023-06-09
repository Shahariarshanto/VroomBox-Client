import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthPrvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  // Navigation
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.form?.pathname || "/";

  // Sign in with email and password
  const handleLogin = (event) => {
    event.preventDefault();
    signIn(email, password)
      .then(() => {
        navigate(form);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  // Sign in with google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate(form);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>VroomBox | Login</title>
      </Helmet>
      <div className="max-w-md mx-auto my-10 px-4 mb-60">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={(event) => handleLogin(event)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-[#ff385c] text-white font-medium py-2 px-4 rounded-md hover:bg-[#b30020] transition-colors"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium">
            Please register
          </Link>
        </p>
        <div className="text-center my-3">OR</div>
        <div className="flex justify-center bg-gray-200 p-3 rounded-lg">
          <button
            onClick={handleGoogleSignIn}
            className=" flex text-black items-center gap-4 text-black font-medium  px-4 rounded-md  transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Login With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
