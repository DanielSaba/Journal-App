import { loadNotes } from "../../helpers/loadNotes";
import { db } from "../firebase/firebase-config";
import JournalEntries from "../journal/JournalEntries";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { fileUpload } from "../../helpers/fileUpload";
//react-journal

export const notes=()=>{
    return async (dispatch, getState)=>{
        const {uid}=getState().auth;
        const newNote={
            title:'',
            body:'',
            date:new Date().getTime()
        }
        const doc =await db.collection(`${uid}/journal/notes`).add(newNote);
        console.log(doc);
        dispatch(activar(doc.id,newNote));
        dispatch(addNewNote(doc.id,newNote));
    }
}

export const activar=(id,note)=>({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
});

export const addNewNote=(id, note)=>({
    type: types.notesAddNew,
    payload:{
        id,...note
    }
})

export const startLoadingNotes=(uid)=>{
   return async (dispatch)=>{
       const notes=await loadNotes(uid);
       dispatch(setNotes(notes));
   }

}

export const setNotes=(notes)=>({
    type:types.notesLoad,
    payload:notes
});


export const startSaveNote=(note)=>{
    return async (dispatch, getState)=>{
        const {uid}=getState().auth;

        if(!note.url){
            delete note.url;
        }
        const noteToFirestore={...note};
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire('Saved',note.title,'success');
    }

}

export const refreshNote=(id, note)=>({
    type:types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }    
})


export const startUploading=(file)=>{

    return async (dispatch, getState)=>{
        const {active:activeNote} = getState().notes;

        Swal.fire({
            title:'Uploading...',
            text:'please await...',
            allowOutsideClick: false,
            willOpen:()=>{
                Swal.showLoading();
            }
        })

        const fileUrl= await fileUpload(file);
        activeNote.url=fileUrl;
        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

export const startDeleting=(id)=>{
    return async (dispatch, getState)=>{
        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
    }
}

export const deleteNote=(id)=>({
    type:types.notesDelete,
    payload:id
})

