import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, CardMedia, IconButton } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
    card:{
        height:'400px',
        position:'relative'
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
    btn_commander:{
        backgroundColor : 'orange',
        color:'black',
        textDecoration:'1px bold'
    },
    btn_offer:{
        backgroundColor : 'grey',
        color:'black',
    },
    actionBtns:{
        position: "absolute",
        bottom:'0'
    }
   
}); 

const ArticleItem = (props) => {
    const classes = useStyles();
    const { avatarUrl, title, description, imageUrl,price } = props;


    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar src={avatarUrl} />
                }
                action={
                    <IconButton aria-label="settings">
                        <ShareIcon />
                    </IconButton>
                }
                title={title}
                subheader={price}
            />
            <CardMedia
                style={{height:"150px"}}
                image={imageUrl}
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className={classes.actionBtns}>
                <Button  variant="contained" className={classes.btn_commander}>Commander</Button>
                <Button  variant="contained" className={classes.btn_offer}>Voir plus</Button>
            </CardActions>
        </Card>
    );
}

export default ArticleItem;