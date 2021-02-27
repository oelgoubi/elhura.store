  
import React, {Component} from 'react';
import LogInForm from '../components/Auth/Login/LogInForm';

const routeDataService  = require('../services/routeData');

class LogIn extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'login')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    render() {
        return (
            <div className='logIn'>
                <LogInForm />
            </div>
        );
    }
}

export default LogIn;