import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from  "../constants/routes";

function Login() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAdress] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const isInvalid = password === "" || emailAddress=== ""

    useEffect(() => {
      return () => {
          document.title = "Login - Instagram";
      }
    }, [])

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
        history.push(ROUTES.DASHBOARD)
      } catch (error) {
        setEmailAdress("");
        setPassword("");
        setError(error.message);
      }

    };

    
    return (
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="IPhone with Profile"
          />
        </div>

        <div className="flex flex-col w-2/5 p-3 border justify-center bg-white">
          <div>
            <h1 className="flex justify-center w-full">
              <img
                src="/images/logo.png"
                alt="Instagram Logo"
                className="w-6/12 my-3"
              />
            </h1>

            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleLogin} method="POST">
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email Adress"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={(e) => setEmailAdress(e.target.value)}
                value={emailAddress}
              ></input>
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium mb-2 text-white w-full rounded h-8 font-bold ${
                  isInvalid && "opacity-50"
                }`}
              >
                login
              </button>
            </form>
          </div>

          <div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
              <p className="text-sm">
                Dont have an account?{" "}
                <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login
