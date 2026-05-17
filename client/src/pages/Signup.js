import { useState } from "react";

import { useNavigate } from
  "react-router-dom";

import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const signup = async () => {

    try {

      await API.post(
        "/auth/signup",
        {
          name,
          email,
          password
        }
      );

      alert(
        "Account created successfully!"
      );

      navigate("/");

    } catch (err) {

      alert("Signup failed");
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
          space-y-5
          w-full
          max-w-md
        ">

          <div className="
            bg-white/10
            p-5
            rounded-2xl
            border
            border-white/10
          ">

            <h3 className="
              font-bold
              mb-2
              text-cyan-300
            ">
              AI Summaries
            </h3>

            <p className="
              text-gray-300
            ">
              Generate smart
              summaries instantly.
            </p>

          </div>

          <div className="
            bg-white/10
            p-5
            rounded-2xl
            border
            border-white/10
          ">

            <h3 className="
              font-bold
              mb-2
              text-cyan-300
            ">
              Smart Search
            </h3>

            <p className="
              text-gray-300
            ">
              Quickly search
              across all notes.
            </p>

          </div>

          <div className="
            bg-white/10
            p-5
            rounded-2xl
            border
            border-white/10
          ">

            <h3 className="
              font-bold
              mb-2
              text-cyan-300
            ">
              AI Insights
            </h3>

            <p className="
              text-gray-300
            ">
              Organize ideas using
              AI-powered productivity.
            </p>

          </div>

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

        <div className="
          w-full
          max-w-md
        ">

          <h2 className="
            text-4xl
            font-bold
            text-slate-800
            mb-3
          ">
            Join CognitoNotes
          </h2>

          <p className="
            text-gray-500
            mb-8
          ">
            Create a new account
          </p>

          <div className="
            space-y-4
          ">

            <input
              type="text"
              placeholder="Full Name"

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              className="
                w-full
                p-3
                rounded-lg
                border
                outline-none
              "
            />

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
                border
                outline-none
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
                border
                outline-none
              "
            />

            <button
              onClick={signup}

              className="
                w-full
                bg-cyan-500
                hover:bg-cyan-600
                text-white
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              Create Account
            </button>

            <p className="
              text-center
              text-sm
              text-gray-500
            ">

              Already have an
              account?

              <span
                onClick={() =>
                  navigate("/")
                }

                className="
                  text-cyan-600
                  cursor-pointer
                  ml-1
                  font-semibold
                "
              >
                Log In
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;