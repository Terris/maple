import React from 'react';
import { Item } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';

const ProjectsCards = ({ projects }) => {
  return (
    <Item.Group divided link>
      {!!projects.length && projects.map(project => {
        return  (
          <ProjectCard key={project.id} project={project} />
        )
      })}
    </Item.Group>
  )
}

export default ProjectsCards;
