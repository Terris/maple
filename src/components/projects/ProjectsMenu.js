import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';
import NewProjectModal from './NewProjectModal';

const ProjectsMenu = ({ projects, history, location, authUser }) => {
  const activeItem = location.pathname.split('/')[2];
  return (
    <Menu secondary vertical fluid>
      <Menu.Item header as="a" active={!activeItem} onClick={() => history.push(routes.PROJECTS)}>Projects</Menu.Item>
      {!!projects.length && projects.map(project => {
        return <Menu.Item key={project.id} as="a" active={activeItem === project.id} onClick={() => history.push(`${routes.PROJECTS}/${project.id}`)}>{project.name}</Menu.Item>
      })}
      <Menu.Item><NewProjectModal authUser={authUser} /></Menu.Item>
    </Menu>
  )
}

export default withRouter(ProjectsMenu);
