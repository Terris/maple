import React, { Fragment, useState, useEffect } from 'react';
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
      updated_at: times.now(),
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

  const [duration, setDuration] = useState(timer.total_time);

  useEffect(() => {
    if (timer.start_time && !timer.end_time) {
      setDuration(times.durationPlus(timer.start_time, times.now(), timer.total_time));
      setTimeout(function(){
        setDuration(times.durationPlus(timer.start_time, times.now(), timer.total_time))
      }, 30000);
    } else {
      setDuration(timer.total_time)
    }
  });

  return (
    <Fragment>
      {!!withHeader &&
        <Table.Row>
          <Table.Cell colSpan="5" active>{times.niceDate(timer.date)}</Table.Cell>
        </Table.Row>
      }
      <Table.Row>
        <Table.Cell width={8}>{timer.description}</Table.Cell>
        <Table.Cell>{parseFloat(duration).toFixed(2)} hrs</Table.Cell>
        <Table.Cell>{timer.billable ? <Icon name="dollar sign" /> : ""}</Table.Cell>
        <Table.Cell><StartStopButton timer={timer} /></Table.Cell>
        <Table.Cell><EditTimerModal timer={timer} /></Table.Cell>
      </Table.Row>
    </Fragment>
  )
}

export default Timer;
