/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Notes from '../components/notes/Notes'
import Sidebar from './Sidebar'
import NotesModal from '../components/notes/NotesModal'
import CanvasArea from '../components/notes/CanvasArea'
import axios from 'axios';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";
const socket = socketIOClient(ENDPOINT);
// set up sockets whenever new notes occur and whenever we setNotes or Lines 
// (on mouse up, change position, create note, deletenote, clear)

// import services from '../services/services'


const NotesContainer = () => {
    // websockets testing
    const [response, setResponse] = useState("");

    const [notes, setNotes] = useState([])
    const [showModal, setModal] = useState(false)
    const [drawPointer, setDrawPointer] = useState(false)
    const [lines, setLines] = useState([]);
    const [tool, setTool] = useState("eraser")

    // websockets testing
    useEffect(async() => {
        socket.on("FromAPI", data => {
            setResponse(data);
            console.log(data, 'res from sockets in frontend')
          });
    }, [])

    useEffect(async() => {
        let result = await axios.get('api/notes/')
        setNotes(result.data);
    }, [])

    // setting Notes based on listeners
    useEffect(() => {
        socket.on("add", (data) => {
          setNotes([...notes, data]); 
        });
      }, [socket, notes, setNotes]);

    useEffect(async() => {
        let result = await axios.get('api/lines/')

        for(let line of result.data) {
            delete line._id
            delete line.__v
        }
        setLines(result.data)
    }, [])

    const changeModal = () => {
        if(drawPointer) setDrawPointer(false)
        setModal(prev => !prev)
    }

    const changePointer = () => {
        let canvas = document.querySelector('.canvas-stage')
        // set canvas to back
        if(drawPointer) canvas.style.zIndex = -1
        setDrawPointer(false)
    }

    const changeTool = (selectedTool) => {
        let canvas = document.querySelector('.canvas-stage')
        canvas.style.zIndex = 99
        setDrawPointer(true)
        setTool(selectedTool)
    }

    return (
        <div className="notes-container">
            {response}
            { showModal ? 
                <>
                    <NotesModal
                        socket={socket}
                        notes={notes} 
                        setNotes={setNotes} 
                        closeModal={changeModal}
                    />
                    <div className="modalToggle">
                        <Sidebar
                            socket={socket} 
                            changePointer={changePointer} 
                            notes={notes} 
                            changeTool={changeTool} 
                            setNotes={setNotes} 
                            setLines={setLines} 
                            openModal={changeModal} 
                        />
                        <Notes socket={socket} notes={notes} setNotes={setNotes} />
                        <CanvasArea
                            socket={socket}   
                            drawPointer={drawPointer} 
                            tool={tool} 
                            lines={lines} 
                            setLines={setLines}
                        />
                    </div> 
                    
                </>
                :  ///////////////ELSE/////////////////////////////////////////////
                <>
                    <Sidebar 
                        changePointer={changePointer} 
                        notes={notes} 
                        changeTool={changeTool} 
                        setNotes={setNotes} 
                        setLines={setLines} 
                        openModal={changeModal} 
                    />
                    <Notes notes={notes} setNotes={setNotes} />
                    <CanvasArea  
                        drawPointer={drawPointer} 
                        tool={tool} 
                        lines={lines} 
                        setLines={setLines}
                    />
                </> }
            
        </div>
    )
}

export default NotesContainer;