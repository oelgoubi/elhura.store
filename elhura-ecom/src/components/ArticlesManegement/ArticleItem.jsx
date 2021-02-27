import React, {Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, CardMedia, IconButton } from '@material-ui/core';
import {mainArticles} from "./Styles/ArticlesStyles";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({forceRefresh:false})

class ArticleItem extends Component {
    constructor(props) {
        super(props);
        this.editArticle = this.editArticle.bind(this);
    }

    editArticle = async (article) => {
        console.log("ARTICLE BEING : ")
        console.log(this.props.app.articleBeingEdited)
        await this.props.app.setState({
            articleBeingEdited: article
        })
        console.log("ARTICLE BEING : ")
        console.log(this.props.app.articleBeingEdited)
        history.push("/articles/edit")
        console.log("ARTICLE BEING : ")
        console.log(this.props.app.articleBeingEdited)
    }

    render(){
        const { designation, idCategory, unitPrice, wholesalePrice, description, avatarUrl, app, classes} = this.props;

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
                                onClick={() => this.editArticle({
                                    idCategory,
                                    designation,
                                    unitPrice,
                                    wholesalePrice,
                                    description
                                })}
                            >
                                Edit
                            </Button>
                            <Button  variant="contained" className={classes.btn_offer}>Delete</Button>
                        </React.Fragment>)
                    }
                </CardActions>
            </Card>
        );
    }
};

export default withStyles(mainArticles)(ArticleItem);