import { useState, useEffect } from "react"

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Lazy initializer: loads saved notes from localStorage only on first render
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  // useEffect: sync notes to localStorage whenever notes changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const formHandler = (e) => {
    e.preventDefault();

    setTitle('');
    setDescription('');

    const copyNotes = [...notes]; // making the copy of the original notes array.
    copyNotes.push({ title, description, color: getRandomColor() });
    setNotes(copyNotes);
  }

  const deleteNote = (idx) => {
    const copyNotes = [...notes];
    copyNotes.splice(idx, 1);

    setNotes(copyNotes);
  }

  const colors = [
    "#eb5f2860", "#2ecc7160", "#3498db60", "#9b59b660",
    "#f39c1260", "#1abc9c60", "#e74c3c60", "#e67e2260"
  ];

  function getRandomColor(idx) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0c0028] px-12">

      <header>
        <h1 className="text-center text-5xl font-bold text-white mt-8 mb-6 tracking-tight">
          📝 <span className="text-[#00a8ff]">My</span> Notes
        </h1>
      </header>

      <section className="input-container">
        <form onSubmit={(e) => {
          formHandler(e);
        }} id="note-writing" className="flex flex-col items-center gap-6 justify-center mt-1.5">
          <div name="" id="text-box" className="bg-[#242456] border-[#00a8ff]/40 hover:border-[#00a8ff] focus-within:border-[#00a8ff]
          min-h-50 border-2 rounded-xl w-[50%] p-3 flex flex-col gap-2">
            <input value={title} onChange={(e) => {
              setTitle(e.target.value);
            }} className="outline-none rounded-[6px] placeholder:font-bold placeholder:text-xl placeholder:text-[#0000004f] text-[#000000] text-xl font-bold " type="text" id="title" placeholder="Title" />
            <textarea value={description} onChange={(e) => {
              setDescription(e.target.value);
            }} className="outline-none rounded-[6px] min-h-50 placeholder:text-[#ccc5b982] text-[#ccc5b9]" name="" id="note-desc" placeholder="Take a note"></textarea>
          </div>
          <button className="bg-linear-to-r from-[#00a8ff] to-[#6c5ce7] text-white py-2.5 px-8 font-bold rounded-full hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer">Add Note</button>
        </form>
      </section>

      <section className="note-container">
        <div className="mt-8 flex flex-col gap-2.5" id="note-section">
          <h2 className="text-4xl text-[#505050] font-bold">Notes</h2>
          <div id="notes" className="w-full min-h-screen flex gap-3.5 flex-wrap m-6 justify-center">
            {notes.map((elem, idx) => {
              return <div key={idx} style={{ backgroundColor: elem.color }} className="note gap-2 rounded-[6px] h-70 w-60 p-3 flex flex-col hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
                <div className="title text-xl font-bold mb-1.5 whitespace-pre-wrap wrap-break-word">{elem.title}</div>
                <div className="description flex-1 whitespace-pre-wrap wrap-break-word">{elem.description}</div>
                <button onClick={() => {
                  deleteNote(idx);
                }} id="delete-btn" className="cursor-pointer active:bg-[#747474] py-2 px-4 font-bold rounded-full transition-all duration-300 ease-in-out bg-red-500/30 text-red-300 hover:bg-red-500 hover:text-white border border-red-500/30
">Delete</button>
              </div>
            })}
          </div>
        </div>
      </section>

    </div>
  )
}

export default App