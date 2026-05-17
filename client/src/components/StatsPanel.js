function StatsPanel({ stats }) {

  return (

    <div className="
      grid
      md:grid-cols-2
      gap-8
      mb-10
    ">

      <div className="
        bg-white
        p-8
        rounded-3xl
        shadow-sm
      ">

        <h3 className="
          text-gray-500
          mb-3
        ">
          Total Notes
        </h3>

        <h1 className="
          text-5xl
          font-bold
          text-cyan-700
        ">
          {stats?.totalNotes || 0}
        </h1>

      </div>

      <div className="
        bg-white
        p-8
        rounded-3xl
        shadow-sm
      ">

        <h3 className="
          text-gray-500
          mb-3
        ">
          Top Tags
        </h3>

        <h1 className="
          text-3xl
          font-bold
          text-purple-600
        ">
          {stats
            ? Object.keys(
                stats.topTags
              ).join(", ")
            : "None"}
        </h1>

      </div>

    </div>
  );
}

export default StatsPanel;