import { Link ,useNavigate} from "react-router-dom"
import {IoIosArrowBack} from "react-icons/io"
import { useState } from "react"

import useCreateDate from "../components/useCreateDate"
import * as notesApi from "../services/notes";

const CreateNote = ({setNotes}) => {
  const [title,setTitle]=useState('')
  const [details,setDetails]=useState('')
  const date=useCreateDate();
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && details) {
      try {
        const newNote = await notesApi.create({ title, details, date });
        setNotes((prev) => [newNote, ...prev]);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Could not save note");
      }
    }
  }

  return (
    <section>
        <header className="create-note__header">
        <Link to="/" className="btn"><IoIosArrowBack/></Link>
        <button className="btn  lg primary" onClick={handleSubmit}>Save</button>
        </header>
          <form className="create-note__form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} autoFocus />
            <textarea rows="28" placeholder="Note details.." value={details} onChange={(e)=>setDetails(e.target.value)}></textarea>
          </form>
    </section>
  )
}

export default CreateNote