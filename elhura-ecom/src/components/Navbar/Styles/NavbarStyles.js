import { red } from "@material-ui/core/colors";

const orange = "#F2A74B";
const textLight = "#eaf2f4";
const borderColor = "skyblue";
const skyblueDark = "#71d6ff";
const backgroundDark = "#3a3a3a";

export const navbar = theme => ({
  typography: {
    padding: theme.spacing(2),
    cursor: 'default'
  },
  appBar: {
    backgroundColor: "#343A40",
    height: "50px",
    '& .MuiToolbar-regular': {
      minHeight: "50px"
    }
  },
  name: {
    marginRight: "15px"
  },
  link: {
    textTransform: "unset",
    color: "#a5a5a5",
    margin: "0 20px",
    textDecoration: "unset"
  }
});