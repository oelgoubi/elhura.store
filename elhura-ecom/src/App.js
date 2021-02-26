import {Component, React} from 'react';
import './App.css';
import Navbar, {history} from './components/Navbar/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Error404 from './pages/Error404';
import Register from './pages/Register';
import RegisterConfirm from './pages/RegisterConfirm';
import RegisterChoices from './pages/RegisterChoices';
import LogIn from './pages/LogIn';
import FileUpload from "./components/Files/FileUpload";
import AddArticle from "./components/ArticlesManegement/AddArticle";
import CheckoutPage from './pages/CheckoutPage'
const authService = require('./services/auth');
const userService = require('./services/user');
const articleService = require('./services/article');

class App extends Component {
  constructor() {
    super();
    this.state = {
      canMakeRegisterChoice: null,
      canConfirmRegister: null,
      isAuthenticated: null,
      userRole: -1
    };
    this.passToNextSteps = this.passToNextSteps.bind(this);
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    this.fetchUserRole = this.fetchUserRole.bind(this);
  }

  componentDidMount() {
    this.passToNextSteps();
    this.isUserAuthenticated();
    this.fetchUserRole();
    this.fetchArticles();
  }

  async passToNextSteps() {
    const canConfirmRegister = await authService.canConfirmRegister();
    const canMakeRegisterChoice = await authService.canMakeRegisterChoice();

    this.setState({
      canMakeRegisterChoice: canMakeRegisterChoice,
      canConfirmRegister: canConfirmRegister,
    })
  }

  async isUserAuthenticated() {
    const isUserAuthenticated = await authService.isUserAuthenticated();

    this.setState({
      isAuthenticated: isUserAuthenticated
    })
  }

  async fetchUserRole() {
    const userRole = await userService.fetchUserRole();

    this.setState({
      userRole: userRole
    })
  }

  async fetchArticles() {
    const articles = await articleService.fetchArticles();
  }

  render() {
    const { canMakeRegisterChoice, canConfirmRegister, isAuthenticated, userRole } = this.state;
    console.log("IS AUTHENTICATED HERE : "+isAuthenticated+ " "+userRole);
    return (<>
      <Router>
        <Navbar isAuthenticated={this.state.isAuthenticated} userRole={this.state.userRole}/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/reports'>
            { (isAuthenticated !== null && userRole !== -1) ? ((isAuthenticated === true && userRole === 2) ?  <Reports/> : <Redirect to="/"/>) : null }
          </Route>
          <Route exact path='/products'>
            { (isAuthenticated !== null && userRole !== -1) ? ((isAuthenticated === true && userRole === 2) ?  <Products/> : <Redirect to="/"/>) : null }
          </Route>
          <Route exact path='/articles/add'>
            { (isAuthenticated !== null && userRole !== -1) ? ((isAuthenticated === true && userRole === 2) ?  <AddArticle/> : <Redirect to="/"/>) : null }
          </Route>
          <Route exact path="/register">
            { (isAuthenticated !== null) ? ((isAuthenticated === false || isAuthenticated === undefined) ?  <Register app={this}/> : <Redirect to="/"/>) : <Register app={this}/> }
          </Route>
          <Route exact path="/login">
            { (isAuthenticated !== null) ? ((isAuthenticated === false || isAuthenticated === undefined) ?  <LogIn/> : <Redirect to="/"/>) : <LogIn/> }
          </Route>
          <Route exact path="/register/choices">
            {canMakeRegisterChoice !== null ? (canMakeRegisterChoice === true ? <RegisterChoices app={this}/> : <Redirect to="/register"/>) : null}
          </Route>
          <Route exact path="/register/confirm" >
            {canConfirmRegister !== null ? (canConfirmRegister === true ? <RegisterConfirm app={this}/> : <Redirect to="/register"/>) : null}
          </Route>
          <Route exact path="/files/upload" component={FileUpload} />
          <Route exact path='/checkout'>
            { (isAuthenticated !== null && userRole !== -1) ? ((isAuthenticated === true && userRole === 2) ?  <CheckoutPage/> : <Redirect to="/"/>) : null }
          </Route>
          <Route exact path="*" component={Error404} />
        </Switch>
      </Router>
    </>)
  }
}

export default App;

