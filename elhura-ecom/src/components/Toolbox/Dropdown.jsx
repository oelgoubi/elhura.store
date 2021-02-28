import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { toolbox } from "./Styles/ToolboxStyles";
import {Grid, withStyles} from "@material-ui/core";
import {file} from "../Files/Styles/FileStyles";
import ArticleItem from "../ArticlesManegement/ArticleItem";

const articleService = require('../../services/article');
const helpers = require('../../utils/helpers');

class SimpleSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null
        }
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    componentDidMount() {
        this.fetchCategories()
    }

    handleChange = (event) => {
        if (this.props.addArticleComponent !== undefined) {
            this.props.addArticleComponent.setState({
                category: event.target.value
            })
        }
        if (this.props.editArticleComponent !== undefined) {
            this.props.editArticleComponent.setState({
                category: event.target.value
            })
        }
    };

    getCategories = (item) => {
        return (
            <MenuItem value={item.idCategory}>{item.nameCategory}</MenuItem>
        );
    }

    async fetchCategories() {
        const categories = await articleService.listCategories();

        this.setState({
            categories
        })
    }

    render() {
        const { classes, app, editArticleComponent, locationState } = this.props
        const { category, categories } = this.state
        return (
            <div className={classes.dropdown}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" className={classes.categoryLabel}>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.selectValue}
                        value={category}
                        defaultValue={locationState !== undefined ? locationState.idCategory : null}
                        onChange={this.handleChange}
                    >
                        { categories && categories.sort((item1, item2) => helpers.compareStrings(item1.nameCategory, item2.nameCategory)).map(item => this.getCategories(item)) }
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(toolbox)(SimpleSelect);