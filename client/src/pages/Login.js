import { useState } from "react";

import { useNavigate } from
  "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "name",
        res.data.user.name
      );

      navigate("/notes");

    } catch (err) {

      alert("Login failed");
    }
  };

  return (

    <div className="
      min-h-screen
      flex
    ">

      {/* LEFT */}
      <div className="
        w-1/2
        bg-gradient-to-br
        from-cyan-900
        to-blue-950
        text-white
        flex
        flex-col
        justify-center
        items-center
        p-12
        relative
      ">

        <div className="
          absolute
          bottom-10
          left-10
          text-6xl
          opacity-10
          font-bold
        ">
          AI
        </div>

        <h1 className="
          text-5xl
          font-bold
          mb-3
        ">
          CognitoNotes
        </h1>

        <p className="
          text-gray-300
          mb-10
        ">
          AI Powered Smart Notes
        </p>

        <div className="
          w-full
          max-w-sm
          space-y-4
        ">

          <input
            type="email"
            placeholder="Username/Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              p-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              outline-none
              text-white
            "
          />

          <input
            type="password"
            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              p-3
              rounded-lg
              bg-white/10
              border
              border-white/20
              outline-none
              text-white
            "
          />

          <button
            onClick={login}

            className="
              w-full
              bg-cyan-400
              hover:bg-cyan-500
              text-black
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            Login
          </button>

          <p className="
            text-center
            text-sm
            text-gray-300
          ">
            Don’t have an account?

            <span
              onClick={() =>
                navigate(
                  "/signup"
                )
              }

              className="
                text-cyan-300
                cursor-pointer
                ml-1
              "
            >
              Sign Up
            </span>

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="
        w-1/2
        bg-white
        flex
        flex-col
        justify-center
        items-center
        p-12
      ">

        <h2 className="
          text-4xl
          font-bold
          text-slate-800
          mb-8
        ">
          Welcome Back
        </h2>

        <div className="
          space-y-5
          w-full
          max-w-md
        ">

          <div className="
            bg-slate-100
            p-5
            rounded-2xl
            shadow-sm
          ">

            <h3 className="
              font-bold
              mb-2
              text-cyan-700
            ">
              AI Summaries
            </h3>

            <p className="
              text-gray-600
            ">
              Instantly generate
              summaries and action
              items from notes.
            </p>

          </div>

          <div className="
            bg-slate-100
            p-5
            rounded-2xl
            shadow-sm
          ">

            <h3 className="
              font-bold
              mb-2
              text-cyan-700
            ">
              Smart Search
            </h3>

            <p className="
              text-gray-600
            ">
              Quickly search
              across all your notes.
            </p>

          </div>

          <div className="
            bg-slate-100
            p-5
            rounded-2xl
            shadow-sm
          ">

            <h3 className="
              font-bold
              mb-2
              text-cyan-700
            ">
              AI Productivity
            </h3>

            <p className="
              text-gray-600
            ">
              Organize ideas using
              AI-powered insights.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;