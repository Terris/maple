import React from 'react';
import { Card } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';

const ProjectsCards = ({ projects }) => {
  return (
    <Card.Group itemsPerRow={3}>
      {!!projects.length && projects.map(project => {
        return  (
          <ProjectCard key={project.id} project={project} />
        )
      })}
    </Card.Group>
  )
}

export default ProjectsCards;
