  
import React, {Component} from "react";
import ArticleItem from "./ArticleItem";
import CategoryItem from "./CategoryItem";
import { Grid } from "@material-ui/core";

const articleService = require('../../services/article');

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : null
        }
        this.listContent = this.listContent.bind(this);
    }

    componentDidMount() {
        this.listContent()
    }

    getContent = (item) => {
        return (
            <Grid item xs={12}  sm={3}>
                { this.props.contentType === "article" && <ArticleItem {...item} app={this.props.app}/> }
            </Grid>
        );
    }

    listContent = async () => {
        if (this.props.contentType === "article") {
            const articles = await articleService.listArticles();

            this.setState({
                content : articles
            })
        }
    }

    render() {
        const { content } = this.state
        return (
            <Grid container spacing={1}>
                { content && content.map(item => this.getContent(item))}
            </Grid>
        );
    }
}

export default Content;