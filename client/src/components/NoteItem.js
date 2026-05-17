function NoteItem({
  note,
  generateAI,
  shareNote,
  deleteNote
}) {

  return (

    <div className="
      bg-white
      p-7
      rounded-3xl
      shadow-sm
      hover:shadow-lg
      transition
    ">

      <div className="
        flex
        justify-between
        items-start
        mb-4
      ">

        <div>

          <h2 className="
            text-2xl
            font-bold
            text-slate-800
          ">
            {note.title}
          </h2>

          <p className="
            text-gray-400
            mt-1
          ">
            AI Smart Note
          </p>

        </div>

      </div>

      <p className="
        text-gray-600
        leading-7
        mb-6
      ">
        {note.content}
      </p>

      <div className="
        flex
        gap-3
      ">

        <button
          onClick={() =>
            generateAI(note._id)
          }

          className="
            bg-cyan-500
            hover:bg-cyan-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          AI
        </button>

        <button
          onClick={() =>
            shareNote(note._id)
          }

          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Share
        </button>

        <button
          onClick={() =>
            deleteNote(note._id)
          }

          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default NoteItem;