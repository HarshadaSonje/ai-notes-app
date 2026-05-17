import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Notes() {

  const [notes, setNotes] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [search, setSearch] =
    useState("");
  const [selectedTag,
setSelectedTag] =
  useState("all");

  const [aiResult, setAiResult] =
    useState("");

  const [stats, setStats] =
    useState(null);

  const [selectedNote,
  setSelectedNote] =
    useState(null);

  const [saveStatus,
  setSaveStatus] =
    useState("");

  // Fetch Notes
  const fetchNotes = async () => {

    const res =
      await API.get("/notes");

    setNotes(res.data);
  };

  // Fetch Stats
  const fetchStats = async () => {

    const res =
      await API.get(
        "/notes/dashboard/stats"
      );

    setStats(res.data);
  };

  useEffect(() => {

    fetchNotes();

    fetchStats();

  }, []);

  // Autosave
  useEffect(() => {

    if (!selectedNote)
      return;

    const timer =
      setTimeout(() => {

      updateNote();

    }, 1500);

    return () =>
      clearTimeout(timer);

  }, [title, content]);

  // Create Note
  const createNote = async () => {

    await API.post("/notes", {

      title,

      content,

      tags: ["work"]

    });

    setTitle("");
    setContent("");

    fetchNotes();

    fetchStats();
  };

  // Update Note
  const updateNote =
    async () => {

    if (!selectedNote)
      return;

    setSaveStatus(
      "Saving..."
    );

    await API.patch(

      `/notes/${selectedNote._id}`,

      {
        title,
        content
      }
    );

    setSaveStatus(
      "Saved"
    );

    fetchNotes();
  };

  // AI
  const generateAI =
    async (id) => {

    const res =
      await API.post(
        `/notes/${id}/ai`
      );

    setAiResult(
      res.data.result
    );
  };

  // Share
  const shareNote =
    async (id) => {

    const res =
      await API.post(
        `/notes/${id}/share`
      );

    const shareLink =
      `http://localhost:5000/notes/shared/${res.data.shareId}`;

    navigator.clipboard.writeText(
      shareLink
    );

    alert(
      "Share link copied!"
    );
  };

  // Delete
  const deleteNote =
    async (id) => {

    await API.delete(
      `/notes/${id}`
    );

    fetchNotes();

    fetchStats();
  };

  // Archive
  const archiveNote =
    async (id) => {

    await API.patch(
      `/notes/${id}/archive`
    );

    fetchNotes();

    fetchStats();
  };

  // Search
  const filteredNotes =
  notes.filter((note) => {

  const matchesSearch =

    note.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    ||

    note.content
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const matchesTag =

    selectedTag === "all"

    ||

    note.tags.includes(
      selectedTag
    );

  return (
    matchesSearch
    &&
    matchesTag
  );

});

    const uniqueTags = [

  "all",

  ...new Set(
    notes.flatMap(
      note => note.tags
    )
  )

];

  return (

    <div className="
      bg-slate-100
      min-h-screen
    ">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="
        ml-72
        px-10
        py-8
      ">

        {/* Topbar */}
        <Topbar
          search={search}
          setSearch={setSearch}
        />
        <div className="
  mb-6
  flex
  items-center
  gap-4
">

  <p className="
    font-semibold
    text-gray-600
  ">
    Filter by Tag:
  </p>

  <select

    value={selectedTag}

    onChange={(e) =>
      setSelectedTag(
        e.target.value
      )
    }

    className="
      px-4
      py-2
      rounded-xl
      border
      outline-none
      bg-white
    "
  >

    {uniqueTags.map(
      (tag) => (

      <option
        key={tag}
        value={tag}
      >

        {tag}

      </option>
    ))}

  </select>

</div>

        {/* Stats */}
        <div className="
          grid
          grid-cols-4
          gap-6
          mb-8
        ">

          <div className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          ">

            <p className="
              text-gray-500
              text-sm
              mb-2
            ">
              Total Notes
            </p>

            <h1 className="
              text-4xl
              font-bold
              text-cyan-700
            ">
              {stats?.totalNotes || 0}
            </h1>

          </div>

          <div className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          ">

            <p className="
              text-gray-500
              text-sm
              mb-2
            ">
              Top Tags
            </p>

            <h1 className="
              text-2xl
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
          {/* AI Usage */}
<div className="
  bg-white
  rounded-3xl
  p-6
  shadow-sm
">

  <p className="
    text-gray-500
    text-sm
    mb-2
  ">
    AI Usage
  </p>

  <h1 className="
    text-4xl
    font-bold
    text-pink-600
  ">
    {stats?.aiUsage || 0}
  </h1>

</div>

{/* Weekly Activity */}
<div className="
  bg-white
  rounded-3xl
  p-6
  shadow-sm
">

  <p className="
    text-gray-500
    text-sm
    mb-2
  ">
    Weekly Activity
  </p>

  <h1 className="
    text-4xl
    font-bold
    text-green-600
  ">
    {stats?.weeklyNotes || 0}
  </h1>

</div>

        </div>

        {/* Create/Edit Note */}
        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          mb-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-5
            text-slate-800
          ">

            {selectedNote
              ? "Edit Note"
              : "Create a New Note"}

          </h2>

          <input
            type="text"

            placeholder="
              Enter note title...
            "

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            className="
              w-full
              border
              rounded-2xl
              p-4
              mb-4
              outline-none
            "
          />

          <textarea
            placeholder="
              Write your note here...
            "

            value={content}

            onChange={(e) =>
              setContent(
                e.target.value
              )
            }

            className="
              w-full
              h-36
              border
              rounded-2xl
              p-4
              outline-none
              mb-3
            "
          />

          {/* Save Status */}
          <p className="
            text-sm
            text-gray-500
            mb-5
          ">

            {saveStatus}

          </p>

          <button

  onClick={() => {

    if (!selectedNote) {

      createNote();
    }
  }}

  className="
    bg-gradient-to-r
    from-cyan-500
    to-blue-500
    text-white
    px-8
    py-3
    rounded-2xl
    font-semibold
  "
>

  {selectedNote
    ? "Editing..."
    : "Create Note"}

</button>

        </div>

        {/* Notes + AI */}
        <div className="
          grid
          grid-cols-3
          gap-6
        ">

          {/* Notes */}
          <div className="
            col-span-2
          ">

            <h2 className="
              text-3xl
              font-bold
              mb-5
              text-slate-800
            ">
              My Notes
            </h2>
            <div className="
  mb-6
">

  <h3 className="
    text-lg
    font-semibold
    mb-3
    text-gray-700
  ">
    Recently Edited
  </h3>

  <div className="
    flex
    flex-wrap
    gap-3
  ">

    {stats?.recentNotes?.map(
      (note) => (

      <div
        key={note._id}

        className="
          bg-white
          px-4
          py-2
          rounded-xl
          shadow-sm
          text-sm
        "
      >

        {note.title}

      </div>
    ))}

  </div>

</div>

            <div className="
              grid
              grid-cols-2
              gap-5
            ">

              {filteredNotes.map(
                (note) => (

                <div
                  key={note._id}

                  onClick={() => {

                    setSelectedNote(
                      note
                    );

                    setTitle(
                      note.title
                    );

                    setContent(
                      note.content
                    );
                  }}

                  className="
                    bg-white
                    rounded-3xl
                    p-5
                    shadow-sm
                    cursor-pointer
                    hover:shadow-md
                    transition
                  "
                >

                  <h3 className="
                    text-xl
                    font-bold
                    text-slate-800
                    mb-2
                  ">
                    {note.title}
                  </h3>

                  <p className="
                    text-gray-600
                    text-sm
                    leading-6
                    mb-5
                  ">
                    {note.content}
                  </p>

                  <div className="
                    flex
                    flex-wrap
                    gap-2
                  ">

                    {/* AI */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        generateAI(
                          note._id
                        );
                      }}

                      className="
                        bg-cyan-500
                        text-white
                        px-3
                        py-2
                        rounded-xl
                        text-sm
                      "
                    >
                      AI
                    </button>

                    {/* Share */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        shareNote(
                          note._id
                        );
                      }}

                      className="
                        bg-blue-500
                        text-white
                        px-3
                        py-2
                        rounded-xl
                        text-sm
                      "
                    >
                      Share
                    </button>

                    {/* Archive */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        archiveNote(
                          note._id
                        );
                      }}

                      className="
                        bg-yellow-500
                        text-white
                        px-3
                        py-2
                        rounded-xl
                        text-sm
                      "
                    >
                      Archive
                    </button>

                    {/* Delete */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        deleteNote(
                          note._id
                        );
                      }}

                      className="
                        bg-red-500
                        text-white
                        px-3
                        py-2
                        rounded-xl
                        text-sm
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* AI Panel */}
          <div>

            <div className="
              bg-white
              rounded-3xl
              shadow-sm
              overflow-hidden
              sticky
              top-8
            ">

              <div className="
                bg-gradient-to-r
                from-cyan-500
                to-purple-500
                text-white
                p-5
              ">

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  AI Insights
                </h2>

              </div>

              <div className="
                p-5
              ">

                <pre className="
                  whitespace-pre-wrap
                  text-sm
                  text-gray-700
                  leading-7
                ">
                  {aiResult ||

                    "Generate AI summaries to see insights here."}
                </pre>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Notes;