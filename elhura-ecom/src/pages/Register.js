  
import React, {Component} from 'react';
import Registration from '../components/Auth/Register/Registration'

const routeDataService  = require('../services/routeData');

class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'register')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    render() {
        const { app } = this.props
        return (
            <div className='register'>
                <Registration app={app}/>
            </div>
        );
    }
}

export default Register;