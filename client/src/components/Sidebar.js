function Sidebar() {

  const scrollToSection = (id) => {

    const element =
      document.getElementById(id);

    element?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const userName =
    localStorage.getItem("name");

  return (

    <div className="
      w-72
      h-screen
      bg-gradient-to-b
      from-cyan-950
      to-blue-950
      text-white
      fixed
      left-0
      top-0
      flex
      flex-col
      justify-between
      p-8
    ">

      {/* Top */}
      <div>

        <div className="mb-16">

          <h1 className="
            text-4xl
            font-bold
          ">
            Cognito<span className="
              text-cyan-400
            ">
              Notes
            </span>
          </h1>

          <p className="
            text-gray-400
            mt-2
          ">
            AI Powered Smart Notes
          </p>

        </div>

        <div className="
          space-y-4
        ">

          <button
            onClick={() =>
              scrollToSection(
                "dashboard"
              )
            }

            className="
              w-full
              text-left
              bg-cyan-500/20
              border
              border-cyan-400/20
              p-4
              rounded-2xl
              hover:bg-cyan-500/30
              transition
            "
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              scrollToSection(
                "notes"
              )
            }

            className="
              w-full
              text-left
              p-4
              rounded-2xl
              hover:bg-white/10
              transition
            "
          >
            My Notes
          </button>

          <button
            onClick={() =>
              scrollToSection(
                "ai"
              )
            }

            className="
              w-full
              text-left
              p-4
              rounded-2xl
              hover:bg-white/10
              transition
            "
          >
            AI Insights
          </button>

        </div>

      </div>

      {/* Bottom */}
      <div className="
        border-t
        border-white/10
        pt-6
        flex
        items-center
        gap-4
      ">

        <div className="
          w-12
          h-12
          rounded-full
          bg-cyan-500
          flex
          items-center
          justify-center
          font-bold
          text-xl
        ">

          {userName
            ? userName[0]
                .toUpperCase()
            : "U"}

        </div>

        <div>

          <h3 className="
            font-semibold
          ">
            {userName}
          </h3>

          <p className="
            text-sm
            text-gray-400
          ">
            Smart User
          </p>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;