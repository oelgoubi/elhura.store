import React, {Component} from 'react';
import ArticleList from '../components/ArticlesManegement/ArticleList';
import {mainArticles} from "../components/ArticlesManegement/Styles/ArticlesStyles";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";

const routeDataService  = require('../services/routeData');

class Home extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'home')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    render() {
        const {classes, app} = this.props
        return (
            <div className='home'>
                <ArticleList classes={classes} app={app}/>
            </div>
        );
    }
}

export default withRouter(withStyles(mainArticles)(Home));

// https://github.com/AtotheY/YoutubePokedex/blob/master/src/Pokedex.jsx
// ALGOLIA for auto COMPLETE