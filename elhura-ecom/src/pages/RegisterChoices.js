  
import React, {Component} from 'react';
import RegistrationChoices from "../components/Auth/Register/RegistrationChoices";

const routeDataService  = require('../services/routeData');

class RegisterChoices extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'register-choices')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    render() {
        const { app } = this.props
        return (
            <div className='register_choices'>
                <RegistrationChoices app={app}/>
            </div>
        );
    }
}

export default RegisterChoices;