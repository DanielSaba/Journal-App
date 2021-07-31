import React, { useEffect, useState } from 'react';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import {firebase} from '../components/firebase/firebase-config';

import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { login } from '../components/actions/auth';
import { useDispatch } from 'react-redux';
//Ruta Privada
import { PrivateRouter } from './PrivateRoute';
import { PublicRouter } from './PublicRouter';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes, startLoadingNotes } from '../components/actions/notes';

  const AppRouter=()=>{

    const dispatch=useDispatch();
    const [checking,setChecking]=useState(true);
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    useEffect(()=>{
      firebase.auth().onAuthStateChanged(async(user)=>{
        if(user?.uid){
          dispatch(login(user.uid, user.displayName));
          setIsLoggedIn(true);
          console.log(user.uid);

          dispatch(startLoadingNotes(user.uid));

        }else{
          setIsLoggedIn(false);
        }
        setChecking(false)
      })
    },[setChecking])

    if(checking){
      return(
        <h1>.....</h1>
      )
    }

    return(
      <Router>
            <div>
              <Switch>
                <PublicRouter
                  path="/auth"
                  component={AuthRouter}
                  isAutheticated={isLoggedIn}
                />
                <PrivateRouter
                  exact
                  isAuthenticated={isLoggedIn}
                  path="/"
                  component={JournalScreen}
                />
              </Switch>
            </div>
      </Router>
    )

  }
      
        
export default AppRouter
    
  



