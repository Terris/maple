import React from 'react';
import { Segment } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';

const ProjectsCards = ({ projects }) => {
  return (
    <Segment.Group>
      {!!projects.length && projects.map(project => {
        return  (
          <ProjectCard key={project.id} project={project} />
        )
      })}
    </Segment.Group>
  )
}

export default ProjectsCards;
