import { CiSearch } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import NoteItem from "../components/NoteItem";
import { useEffect, useState } from "react";

const Notes = ({ notes }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(notes);

    useEffect(() => {
        setFilteredNotes(
            notes.filter(note => 
                note.title.toLowerCase().includes(text.toLowerCase())
            )
        );
    }, [text, notes]); // Added `notes` dependency

    return (
        <section>
            <header className="notes__header">
                {!showSearch && <h2>My Notes</h2>}
                {showSearch && (
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Keyword..."
                    />
                )}
                <button className="btn" onClick={() => setShowSearch(prev => !prev)}>
                    {showSearch ? <MdOutlineClose /> : <CiSearch />}
                </button>
            </header>
            <div className="notes__container">
                {filteredNotes.map(note => (
                    <NoteItem key={note.id} note={note} />
                ))}
            </div>
            <Link to="/create-note" className="btn add__btn">
                <BsPlusLg />
            </Link>
        </section>
    );
};

export default Notes;
