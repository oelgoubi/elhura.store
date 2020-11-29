import React, { Component } from "react";
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import RegistrationStreetForm from "./RegistrationStreetForm";
import {withStyles} from "@material-ui/core/styles";
import {register} from "./RegistrationStyles";


class RegistrationFormCompany extends Component {
    render() {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="siret" className={classes.labels}>
                        Siret
                    </InputLabel>
                    <Input
                        name="siret"
                        type="text"
                        autoComplete="siret"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("siret")}
                    />
                </FormControl>

                <RegistrationStreetForm registration={this.props.registration} />

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="documents" className={classes.labels}>
                        Documents
                    </InputLabel>
                    <Input
                        name="documents"
                        type="text"
                        autoComplete="documents"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("documents")}
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

export default withStyles(register)(RegistrationFormCompany);