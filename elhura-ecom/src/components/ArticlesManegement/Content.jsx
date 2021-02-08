  
import React, {Component} from "react";
import ArticleItem from "./ArticleItem"
import { Grid } from "@material-ui/core";
import articles from '../../mockData/constants'

const articleService = require('../../services/article');

class Content extends Component {
    constructor() {
        super();
        this.state = {
            articles : null
        }
        this.listArticles = this.listArticles.bind(this);
    }

    componentDidMount() {
        this.listArticles()
    }

    getAricles = (aricle) => {
        return (
            <Grid item xs={12}  sm={4}>
                <ArticleItem {...aricle} />
            </Grid>
        );
    }

    listArticles = async () => {
        const articles = await articleService.fetchArticles();

        this.setState({
            articles : articles
        })
    }

    render() {
        const { articles } = this.state
        return (
            <Grid container spacing={3}>
                { articles && articles.map(article => this.getAricles(article))}
            </Grid>
        );
    }
}

export default Content;