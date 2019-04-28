import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';

const ProjectsMenu = ({ projects, history }) => {
  return (
    <Menu vertical fluid>
      <Menu.Item header as="a" onClick={() => history.push(routes.PROJECTS)}>Projects</Menu.Item>
      {!!projects.length && projects.map(project => {
        return <Menu.Item key={project.id} as="a" onClick={() => history.push(`${routes.PROJECTS}/${project.id}`)}>{project.name}</Menu.Item>
      })}
    </Menu>
  )
}

export default withRouter(ProjectsMenu);
