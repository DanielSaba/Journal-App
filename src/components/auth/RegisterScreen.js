import React from 'react'
import {Link} from 'react-router-dom';
import useForm from '../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWitchEmailPassword } from '../actions/auth';


const RegisterScreen =()=>{

    const dispatch=useDispatch(); 
    const {msgError}= useSelector((state)=>state.ui);
    console.log(msgError);

    const [form, formvalues]=useForm({
        nombre:'',
        email:'',
        password:'',
        password2:''

    });

    const {nombre, email, password, password2}=form;

    const handledRegister=(e)=>{
        e.preventDefault();
        if(isFormValued()){
            dispatch(startRegisterWitchEmailPassword(email,password,nombre));
        }
        
    }

    const isFormValued=()=>{
        if(nombre.trim().length===0){
            return false
        }else if(!validator.isEmail(email)){
            dispatch(setError('email no valided'));
            console.log('Error');
            return false

        }else if(password !== password2 || password.length<5){
            dispatch(setError('Contraseña no valida'));
            console.log('Contraseña no valida');
            return false
        }

        dispatch(removeError());
        return true
    }

    return(
        <>
        <h1>RegisterScreen</h1>
        <form onSubmit={handledRegister} className="form-login">
            <div style={{backgroundColor:'red'}}>
                {msgError}
            </div>
            <input
                className="input-login"
                type="text"
                placeholder="Name"
                name="nombre"
                value={nombre}
                onChange={formvalues}
            />
            <input
                className="input-login"
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={formvalues}
            />
            <input
                className="input-login"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={formvalues}
            />
             <input
                className="input-login"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={formvalues}
            />
            <div>
                <button
                    className="button-login pointer"
                    type="submit"
                >
                    Register
                </button>
            </div>
            <div>
                <Link
                    to="/auth/login"
                >
                    Already Registered?
                </Link>
            </div>
        </form>
        </>
    )
}

export default RegisterScreen