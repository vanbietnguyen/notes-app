import axios from 'axios';
import config from '../config.js'

class NotesService {
    
    static async addNote(e, setNotes, notes, note,socket) {
        let textArea = document.querySelector('#note-text-area')
        textArea.value = ''

        try {
            let result = await axios.post(`${config.SERVER_URI}api/notes/add`, note)
            let newNotes = [...notes, result.data]
            setNotes(newNotes)
            socket.emit("modifyNotes", newNotes)
        } catch(e) {
            return e
        }
    }

    static async clearAll(setLines, setNotes, socket) {
        setLines([])
        setNotes([])
        socket.emit("clearAll")
        try {
            await axios.post(`${config.SERVER_URI}api/notes/clearNotesLines`)
        } catch(e) {
            return e
        }
        
    }

    static async deleteNote(_id, notes, setNotes, socket) {
        let newNotes = notes.reduce((acc, curr) => {
            if(curr._id !== _id) acc.push(curr)
            return acc
        }, [])

        setNotes(newNotes)
        socket.emit("modifyNotes", newNotes);
        try {
            await axios.post(`${config.SERVER_URI}api/notes/delete`, { _id })
        } catch(e) {
            return e
        }
        
        
    }
    static async dropNote(e, notes, setNotes, socket) {
        let left = e.pageX - 50
        let top = e.pageY - 50

        let w = window.innerWidth;
        let h = window.innerHeight;
        console.log(w, )

        let minWidth = (9 * w) / 100;
        // let minWidth = 129
        let minHeight = (15 * h) / 100;
        let maxWidth = (84 * w) / 100;
        let maxHeight = (76 * h) / 100;

        if(left < minWidth) left = minWidth + 50
        if(left > maxWidth) left = maxWidth - 50
        if(top < 0) top = minHeight + 50
        if(top > maxHeight) top = maxHeight - 50

        e.target.style.left = `${left}px`;
        e.target.style.top = `${top}px`;
        
        let id = e.target.id
        let note = notes.filter((n) => n._id === id)
        let other = notes.filter((n) => n._id !== id)
        note[0].left = left
        note[0].top = top
        let newNotes = [...other, ...note]
        setNotes(newNotes)
        
        try {
            await axios.post(`${config.SERVER_URI}api/notes/update`, { id, left, top })
            socket.emit("modifyNotes", newNotes)
        } catch(e) {
            return e
        }
        
    }
    static async getNotes(setNotes) {
        try {
            let result = await axios.get(`${config.SERVER_URI}api/notes/`)
            setNotes(result.data);    
        } catch (e) {
            return e
        }
    }

}


export default NotesService;