import React, { Fragment } from 'react';
import { withAuthorization } from '../session';
import { Header } from 'semantic-ui-react';
import { language } from '../../helpers';

const Dashboard = (props) => {

  return (
    <Fragment>
      <Header as='h1' textAlign='center'>
        {language.randomGreeting()}
      </Header>
    </Fragment>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
