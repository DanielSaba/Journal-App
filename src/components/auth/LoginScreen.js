import React from 'react'
import google from '../../assets/google.jpg';
import {Link} from 'react-router-dom';
import useForm from '../hooks/useForm';
import {useDispatch, useSelector} from 'react-redux';
import { login, startGoogleLogin } from '../actions/auth';
import {starLoginEmailPassword} from '../actions/auth';

const LoginScreen =()=>{

    const dispatch=useDispatch(); 
    const {loading} = useSelector(state=>state.ui);

    const [formValues, handledInputChange]=useForm({
        email: 'danielantonio@gmail.com',
        password: '123456'
    });

    const {email, password} = formValues;

    const handledSubmit=(e)=>{
        e.preventDefault();
        dispatch(starLoginEmailPassword(email,password));
        console.log(email,password);
    }

    const handledLoginGoolgle=()=>{
        dispatch(startGoogleLogin());
    }


    return(
        <>
        <h1>Login Screen </h1>

        <form onSubmit={handledSubmit}  className="form-login">
            <input
                className="input-login"
                type="text"
                placeholder="Nombre"
                name="email"
                value={email}
                onChange={handledInputChange}
            />
            <input
                className="input-login"
                type="password"
                placeholder="***"
                name="password"
                value={password}
                onChange={handledInputChange}
            />
            <div>
                <button
                    className="button-login pointer"
                    disabled={loading}
                    type="submit"
                >
                    Login
                </button>
            </div>
            <div>
                <p>
                    Sign in with Google
                </p>
                <img 
                onClick={handledLoginGoolgle}
                className="img-login pointer"
                src={google} alt="for sell" />
                <Link
                    to="/auth/register"
                >
                    Already Registered?
                </Link>
            </div>
        </form>

        </>
    )
}

export default LoginScreen