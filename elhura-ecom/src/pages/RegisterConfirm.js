  
import React, {Component} from 'react';
import RegistrationConfirm from "../components/Auth/Register/RegistrationConfirm";

const routeDataService  = require('../services/routeData');

class RegisterConfirm extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'register-confirm')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    render() {
        return (
            <div className='register_confirm'>
                <RegistrationConfirm />
            </div>
        );
    }
}

export default RegisterConfirm;