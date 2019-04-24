import React, { Fragment } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { times } from '../../helpers';
import { db } from '../../firebase';

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

const Timer = ({ timer }) => {
  return (
    <Table.Row>
      <Table.Cell>{timer.description}</Table.Cell>
      <Table.Cell>{times.durationPlus(timer.start_time, timer.end_time, timer.total_time).toFixed(2)}hrs</Table.Cell>
      <Table.Cell><StartStopButton timer={timer} /></Table.Cell>
      <Table.Cell>edit button</Table.Cell>
    </Table.Row>
  )
}

export default Timer;
