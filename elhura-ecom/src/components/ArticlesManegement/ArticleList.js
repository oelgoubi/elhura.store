import React from 'react'
import { Grid } from '@material-ui/core'
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search'
import {
    Toolbar,
    TextField
} from '@material-ui/core'
import Content from './Content';


const useStyles = makeStyles((theme) => ({
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "500px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
}));

function ArticleList() {
    const classes = useStyles();

    
    const handleSearchChange = (e) => {
        console.log(e.target.value);
    };


    return (
        <Grid container direction="column" >
            <Grid item sm={12}>
                <Toolbar >
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                            className={classes.searchInput}
                            onChange={handleSearchChange}
                            label="Trouver un Article"
                            variant="standard"
                        />
                    </div>
                </Toolbar>
            </Grid>
            <Grid item container spacing={2}>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={12} sm={9}>
                    <Content />
                </Grid>
                <Grid item xs={0} sm={1}></Grid>
            </Grid>
        </Grid>
    )
}

export default ArticleList
