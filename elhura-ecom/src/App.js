import {Component, React} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Error404 from './pages/Error404';
import Register from './pages/Register';
import RegisterConfirm from './pages/RegisterConfirm';
import RegisterChoices from './pages/RegisterChoices';
import LogIn from './pages/LogIn';
const authService = require('./services/auth');

class App extends Component {
  constructor() {
    super();
    this.state = {
      canMakeRegisterChoice: null,
      canConfirmRegister: null
    };
    this.passToNextSteps = this.passToNextSteps.bind(this);
  }

  componentDidMount() {
    this.passToNextSteps();
  }

  async passToNextSteps() {
    const canConfirmRegister = await authService.canConfirmRegister();
    const canMakeRegisterChoice = await authService.canMakeRegisterChoice();

    this.setState({
      canMakeRegisterChoice: canMakeRegisterChoice,
      canConfirmRegister: canConfirmRegister,
    })
  }

  render() {
    const { canMakeRegisterChoice, canConfirmRegister } = this.state;
    return (<>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/reports' component={Reports} />
          <Route exact path='/products' component={Products} />
          <Route exact path="/register">
            <Register app={this}/>
          </Route>
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/register/choices">
            {canMakeRegisterChoice !== null ? (canMakeRegisterChoice === true ? <RegisterChoices app={this}/> : <Redirect to="/register"/>) : null}
          </Route>
          <Route exact path="/register/confirm" >
            {canConfirmRegister !== null ? (canConfirmRegister === true ? <RegisterConfirm app={this}/> : <Redirect to="/register"/>) : null}
          </Route>
          <Route exact path="*" component={Error404} />
        </Switch>
      </Router>
    </>)
  }
}

export default App;

