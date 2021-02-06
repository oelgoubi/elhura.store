import React, { Component } from "react";
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {register} from "../Styles/RegistrationStyles";

class RegistrationConfirmation extends Component {
    render() {
        let { classes } = this.props;
        return (
        <React.Fragment>
            <FormControl required={true} fullWidth margin="normal">
                <InputLabel htmlFor="otppassword" className={classes.labels}>
                    Enter OTP password :
                </InputLabel>
                <Input
                    name="otppassword"
                    type="text"
                    autoComplete="optPassword"
                    className={classes.inputs}
                    disableUnderline={true}
                    onChange={this.props.registration.handleChange("otppassword")}
                />
            </FormControl>

            <Button
                disabled={!this.props.registration.isValid()}
                disableRipple
                fullWidth
                variant="outlined"
                className={`${classes.buttonJoin} ${classes.button}`}
                type="submit"
                onClick={(e) => this.props.registration.completeRegistration(e)}
            >
                Confirm
            </Button>
        </React.Fragment>
        );
    }
}

export default withStyles(register)(RegistrationConfirmation);