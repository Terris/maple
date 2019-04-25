import React, { Fragment } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { times } from '../../helpers';
import { db } from '../../firebase';
import EditTimerModal from './EditTimerModal';
const StartStopButton = ({ timer }) => {

  const handleStart = () => {
    let startTime = times.now()
    db.timer(timer.id).set({
      ...timer,
      start_time: startTime,
    })
  }

  const handleStop = () => {
    let totalTime = times.durationPlus(timer.start_time, times.now(), timer.total_time);
    db.timer(timer.id).set({
      ...timer,
      total_time: totalTime,
      start_time: null,
    })
  }

  return (
    <Fragment>
      {timer.start_time && !timer.end_time
        ? <Button content="stop" icon="stopwatch" color="red" onClick={() => handleStop()} />
        : <Button content="start" icon="stopwatch" color="green" onClick={() => handleStart()} />
      }
    </Fragment>
  )
}

const Timer = ({ timer, withHeader }) => {
  return (
    <Fragment>
      {!!withHeader &&
        <Table.Row>
          <Table.Cell colSpan="5" active>{times.niceDate(timer.date)}</Table.Cell>
        </Table.Row>
      }
      <Table.Row>
        <Table.Cell width={8}>{timer.description}</Table.Cell>
        <Table.Cell>{parseFloat(timer.total_time).toFixed(2)} hrs</Table.Cell>
        <Table.Cell>{timer.billable ? <Icon name="dollar sign" /> : ""}</Table.Cell>
        <Table.Cell><StartStopButton timer={timer} /></Table.Cell>
        <Table.Cell><EditTimerModal timer={timer} /></Table.Cell>
      </Table.Row>
    </Fragment>
  )
}

export default Timer;
