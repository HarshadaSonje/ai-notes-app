import { useNavigate }
from "react-router-dom";

function Topbar({
  search,
  setSearch
}) {

  const navigate =
    useNavigate();

  const userName =
    localStorage.getItem("name");

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "name"
    );

    navigate("/");
  };

  return (

    <div className="
      flex
      justify-between
      items-center
      mb-10
    ">

      <div>

        <h1 className="
          text-5xl
          font-bold
          text-slate-800
        ">
          Dashboard
        </h1>

        <p className="
          text-gray-500
          mt-2
          text-lg
        ">
          Welcome back,
          {" "}
          <span className="
            text-cyan-700
            font-semibold
          ">
            {userName}
          </span>
        </p>

      </div>

      <div className="
        flex
        items-center
        gap-5
      ">

        <input
          type="text"
          placeholder="Search notes..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
            px-6
            py-4
            rounded-2xl
            bg-white
            shadow-sm
            outline-none
            w-96
          "
        />

        <button
          onClick={logout}

          className="
            border
            border-red-300
            text-red-500
            px-5
            py-3
            rounded-2xl
            hover:bg-red-50
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Topbar;