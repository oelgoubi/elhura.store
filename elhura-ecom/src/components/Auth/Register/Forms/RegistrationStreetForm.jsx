import React, { Component } from "react";
import {FormControl, Input, InputLabel} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {register} from "../Styles/RegistrationStyles";

class RegistrationStreetForm extends Component {
    render() {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="street" className={classes.labels}>
                        Street
                    </InputLabel>
                    <Input
                        name="street"
                        type="text"
                        autoComplete="street"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("street")}
                    />
                </FormControl>

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="postalCode" className={classes.labels}>
                        Postal code
                    </InputLabel>
                    <Input
                        name="postalcode"
                        type="text"
                        autoComplete="postalCode"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("postalCode")}
                    />
                </FormControl>

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="city" className={`${classes.labels}`}>
                        City
                    </InputLabel>
                    <Input
                        name="city"
                        type="text"
                        autoComplete="city"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("city")}
                    />
                </FormControl>

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="region" className={classes.labels}>
                        Region
                    </InputLabel>
                    <Input
                        name="region"
                        type="text"
                        autoComplete="region"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("region")}
                    />
                </FormControl>

                <FormControl required={true} fullWidth margin="normal">
                    <InputLabel htmlFor="country" className={classes.labels}>
                        Country
                    </InputLabel>
                    <Input
                        name="country"
                        type="text"
                        autoComplete="country"
                        className={classes.inputs}
                        disableUnderline={true}
                        onChange={this.props.registration.handleChange("country")}
                    />
                </FormControl>
            </React.Fragment>
        )
    }
}

export default withStyles(register)(RegistrationStreetForm);