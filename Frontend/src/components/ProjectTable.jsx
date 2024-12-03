import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectTable = ({ projects }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedProject, setSelectedProject] = React.useState(null);

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    // Implement edit logic here
  };

  const handleDeleteProject = () => {
    // Implement delete logic here
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Tecnologías</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Supervisor</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.technologies}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.supervisor}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleMenuOpen(e, project)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Menu for editing or deleting a project */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditOpen}>
          <EditIcon fontSize="small" /> Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteProject}>
          <DeleteIcon fontSize="small" /> Eliminar
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProjectTable;
