import React, { Component } from "react";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {register} from "../Styles/RegistrationStyles";

class ButtonsAs extends Component {

    render() {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <Button
                    disabled={!this.props.registration.isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={`${classes.buttonJoin} ${classes.button}`}
                    type="submit"
                    onClick={(e) => this.props.registration.loadDetailsRegistrationForm({
                        customer: true,
                        company: false,
                        admin: false
                    }, e)}
                >
                    As customer
                </Button>
                <Button
                    disabled={!this.props.registration.isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={`${classes.buttonAs} ${classes.button}`}
                    type="submit"
                    onClick={() => {
                        this.props.registration.loadDetailsRegistrationForm({
                            customer: false,
                            company: true,
                            admin: false
                        })
                    }}
                >
                    As seller company
                </Button>
            </React.Fragment>
        );
    }
}

export default withStyles(register)(ButtonsAs);