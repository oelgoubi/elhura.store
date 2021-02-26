  
import React from 'react';
import RegistrationChoices from "../components/Auth/Register/RegistrationChoices";

function RegisterChoices(props) {
  return (
    <div className='register_choices'>
        <RegistrationChoices app={props.app}/>
    </div>
  );
}

export default RegisterChoices;