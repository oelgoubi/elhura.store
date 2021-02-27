import React, {Component} from 'react';
import {AppBar, Toolbar, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from "react-router-dom";
import {mainArticles} from "./Styles/ArticlesStyles";
import ArticleList from "./ArticleList";

class MainArticles extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, app } = this.props
        return (
            <div>
                <ArticleList classes={classes} app={app}/>
            </div>
        );
    }
}

export default withRouter(withStyles(mainArticles)(MainArticles));