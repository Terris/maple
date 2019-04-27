import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import { routes } from '../../constants';

const ProjectsCards = ({ projects }) => {
  return (
    <Card.Group>
      {!!projects && Object.keys(projects).map(key => {
        return  (
          <Card key={key} href={`${routes.PROJECTS}/${key}`}>
            <Card.Content
              header={projects[key].name}
              description={projects[key].description}
            />
            <Card.Content extra>
              <Icon name='tasks' /> # Tasks
            </Card.Content>
            <Card.Content extra>
              <Icon name='sticky note' /> # Notes
            </Card.Content>
            <Card.Content extra>
              <Icon name='clock' /> # Timers
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}

export default ProjectsCards;
