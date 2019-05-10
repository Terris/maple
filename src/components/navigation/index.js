import React from 'react';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { auth } from '../../firebase';
import { routes } from '../../constants';

const Navigation = (props) => (
  <Menu inverted fixed="top">
    <Container>
      <Menu.Item><strong>Maple</strong></Menu.Item>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNonAuth />
          )
        }
      </AuthUserContext.Consumer>
    </Container>
  </Menu>
);

const NavigationAuth = withRouter(
  ({ authUser, history }) => (
    <React.Fragment>
      <Menu.Item as="a" onClick={() => history.push(routes.PROJECTS)}>Projects</Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item simple icon='user'>
          <Dropdown.Menu>
            <Dropdown.Item as="a" onClick={() => history.push(routes.ACCOUNT)}>Account</Dropdown.Item>
            <Dropdown.Item onClick={auth.signOut}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </React.Fragment>
  )
);

const NavigationNonAuth = () => (
  <Menu.Menu position='right'>
    <Menu.Item><Link to={routes.SIGN_UP}>Sign Up</Link></Menu.Item>
    <Menu.Item><Link to={routes.SIGN_IN}>Sign In</Link></Menu.Item>
  </Menu.Menu>
);

export default Navigation;
