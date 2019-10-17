import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';

const ProjectsMenu = ({ projects, history, location }) => {
  const activeItem = location.pathname.split('/')[2];
  return (
    <Menu pointing secondary vertical fluid>
      <Menu.Item header as="a" active={!activeItem}
        onClick={() => history.push(routes.PROJECTS)}>Projects</Menu.Item>
      {!!projects.length && projects.map(project => {
        return <Menu.Item key={project.id} as="a" active={activeItem === project.id} onClick={() => history.push(`${routes.PROJECTS}/${project.id}`)}>{project.name}</Menu.Item>
      })}
    </Menu>
  )
}

export default withRouter(ProjectsMenu);
