import React from 'react'
import {Tabs, Tab} from 'material-ui'
import {Snackbar} from 'material-ui'
import {Ajax} from '../../tools.jsx'
import {Router, Route, hashHistory} from 'react-router'
import dispatcher from './dispatcher.jsx'
import {Authorization} from './store.jsx'
import StoreConsts from './storeConsts.jsx'

//Material-ui
import Provider from 'material-ui/styles/MuiThemeProvider'

//css
require('../css/main.css')

// Components
import Auth from './auth.jsx'
import Main from './main.jsx'
import Admin from './admin.jsx'
import Screens from './screens.jsx'

//fix react-router warning message
Router.prototype.componentWillReceiveProps = function(nextProps) {
  let components = [];
  function grabComponents(element) {
    // This only works for JSX routes, adjust accordingly for plain JS config
    if (element.props && element.props.component) {
      components.push(element.props.component);
    }
    if (element.props && element.props.children) {
      React.Children.forEach(element.props.children, grabComponents);
    }
  }
  grabComponents(nextProps.routes || nextProps.children);
  components.forEach(React.createElement); // force patching
};

export default class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			error: Authorization.getError(),
			errorMess: Authorization.getErrorMess()
		}
		this.onChange = this.onChange.bind(this)
	}
	onChange () {
		this.setState({
			error: Authorization.getError(),
			errorMess: Authorization.getErrorMess()
		})
	}
	componentDidMount() {
		Authorization.addChangeListener(this.onChange)
		Authorization.addErrorListener(this.onChange)
		dispatcher.dispatch({actionType: StoreConsts.AUTORIZATION})
	}
	componentWillUnmount () {
		Authorization.removeChangeListener(this.onChange)
		Authorization.removeErrorListener(this.onChange)
	}
	render () {
		return (
			<Provider>
				<div>
					{
						<Router history={hashHistory}>
							<Route path="auth" component={Auth} />
							<Route path="main" component={Main} />
							<Route path="admin" component={Admin} />
							<Route path="screens" component={Screens} />
						</Router>
					}
					<Snackbar open={this.state.error} message={this.state.errorMess} style={{textAlign: 'center'}} autoHideDuration={4000} />
				</div>
			</Provider>
		)
	}
}