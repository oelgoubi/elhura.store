import React, {Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, CardMedia, IconButton } from '@material-ui/core';
import {mainArticles} from "./Styles/ArticlesStyles";
import {withRouter} from "react-router-dom";
import {register} from "../Auth/Register/Styles/RegistrationStyles";

const historyService = require('../../services/history');
const articleService = require('../../services/article');

class ArticleItem extends Component {
    constructor(props) {
        super(props);
        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    editArticle = async (article, e) => {
        historyService.history(true).push("/articles/edit", article);
    }

    deleteArticle = async (article, e) => {
        await articleService.deleteArticle(article.idArticle)
        historyService.history(true).push("/products", article);
    }

    render(){
        const { idArticle, designation, idCategory, unitPrice, wholesalePrice, description, avatarUrl, app, classes} = this.props;
        const article = {
            idArticle,
            idCategory,
            designation,
            unitPrice,
            wholesalePrice,
            description,
            avatarUrl
        }
        return (
            <Card className={classes.card}>
                <CardMedia
                    style={{width : "150px", height:"150px"}}
                    image={avatarUrl}
                />
                <CardContent>
                    <Typography variant="body2" component="p">
                        {designation}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actionBtns}>
                    { app.state.userRole !== 2 ?
                        (<React.Fragment>
                            <Button variant="contained" className={classes.btn_commander}>Add to cart</Button>
                            <Button  variant="contained" className={classes.btn_offer}>More info</Button>
                        </React.Fragment>) :
                        (<React.Fragment>
                            <Button
                                variant="contained"
                                className={classes.btn_commander}
                                onClick={(e) => this.editArticle(article, e)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.btn_offer}
                                onClick={(e) => this.deleteArticle(article, e)}
                            >
                                Delete
                            </Button>
                        </React.Fragment>)
                    }
                </CardActions>
            </Card>
        );
    }
};

export default withRouter(withStyles(mainArticles)(ArticleItem));