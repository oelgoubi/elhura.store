import React, { Component } from "react";
import {TextField, Button, withStyles, FormControl, InputLabel, Input, Toolbar} from "@material-ui/core"
import {mainArticles} from "./Styles/ArticlesStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FileUpload from "../Files/FileUpload";
import Dropdown from "../Toolbox/Dropdown";
import { Grid } from '@material-ui/core'
import ArticleList from "./ArticleList";
import {withRouter} from "react-router-dom";

const articleService = require('../../services/article');
const routeDataService  = require('../../services/routeData');
const historyService  = require('../../services/history');

class EditArticle extends Component {
    constructor(props) {
        super(props);
        this.errorClose = this.errorClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.newArticle = this.newArticle.bind(this);

        this.state = {
            errorOpen: false,
            id: null,
            category: null,
            designation: "",
            unitPrice: 0,
            wholesalePrice: 0,
            avatarName: "",
            description: ""
        };
    }

    componentDidMount() {
        let routeData = routeDataService.routeData()
        routeData = routeData.filter(item => item.id === 'add-articles')
        this.props.app.setState({
            path : routeData[0].path
        })
        const { state } = this.props.location
        this.setState({
            category: state.idCategory,
            designation: state.designation,
            unitPrice: state.unitPrice,
            wholesalePrice: state.wholesalePrice,
            avatarName: state.avatarName,
            description: state.description
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

    updateArticle = async (id, e) => {
        var data = {
            idCategory: this.state.category,
            designation: this.state.designation,
            unitPrice: this.state.unitPrice,
            wholesalePrice: this.state.wholesalePrice,
            avatarName: this.state.avatarName,
            description: this.state.description
        };

        try {
            await articleService.update(id, data)
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
        const { classes, app } = this.props
        const { state } = this.props.location

        if(state === undefined) {
            historyService.history(true).push('/products')
        }
        return (
            <React.Fragment>
                <Grid container direction="column" >
                    <Grid item container justify="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                            <div className={classes.main}>
                                <CssBaseline />
                                <Paper className={classes.paper}>
                                    <FileUpload addArticleComponent={this} locationState={state}/>
                                    <form
                                        className={classes.form}
                                        onSubmit={(e) => this.updateArticle(state.idArticle, e)}
                                    >
                                        <Dropdown editArticleComponent={this} app={app} locationState={state}/>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel htmlFor="designation" className={classes.labels}>
                                                Designation
                                            </InputLabel>
                                            <Input
                                                name="designation"
                                                type="designation"
                                                autoComplete="designation"
                                                className={classes.inputs}
                                                defaultValue={state.designation}
                                                disableUnderline={true}
                                                onChange={this.handleChange("designation")}
                                            />
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel htmlFor="unitprice" className={classes.labels}>
                                                Unit price
                                            </InputLabel>
                                            <Input
                                                name="unitprice"
                                                type="unitprice"
                                                autoComplete="unitprice"
                                                className={classes.inputs}
                                                defaultValue={state.unitPrice}
                                                disableUnderline={true}
                                                onChange={this.handleChange("unitPrice")}
                                            />
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <InputLabel htmlFor="wholesaleprice" className={classes.labels}>
                                                Wholesale price
                                            </InputLabel>
                                            <Input
                                                name="wholesaleprice"
                                                type="wholesaleprice"
                                                autoComplete="wholesaleprice"
                                                className={classes.inputs}
                                                defaultValue={state.wholesalePrice}
                                                disableUnderline={true}
                                                onChange={this.handleChange("wholesalePrice")}
                                            />
                                        </FormControl>
                                        <FormControl required fullWidth margin="normal">
                                            <TextField
                                                name="description"
                                                type="description"
                                                autoComplete="description"
                                                id="outlined-multiline-static"
                                                label="Description"
                                                multiline
                                                rows={4}
                                                disableUnderline={true}
                                                InputLabelProps={{
                                                    className: classes.labels
                                                }}
                                                InputProps={{
                                                    className: classes.inputs
                                                }}
                                                defaultValue={state.description}
                                                onChange={this.handleChange("description")}
                                            />
                                        </FormControl>
                                        <Button
                                            disableRipple
                                            fullWidth
                                            variant="outlined"
                                            className={classes.button}
                                            type="submit"
                                        >
                                            Apply changes
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
                            <ArticleList classes={classes} app={app}/>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(mainArticles)(EditArticle));