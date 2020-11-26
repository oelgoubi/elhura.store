import React from 'react'
import { Grid } from '@material-ui/core'
import ArticleItem from "./ArticleItem"
import articles from '../../mockData/constants'

function ArticleList() {
    const getAricles = (aricle) => {
        return (
            <Grid item xs={12} sm={3}>
                <ArticleItem {...aricle} />
            </Grid>
        );
    }



    return (
        <Grid container direction="column" >
            <Grid item>
                This is where the Search Bar will Be
            </Grid>
            <Grid item container spacing={3}>
                <Grid item xs={0} sm={2}></Grid>
                    {articles.map(article => getAricles(article))}
                <Grid item xs={0} sm={1}></Grid>
            </Grid>
        </Grid>
    )
}

export default ArticleList
