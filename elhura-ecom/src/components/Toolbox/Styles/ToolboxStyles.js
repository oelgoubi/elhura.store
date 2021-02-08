import { red } from "@material-ui/core/colors";

const orange = "#F2A74B";
const textLight = "#eaf2f4";
const borderColor = "skyblue";
const skyblueDark = "#71d6ff";
const backgroundDark = "#3a3a3a";

export const toolbox = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "98% !important"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dropdown: {
    marginTop: "-20px !important"
  },
  categoryLabel: {
    paddingLeft: "20px !important",
    fontSize: "12px",
    lineHeight: "5px",
    fontFamily: "PT Mono, monospace",
    fontWeight: "bold",
    color: `${skyblueDark} !important`
  },
  selectValue: {
    position: "relative",
    marginRight: theme.spacing(1),
    fontFamily: "Cutive Mono, monospace",
    color: "white !important",
    fontSize: "14px",
    borderRadius: "8px",
    border: `1.4px solid ${borderColor}`,
    padding: `5px ${theme.spacing(1)}px`,
    marginBottom: "-15px !important",
    marginTop: "10px !important",
    minWidth: "max-content",

    "&:hover": {
      background: "rgba(169,198,217,0.36457423) "
    }
  }
});