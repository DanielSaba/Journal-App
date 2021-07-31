import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

const AuthRouter =()=>{

    return(
        <div className="auth__main">
            <div className="auth_box_container">
                <Switch>
                    <Route
                        exact
                        path="/auth/login"
                        component={LoginScreen}
                    />
                    <Route
                        exact
                        path="/auth/register"
                        component={RegisterScreen}
                    />
                    <Redirect to="/auth/register"/>
                </Switch>
            </div>
        </div>
    )
}

export default AuthRouter