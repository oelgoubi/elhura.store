import React, {Component} from 'react'
import { Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
    Toolbar,
    TextField
} from '@material-ui/core'
import Content from './Content';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated : null,
            contentType : "category"
        }
    };

    componentDidMount() {
    };

    handleSearchChange = (e) => {
        console.log(e.target.value);
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container direction="column" >
                <Grid item sm={12}>
                    <Toolbar >
                        <div className={classes.toolbar}>
                            <div className={classes.searchContainer}>
                                <SearchIcon className={classes.searchIcon} />
                                <TextField
                                    className={classes.searchInput}
                                    onChange={this.handleSearchChange}
                                    label="Search a category"
                                    variant="standard"
                                />
                            </div>
                        </div>
                    </Toolbar>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={12} sm={9}>
                        <Content contentType={this.state.contentType}/>
                    </Grid>
                    <Grid item xs={0} sm={1}></Grid>
                </Grid>
            </Grid>
        )
    }
}

export default CategoryList;
