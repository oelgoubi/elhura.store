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
import ButtonsAs from "./Forms/ButtonsAs";
import logo from "../../../resources/images/logo.jpg";
import { Grid } from "@material-ui/core";
import axios from "axios";

require('dotenv').config()
const authService = require('../../../services/auth');

class RegistrationChoices extends Component {
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
    country: "",
    jwt: ""
  };

  componentDidMount() {
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

  isValid = () => {
    if (this.state.email === "" || this.state.password === "" || this.state.passwordConfirm === "") {
      return false;
    }
    return true;
  };

  register = async (choices) => {
    const response = await axios.post('/api/auth/register', {
      idUser: 3,
      idRole: choices.customer ? 1 : 2,
      password: this.state.password,
      email: this.state.email
    })

    return await response;
  }

  loadDetailsRegistrationForm = async (choices, e) => {
    e.preventDefault();
    // Here we request the back end to insert data (email, password) in db
    // We only update the state of the component if we have received a response from the back

    await this.register(choices);

    const canConfirmRegister = await authService.canConfirmRegister();

    this.props.app.setState({
      canMakeRegisterChoice: false,
      canConfirmRegister: canConfirmRegister,
    })

    this.props.history.push('/register/confirm', {
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    })
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
                <ButtonsAs registration={this}/>
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

export default withRouter(withStyles(register)(RegistrationChoices));