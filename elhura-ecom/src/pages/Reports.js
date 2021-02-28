  
import React, {Component} from 'react';

const routeDataService  = require('../services/routeData');

class Reports extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'reports')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    render() {
        return (
            <div className='reports'>
                <h1>Reports</h1>
            </div>
        );
    }
}

export default Reports;