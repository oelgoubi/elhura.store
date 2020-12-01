  
import React from "react";
import ArticleItem from "./ArticleItem"
import { Grid } from "@material-ui/core";
import articles from '../../mockData/constants'

const Content = () => {
    const getAricles = (aricle) => {
        return (
            <Grid item xs={12}  sm={4}>
                <ArticleItem {...aricle} />
            </Grid>
        );
    }


  return (
    <Grid container spacing={2}>
      {articles.map(article => getAricles(article))}
    </Grid>
  );
};

export default Content;