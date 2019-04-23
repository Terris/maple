import React from 'react';
import { withAuthorization } from '../session';

const Dashboard = (props) => {
  return (
    <h1>Dashoard</h1>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
