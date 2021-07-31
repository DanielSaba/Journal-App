import React from 'react'
import { useSelector } from 'react-redux'
import NoteScreen from '../notes/NoteScreen'
import Sidebar from './Sidebar'
import NothingSelected from './NothingSelected';

const JournalScreen =()=>{

    const {active:note}=useSelector(state=>state.notes);
    console.log(note);

    return(
        <div className="journal__main-content">
            <Sidebar/>
            <main>
                {
                    (note)
                    ?(<NoteScreen/>)
                    :(<NothingSelected/>)
                }
                {/*<NothingSelected/>*/}
                
            </main>
            
        </div>
    )
}

export default JournalScreen