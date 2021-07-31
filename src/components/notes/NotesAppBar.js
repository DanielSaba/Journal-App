import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../actions/notes';

const NotesAppBar=()=>{

const dispatch=useDispatch();
 const{active}=useSelector(state=>state.notes);

const handleSave=()=>{
   dispatch(startSaveNote(active));
}

const handlePicture=()=>{
    document.querySelector('#idButtonChange').click();
}

const handleFileChange=(e)=>{
    const file=e.target.files[0];
    if(file){
        dispatch(startUploading(file));
    }
}

    return(
        <div className="notes__appbar">
            <span>29 de abril</span>
            <input
                id='idButtonChange'
                style={{display:'none'}}
                name='file'
                type="file"
                onChange={handleFileChange}
            />
                <div>
                    <button className="btn"
                        onClick={handlePicture}
                    >
                        picture
                    </button>
                    <button className="btn"
                        onClick={handleSave} 
                    >
                        save
                    </button>
                </div>
        </div>
    )
}

export default NotesAppBar;