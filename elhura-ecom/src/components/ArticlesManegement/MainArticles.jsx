import React, {Component} from 'react';
import {AppBar, Toolbar, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from "react-router-dom";
import {mainArticles} from "./Styles/ArticlesStyles";

class MainArticles extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props
        return (
            <div>

            </div>
        );
    }
}

export default withRouter(withStyles(mainArticles)(MainArticles));