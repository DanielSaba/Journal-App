import React from 'react'
import JournalEntries from './JournalEntries'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, startLogout } from '../actions/auth';
import { noteLogout, notes } from '../actions/notes';

const Sidebar=()=>{

    const dispatch=useDispatch();
    const {name}=useSelector(state=>state.auth);

    const dispa=()=>{
        dispatch(startLogout());
    }

    const handleAddNew =()=>{
        dispatch(notes());
    }

    return(

        <div className="journal__sidebar ">
            <div className="journal__sidebar-navbar">
                <h3>
                    <span>{name}</span>
                </h3>
                <button 
                onClick={dispa} className="btn"
                >
                    Logout
                </button>
            </div>
            <div 
            className="journal__new-entry"
            onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
            </div>
            <JournalEntries/>
            
        </div>
    )
}

export default Sidebar;