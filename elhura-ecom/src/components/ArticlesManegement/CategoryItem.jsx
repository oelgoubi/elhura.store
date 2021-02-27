import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card:{
        height:'100px',
        position:'relative',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '15pt'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    btn_modifier:{
        backgroundColor : 'orange',
        color:'black',
        textDecoration:'1px bold'
    },
    btn_supprimer:{
        backgroundColor : 'grey',
        color:'black',
    },
    actionBtns:{
        position: "absolute",
        bottom:'0'
    }
}); 

const CategoryItem = (props) => {
    const classes = useStyles();
    const { nameCategory } = props;
    return (
        <Card className={classes.card}>
            <Typography variant="body2" component="p">
                {nameCategory}
            </Typography>
            <CardActions className={classes.actionBtns}>
                <Button  variant="contained" className={classes.btn_commander}>Modifier</Button>
                <Button  variant="contained" className={classes.btn_supprimer}>Supprimer</Button>
            </CardActions>
        </Card>
    );
};

export default CategoryItem;