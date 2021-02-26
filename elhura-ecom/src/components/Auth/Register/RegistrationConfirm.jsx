import React, { Component } from "react";
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
import logo from "../../../resources/images/logo.jpg";
import { Grid } from "@material-ui/core";
import RegistrationConfirmation from "./Forms/RegistrationConfirmation";
import {createBrowserHistory} from 'history';

require('dotenv').config();
const authService = require('../../../services/auth');

export const history = createBrowserHistory({forceRefresh:true})

class RegistrationConfirm extends Component {
  state = {
    otppassword: "",
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
    country: "",
    jwt: ""
  };

  async componentDidMount() {
    if(this.props.location.state !== undefined) {
      this.setState({
        email: this.props.location.state.email,
        password: this.props.location.state.password,
        passwordConfirm: this.props.location.state.passwordConfirm,
      });
    }
  }

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

  isValid = () => {
    if (this.state.email === "" || this.state.password === "" || this.state.passwordConfirm === "") {
      return false;
    }
    return true;
  };

  isOtpPasswordValid = () => {
    if (/^([0-9]{6})$/.test(this.state.otppassword)) {
      return true;
    }
    return false;
  }

  completeRegistration = async (e) => {
    e.preventDefault();
    if (this.isOtpPasswordValid()){
      this.setState({
        error: null
      });

      const response = await authService.validateRegister(this.state.otppassword)

      if (response !== true) {
        this.setState({
          errorOpen: true,
          error: "Incorrect OTP password"
        });
      } else{
        history.push('/');
      }
    }else{
      this.setState({
        errorOpen: true,
        error: "Incorrect code format"
      });
    }
  }

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
                <RegistrationConfirmation registration={this}/>
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

export default withRouter(withStyles(register)(RegistrationConfirm));