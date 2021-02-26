import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { register } from "./Styles/RegistrationStyles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import RegistrationForm from "./Forms/RegistrationForm";
import logo from "../../../resources/images/logo.jpg";
import { Grid } from "@material-ui/core";
import axios from "axios";

require('dotenv').config()
const authService = require('../../../services/auth');

class Registration extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    hidePassword: true,
    error: null,
    errorOpen: false,
    showSignUpChoices: false,
    signUpChoices: {customer: false, company: false, admin: false},
    firstname: "",
    lastname: "",
    birthdate: "",
    name: "",
    siret: "",
    documents: "",
    street: "",
    postalCode: "",
    city: "",
    region: "",
    country: ""
  };

  async componentDidMount() {
    const response = await axios({
      method: 'GET',
      url: '/api/email'
    });

    /*let email = response.data.email;
    if (email === ""){
      email = cookies.get('email');
    }*/

    this.setState({
      email: response.data.email ?? ""
    });
  };

  errorClose = e => {
    this.setState({
      errorOpen: false
    });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  passwordMatch = () => this.state.password === this.state.passwordConfirm;

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "" || this.state.password === "" || this.state.passwordConfirm === "") {
      return false;
    }
    return true;
  };

  isEmailValid = () => {
    if (/^([a-z0-9.]+@[a-z0-9]+\.[a-z0-9]+)$/.test(this.state.email)) {
      return true;
    }
    return false;
  };

  submitRegistration = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/auth/check', {
      email: this.state.email
    });

    if (response.data.userExists === true) {
      this.setState({
        errorOpen: true,
        error: "Email address not available"
      });
    } else {
      if (!this.isEmailValid()) {
        this.setState({
          errorOpen: true,
          error: "Invalid email"
        });
      }else{
        if (!this.passwordMatch()) {
          this.setState({
            errorOpen: true,
            error: "Passwords don't match"
          });
        }else{
          const newUserCredentials = {
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
            showSignUpChoices: true
          };
          this.setState(newUserCredentials);

          const canMakeRegisterChoice = await authService.canMakeRegisterChoice();

          this.props.app.setState({
            canMakeRegisterChoice: canMakeRegisterChoice,
            canConfirmRegister: false,
          })

          this.props.history.push('/register/choices', {
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
          });
        }
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
        <Grid item>
          <div className={classes.main}>
            <CssBaseline />

            <Paper className={`${classes.paper}`}>
              {<Avatar className={classes.avatar}>
                <img className={classes.logo} src={logo} alt="Logo" />
              </Avatar>}
              <form
                  className={classes.form}
                  onSubmit={() => this.submitRegistration}
              >
                <RegistrationForm registration={this}/>
              </form>
              {this.state.error ? (
                  <Snackbar
                      variant="error"
                      key={this.state.error}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                      }}
                      open={this.state.errorOpen}
                      onClose={this.errorClose}
                      autoHideDuration={3000}
                  >
                    <SnackbarContent
                        className={classes.error}
                        message={
                          <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                            <span> {this.state.error} </span>
                          </div>
                        }
                        action={[
                          <IconButton
                              key="close"
                              aria-label="close"
                              onClick={this.errorClose}
                          >
                            <CloseIcon color="error" />
                          </IconButton>
                        ]}
                    />
                  </Snackbar>
              ) : null}
            </Paper>
          </div>
        </Grid>
    );
  }
}

export default withRouter(withStyles(register)(Registration));