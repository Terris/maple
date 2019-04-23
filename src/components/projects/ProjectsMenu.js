import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { routes } from '../../constants';

const ProjectsMenu = ({ projects, history }) => {
  return (
    <Menu vertical fluid>
      {projects && Object.keys(projects).map(key => {
        return <Menu.Item key={key} as="a" onClick={() => history.push(`${routes.PROJECTS}/${key}`)}>{projects[key].name}</Menu.Item>
      })}
    </Menu>
  )
}

export default withRouter(ProjectsMenu);
