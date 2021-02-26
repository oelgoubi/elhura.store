  
import React from 'react';
import Registration from '../components/Auth/Register/Registration'

function Register(props) {
  return (
    <div className='register'>
        <Registration app={props.app}/>
    </div>
  );
}

export default Register;