import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRouter =({
    isAutheticated,
    component:Component,
    ...rest
})=>{

    return(
        <Route {...rest} 
            component={(props)=>(
                (isAutheticated)
                    ?(<Redirect to="/" /> )
                    :(<Component {...props}/>)
            )}
        />
    )
}