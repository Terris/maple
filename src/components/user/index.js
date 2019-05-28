import React from 'react';
import { withAuthorization } from '../session';

const Account = (props) => {
  return (
    <h1>Account</h1>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);
