import React from 'react';
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search'
import ArticleList from '../components/ArticlesManegement/ArticleList'
import {
  Toolbar,
  TextField
} from '@material-ui/core'

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

function Home() {
  const classes = useStyles();

  const handleSearchChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className='homy'>
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
      <ArticleList />
    </div>
  );
}

export default Home;

// https://github.com/AtotheY/YoutubePokedex/blob/master/src/Pokedex.jsx
// ALGOLIA for auto COMPLETE