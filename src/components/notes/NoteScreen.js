import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NotesAppBar from './NotesAppBar';
import useForm from '../hooks/useForm';
import { activar, startDeleting } from '../actions/notes';
import img from '../../assets/noImagen.png'

const NoteScreen =()=>{

    const dispatch=useDispatch();

    const {active:note} = useSelector(state=>state.notes);
    const  [formValues, handleInputChange, reset]=useForm(note);

    console.log(formValues);
    const  {title, body, id}=formValues;

    const activeId=useRef(note.id);

    useEffect(()=>{
        if(note.id !== activeId.current)
        reset(note);
        activeId.current=note.id;
    },[note, reset]);

    useEffect(()=>{
        dispatch(activar(formValues.id,{...formValues}));
    },[formValues, dispatch]);

    const handleDelete = ()=>{
        dispatch(startDeleting(id));
    }

    return(
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">
                <input
                type="text"
                placeholder="Some title"
                className="notes__title-input"
                value={title}
                name='title'
                onChange={handleInputChange}
                />
                <textarea
                type="text"
                className="notes__textArea"
                placeholder="Whats's App"
                value={body}
                name='body'
                onChange={handleInputChange}
                >
                </textarea>
                {
                    note.url ? 
                        <div className="notes__image">
                            <img
                                src={note.url}
                                alt="for sell"
                            />
                        </div>
                    : 
                        <div className="notes__image">
                            <img
                                src={img}
                                alt="for sell"
                            />
                        </div>
                }
                

                <button className="btn-danger"
                    onClick={handleDelete}
                >
                    delete
                </button>
            </div>
           

        </div>
    )
}

export default NoteScreen;