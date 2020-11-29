import RegistrationFormCustomer from "./RegistrationFormCustomer";
import {withStyles} from "@material-ui/core/styles";
import {register} from "./RegistrationStyles";
import { Component } from "react";

class RegistrationFormAdmin extends Component {
    render() {
        return (
          <RegistrationFormCustomer registration={this.props.registration} />
        );
    }
}

export default withStyles(register)(RegistrationFormAdmin);