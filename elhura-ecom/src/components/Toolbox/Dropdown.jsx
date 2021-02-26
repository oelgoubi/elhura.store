import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { toolbox } from "./Styles/ToolboxStyles";
import {withStyles} from "@material-ui/core";
import {file} from "../Files/Styles/FileStyles";

class SimpleSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            age: event.target.value
        })
    };

    render() {
        const { classes } = this.props
        const { age } = this.state
        return (
            <div className={classes.dropdown}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" className={classes.categoryLabel}>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={classes.selectValue}
                        value={age}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(toolbox)(SimpleSelect);