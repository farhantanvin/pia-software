import React from 'react';
import { Route } from 'react-router-dom';

const LoginLayout  = ({ children }) => (                         
    <div>  
      {children}                                       
    </div>  
  );  

  const LoginLayoutRoute  = ({component: Component, ...rest}) => {  
    return (  
        <div className="account-page">
      <Route {...rest} render={props => (  
        <LoginLayout>  
            <Component {...props} />  
        </LoginLayout>  
      )} 
      />  
      </div>

    )  
  };  

export default LoginLayoutRoute ;  
