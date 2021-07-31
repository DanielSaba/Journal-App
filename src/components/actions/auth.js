import Swal from 'sweetalert2';
import { types } from "../types/types";
import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./loading";


export const starLoginEmailPassword=(email, password)=>{
    return(dispatch)=>{
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(({user})=>{
                dispatch(
                    login(user.uid,user.displayName)
                )
                dispatch(finishLoading());
            })
            .catch(e=>{
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('Error',e.message,'error');
            })
            
    }
}

export const startGoogleLogin=()=>{
    return(dispatch)=>{
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user})=>{
                dispatch(
                    login(user.id, user.displayName)
                )
            })       
    }
}

//Registro en firebase por correo y contraseña
export const startRegisterWitchEmailPassword =(email, password, name)=>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async({user})=>{
                console.log(user);
                await user.updateProfile({displayName:name});
                dispatch(
                    login(user.uid,user.displayName)
                );
            })
            .catch(e=>{
                console.log(e);
                Swal.fire('Error',e.message,'error')
            })
    }
}

 export const login=(uid, displayName)=>({
    type:types.login,
    payload:{
        uid,
        displayName
    }
});

export const startLogout=()=>{
    return async (dispatch)=>{
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout=()=>({
    type:types.logout
})

export const noteLogout=()=>({
    type:types.notesLogoutCleaning,
})

