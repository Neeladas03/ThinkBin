import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import useCreateDate from "../components/useCreateDate";
import * as notesApi from "../services/notes";

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item._id === id);

  // Ensure safe state initialization
  const [title, setTitle] = useState(note ? note.title : "");
  const [details, setDetails] = useState(note ? note.details : "");
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    if (title && details) {
      const updated = await notesApi.update(id, { title, details, date });
      const newNotes = notes.map((item) =>
        item._id === id ? updated : item
      );
      setNotes(newNotes);
      navigate("/"); // Navigate after saving
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      await notesApi.remove(id);
      const newNotes = notes.filter((item) => item._id !== id);
      setNotes(newNotes);
      navigate("/");
    }
  };

  if (!note) {
    return <p>Note not found</p>;
  }

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button type="submit" className="btn lg primary" onClick={handleForm}>
          Save
        </button>
        <button className="btn danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Note details.."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
