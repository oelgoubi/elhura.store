import { styles } from "./css-common";
import { withStyles } from "@material-ui/core";

class ArticleManagement extends Component {
    render() {
        const { classes } = this.props

        return (
            <div>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <Typography className={classes.name} variant="h6">
                            Elhura
                        </Typography>
                        <Link to={"/tutorials"} className={classes.link}>
                            <Typography variant="body2">
                                Articles
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(ArticleManagement);