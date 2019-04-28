import React, { Fragment } from 'react';
import { withAuthorization } from '../session';
import ChartistGraph from 'react-chartist';
import { Header } from 'semantic-ui-react';
import { language } from '../../helpers';

const Dashboard = (props) => {

  const type = 'Bar'

  const data = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [
      [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    ]
  };

  const options = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  return (
    <Fragment>
      <Header as='h1' textAlign='center'>
        {language.randomGreeting()}
      </Header>
      <ChartistGraph data={data} options={options} type={type} />
    </Fragment>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
