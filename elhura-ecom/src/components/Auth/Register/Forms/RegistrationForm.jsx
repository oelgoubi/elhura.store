import React, { Component } from "react";
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import {withStyles} from "@material-ui/core/styles";
import {register} from "../Styles/RegistrationStyles";

class RegistrationForm extends Component {
    render() {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="email" className={classes.labels}>
                        e-mail
                    </InputLabel>
                    <Input
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("email")}
                        value={this.props.registration.state.email}
                    />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="password" className={classes.labels}>
                        password
                    </InputLabel>
                    <Input
                        name="password"
                        autoComplete="password"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("password")}
                        type={this.props.registration.state.hidePassword ? "password" : "input"}
                        endAdornment={
                            this.props.registration.state.hidePassword ? (
                                <InputAdornment position="end">
                                    <VisibilityOffTwoToneIcon
                                        fontSize="default"
                                        className={classes.passwordEye}
                                        onClick={this.props.registration.showPassword}
                                    />
                                </InputAdornment>
                            ) : (
                                <InputAdornment position="end">
                                    <VisibilityTwoToneIcon
                                        fontSize="default"
                                        className={classes.passwordEye}
                                        onClick={this.props.registration.showPassword}
                                    />
                                </InputAdornment>
                            )
                        }
                    />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                    <InputLabel htmlFor="passwordConfirm" className={classes.labels}>
                        confirm password
                    </InputLabel>
                    <Input
                        name="passwordConfirm"
                        autoComplete="passwordConfirm"
                        className={classes.inputs}
                        disableUnderline={true}
                        onClick={this.props.registration.state.showPassword}
                        onChange={this.props.registration.handleChange("passwordConfirm")}
                        type={this.props.registration.state.hidePassword ? "password" : "input"}
                        endAdornment={
                            this.props.registration.state.hidePassword ? (
                                <InputAdornment position="end">
                                    <VisibilityOffTwoToneIcon
                                        fontSize="default"
                                        className={classes.passwordEye}
                                        onClick={this.props.registration.showPassword}
                                    />
                                </InputAdornment>
                            ) : (
                                <InputAdornment position="end">
                                    <VisibilityTwoToneIcon
                                        fontSize="default"
                                        className={classes.passwordEye}
                                        onClick={this.props.registration.showPassword}
                                    />
                                </InputAdornment>
                            )
                        }
                    />
                </FormControl>
                <Button
                    disabled={!this.props.registration.isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={`${classes.buttonJoin} ${classes.button}`}
                    type="submit"
                    onClick={(e) => this.props.registration.submitRegistration(e)}
                >
                    Join Here
                </Button>
            </React.Fragment>
        );
    }
}

export default withStyles(register)(RegistrationForm);