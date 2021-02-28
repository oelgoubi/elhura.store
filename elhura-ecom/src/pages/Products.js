import React, {Component} from 'react';
import MainArticles from "../components/ArticlesManegement/MainArticles";

const routeDataService  = require('../services/routeData');

class Products extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'products')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    render() {
        const {app} = this.props
        return (
            <MainArticles app={app}/>
        );
    }
}

export default Products;