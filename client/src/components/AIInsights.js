function AIInsights({ aiResult }) {

  return (

    <div className="
      bg-gradient-to-r
      from-blue-700
      to-indigo-700
      text-white
      rounded-2xl
      p-6
      shadow-lg
      mt-8
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        AI Insights
      </h2>

      <pre className="
        whitespace-pre-wrap
        text-sm
      ">
        {aiResult}
      </pre>

    </div>
  );
}

export default AIInsights;