import React, { Component } from "react";
import {TextField, Button, withStyles, FormControl, InputLabel, Input, Grid} from "@material-ui/core"
import {mainArticles} from "./Styles/ArticlesStyles";
import CategoryList from "./CategoryList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import FileUpload from "../Files/FileUpload";
import Dropdown from "../Toolbox/Dropdown";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ArticleList from "./ArticleList";

const articleService = require('../../services/article');
const routeDataService  = require('../../services/routeData');

class Categories extends Component {
    constructor(props) {
        super(props);
        this.errorClose = this.errorClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.newArticle = this.newArticle.bind(this);

        this.state = {
            errorOpen: false,
            id: null,
            category: "",
            designation: "",
            unitPrice: 0,
            wholesalePrice: 0,
            avatarUrl: ""
        };
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'add-articles')
        this.props.app.setState({
            path : routeData[0].path
        })
    }

    errorClose = e => {
        this.setState({
            errorOpen: false
        });
    };

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        });
    };

    async saveArticle() {
        var data = {
            title: this.state.title,
            description: this.state.description
        };

        try {
            const response = await articleService.create(data)

            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                published: response.data.published,

                submitted: true
            });
        } catch(error) {
            console.log(error)
        }
    }

    newArticle() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,

            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                <Grid container direction="column" >
                    <Grid item container justify="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                            <div className={classes.main}>
                                <CssBaseline />
                                <Paper className={classes.paper}>
                                    <form
                                        className={classes.form}
                                        onSubmit=""
                                    >
                                        <Dropdown/>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel htmlFor="designation" className={classes.labels}>
                                                Désignation
                                            </InputLabel>
                                            <Input
                                                name="designation"
                                                type="designation"
                                                autoComplete="designation"
                                                className={classes.inputs}
                                                disableUnderline={true}
                                                onChange={this.handleChange("designation")}
                                            />
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel htmlFor="unitprice" className={classes.labels}>
                                                Prix unitaire
                                            </InputLabel>
                                            <Input
                                                name="unitprice"
                                                type="unitprice"
                                                autoComplete="unitprice"
                                                className={classes.inputs}
                                                disableUnderline={true}
                                                onChange={this.handleChange("unitPrice")}
                                            />
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel htmlFor="wholesaleprice" className={classes.labels}>
                                                Prix de gros
                                            </InputLabel>
                                            <Input
                                                name="wholesaleprice"
                                                type="wholesaleprice"
                                                autoComplete="wholesaleprice"
                                                className={classes.inputs}
                                                disableUnderline={true}
                                                onChange={this.handleChange("wholesalePrice")}
                                            />
                                        </FormControl>
                                        <Button
                                            disableRipple
                                            fullWidth
                                            variant="outlined"
                                            className={classes.button}
                                            type="submit"
                                            onClick={this.saveArticle}
                                        >
                                            Ajouter
                                        </Button>
                                        {this.state.submitted ? (
                                            <div className={classes.form}>
                                                <h4>You submitted successfully!</h4>
                                            </div>
                                        ) : null }
                                    </form>

                                    {this.state.error ? (
                                        <Snackbar
                                            variant="error"
                                            key={this.state.error}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center"
                                            }}
                                            open={this.state.errorOpen}
                                            onClose=""
                                            autoHideDuration={3000}
                                        >
                                            <SnackbarContent
                                                className={classes.error}
                                                message={
                                                    <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                                                        <span> {this.state.error} </span>
                                                    </div>
                                                }
                                                action={[
                                                    <IconButton
                                                        key="close"
                                                        aria-label="close"
                                                        onClick=""
                                                    >
                                                        <CloseIcon color="error" />
                                                    </IconButton>
                                                ]}
                                            />
                                        </Snackbar>
                                    ) : null}
                                </Paper>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            <CategoryList classes={classes}/>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(mainArticles)(Categories)