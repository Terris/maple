import React, { Fragment } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { times } from '../../helpers';
import { db } from '../../firebase';

const StartStopButton = ({ timer }) => {

  const handleStart = () => {
    let startTime = timer.start_time;
    if (!timer.start_time) {
      startTime = times.now()
    }
    db.timer(timer.id).set({
      ...timer,
      start_time: startTime,
      end_time: null,
    })
  }

  const handleStop = () => {
    let endTime = times.now();
    db.timer(timer.id).set({
      ...timer,
      end_time: endTime,
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
      <Table.Cell>{times.duration(timer.start_time, timer.end_time)}hrs</Table.Cell>
      <Table.Cell><StartStopButton timer={timer} /></Table.Cell>
      <Table.Cell>edit button</Table.Cell>
    </Table.Row>
  )
}

export default Timer;
