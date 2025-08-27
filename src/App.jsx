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
    const fetchNotes = async () => {
      try {
        console.log('Fetching notes from API...');
        const data = await notesApi.getAll();
        console.log('Successfully fetched notes:', data);
        console.log('First note structure:', data[0]);
        console.log('First note ID:', data[0]?._id || data[0]?.id);
        setNotes(data);
      } catch (err) {
        console.error('Error in fetchNotes:', err);
        if (err.response) {
          console.error('Response status:', err.response.status);
          err.response.text().then(text => {
            console.error('Response body:', text);
          });
        }
      }
    };

    fetchNotes();
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
