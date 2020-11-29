import React, { Component } from "react";
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {register} from "./RegistrationStyles";
import RegistrationStreetForm from "./RegistrationStreetForm";

class RegistrationFormCustomer extends Component {
    render() {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="firstname" className={classes.labels}>
                        First name
                    </InputLabel>
                    <Input
                        name="firstname"
                        type="text"
                        autoComplete="firstName"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("firstname")}
                    />
                </FormControl>

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="lastname" className={classes.labels}>
                        Last name
                    </InputLabel>
                    <Input
                        name="lastname"
                        type="text"
                        autoComplete="lastName"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("lastname")}
                    />
                </FormControl>

                <RegistrationStreetForm registration={this.props.registration} />

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="birthdate" className={`${classes.labels} ${classes.labelBirthDate}`}>
                        Birth date
                    </InputLabel>
                    <Input
                        name="birthdate"
                        type="date"
                        autoComplete="birthDate"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("birthdate")}
                    />
                </FormControl>

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="birthplace" className={classes.labels}>
                        Birth place
                    </InputLabel>
                    <Input
                        name="birthplace"
                        type="text"
                        autoComplete="birthplace"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("birthplace")}
                    />
                </FormControl>
                <Button
                    disabled={!this.props.registration.isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={`${classes.buttonJoin} ${classes.button}`}
                    type="submit"
                    onClick={this.props.registration.completeRegistration}
                >
                    Join
                </Button>
            </React.Fragment>
        );
    }
}

export default withStyles(register)(RegistrationFormCustomer);