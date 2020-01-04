import React from 'react';

import ProjectItem from './ProjectItem';
import Grid from '@material-ui/core/Grid';

const ProjectList = ({
  authUser,
  projects,
  onEditProject,
  onRemoveProject,
}) => (
  <Grid container spacing={4}>
    {projects.map(project => (
      <ProjectItem
        authUser={authUser}
        key={project.uid}
        project={project}
        onEditProject={onEditProject}
        onRemoveProject={onRemoveProject}
      />
    ))}
  </Grid>
);

export default ProjectList;