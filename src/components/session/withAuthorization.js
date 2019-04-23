import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './context';
import { firebase } from '../../firebase';
import { routes } from '../../constants';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component {...this.props} authUser={authUser} /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(WithAuthorization);
}

export default withAuthorization;
