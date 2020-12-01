import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, CardMedia, IconButton } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

/* const useStyles = makeStyles({

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
}); */

const ArticleItem = (props) => {
    // const classes = useStyles();
    const { avatarUrl, title, subtitle, description, imageUrl } = props;


    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={avatarUrl} />
                }
                action={
                    <IconButton aria-label="settings">
                        <ShareIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader={subtitle}
            />
            <CardMedia
                style={{height:"150px"}}
                image={imageUrl}
                title={title}
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Commander</Button>
            </CardActions>
            <CardActions>
                <Button size="small">Voir plus</Button>
            </CardActions>
        </Card>
    );
}

export default ArticleItem;