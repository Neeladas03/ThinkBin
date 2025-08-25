import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import { useEffect, useState } from "react";
import * as notesApi from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend once on mount
  useEffect(() => {
    notesApi
      .getAll()
      .then(setNotes)
      .catch((err) => console.error(err));
  }, []);

  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route path="/create-note" element={<CreateNote setNotes={setNotes} />} />
          <Route path="/edit-note/:id" element={<EditNote notes={notes} setNotes={setNotes} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
