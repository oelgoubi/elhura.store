import React, {Component} from 'react'
import { Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
    Toolbar,
    TextField
} from '@material-ui/core'
import Content from './Content';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated : null,
            contentType : "article"
        }
    };

    componentDidMount() {
    };

    handleSearchChange = (e) => {
        console.log(e.target.value);
    };

    render() {
        const { classes, app } = this.props;
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
                                    label="Search an article"
                                    variant="standard"
                                />
                            </div>
                        </div>
                    </Toolbar>
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Content contentType={this.state.contentType} app={app}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default ArticleList
