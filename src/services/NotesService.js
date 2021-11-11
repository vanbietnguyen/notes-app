import axios from 'axios';

class NotesService {
    
    static async addNote(e, setNotes, notes, note,socket) {
        let textArea = document.querySelector('#note-text-area')
        textArea.value = ''
        let result = await axios.post('api/notes/add', note)
        setNotes([...notes, result.data])
        socket.emit("addNotes", result.data)
    }

    static async clearAll() {

    }

    static async deleteNote(_id, notes, setNotes, socket) {
        let newNotes = notes.reduce((acc, curr) => {
            if(curr._id !== _id) acc.push(curr)
            return acc
        }, [])

        setNotes(newNotes)
        socket.emit("deleteNotes", newNotes);
        await axios.post('api/notes/delete', { _id })
        
    }
    static async dropNote(e, notes, setNotes, socket) {
        let left = e.pageX - 50
        let top = e.pageY - 50

        let w = window.innerWidth;
        let h = window.innerHeight;

        let minWidth = (0 * w) / 100;
        let minHeight = (0 * h) / 100;
        let maxWidth = (85 * w) / 100;
        let maxHeight = (80 * h) / 100;

        if(left < 0) left = minWidth - 25
        if(left > maxWidth) left = maxWidth - 210
        if(top < 0) top = minHeight - 25
        if(top > maxHeight) top = maxHeight - 130

        e.target.style.left = `${left}px`;
        e.target.style.top = `${top}px`;
        
        let id = e.target.id
        let note = notes.filter((n) => n._id === id)
        let other = notes.filter((n) => n._id !== id)
        note[0].left = left
        note[0].top = top
        let newNotes = [...other, ...note]
        setNotes(newNotes)
        await axios.post('api/notes/update', { id, left, top })
        socket.emit("changePos", notes)
    }

}


export default NotesService;