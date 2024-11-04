import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../components/NavBar';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Sistema de Gestión de Inventario',
      technologies: 'React, Node.js, MongoDB',
      description: 'Sistema para gestionar el inventario de una tienda en línea',
      supervisor: 'Ana Martínez'
    },
    {
      id: 2,
      name: 'Aplicación de Reservas de Restaurantes',
      technologies: 'Vue.js, Express, PostgreSQL',
      description: 'Plataforma para realizar reservas en restaurantes locales',
      supervisor: 'Carlos Gómez'
    },
    {
      id: 3,
      name: 'Plataforma de Aprendizaje en Línea',
      technologies: 'Angular, Django, MySQL',
      description: 'Sistema de gestión de cursos y contenido educativo en línea',
      supervisor: 'Laura Sánchez'
    }
  ]);

  const [anchorEl, setAnchorEl] = useState(null); // Estado para abrir/cerrar el menú de acciones
  const [selectedProject, setSelectedProject] = useState(null); // Proyecto seleccionado para edición
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Estado para abrir/cerrar el diálogo de edición
  const [addDialogOpen, setAddDialogOpen] = useState(false); // Estado para abrir/cerrar el diálogo de agregar
  const [newProject, setNewProject] = useState({
    name: '',
    technologies: '',
    description: '',
    supervisor: ''
  }); // Estado para el nuevo proyecto

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedProject(null);
  };

  const handleEditSave = () => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProject.id ? selectedProject : project
      )
    );
    handleEditClose();
  };

  const handleDeleteProject = () => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== selectedProject.id)
    );
    handleMenuClose();
  };

  // Funciones para manejar el diálogo de agregar nuevo proyecto
  const handleAddOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddClose = () => {
    setAddDialogOpen(false);
    setNewProject({
      name: '',
      technologies: '',
      description: '',
      supervisor: ''
    });
  };

  const handleAddSave = () => {
    const newId = projects.length ? projects[projects.length - 1].id + 1 : 1;
    const projectToAdd = { id: newId, ...newProject };
    setProjects([...projects, projectToAdd]);
    handleAddClose();
  };

  return (
    <div>
      <NavBar />

      <div className='container' style={{ width: '80%', margin: '0 auto' }}>
        <header style={{ marginBottom: '20px' }}>
          <h1>Administrador de proyectos</h1>
          <p>Gestiona y supervisa todos tus proyectos en un solo lugar</p>
        </header>

        <div className='Table' style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <TextField
              label="Buscar proyectos..."
              variant="outlined"
              size='small'
              margin="normal"
              style={{ flex: 1, marginRight: '10px' }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{
                height: '40px',
                color: '#fff',
                background: 'linear-gradient(90deg, #FF4E50, #F9D423)',
                borderRadius: '50px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
              }}
              onClick={handleAddOpen} // Abre el diálogo de agregar
            >
              Agregar Proyecto
            </Button>
          </div>

          <TableContainer component={Paper}>
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
          </TableContainer>
        </div>
      </div>

      {/* Menú desplegable de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditOpen}>
          <EditIcon fontSize="small" /> Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteProject}>
          <DeleteIcon fontSize="small" /> Eliminar
        </MenuItem>
      </Menu>

      {/* Diálogo para editar un proyecto */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Editar Proyecto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="dense"
            value={selectedProject?.name || ''}
            onChange={(e) =>
              setSelectedProject({ ...selectedProject, name: e.target.value })
            }
          />
          <TextField
            label="Tecnologías"
            fullWidth
            margin="dense"
            value={selectedProject?.technologies || ''}
            onChange={(e) =>
              setSelectedProject({ ...selectedProject, technologies: e.target.value })
            }
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={selectedProject?.description || ''}
            onChange={(e) =>
              setSelectedProject({ ...selectedProject, description: e.target.value })
            }
          />
          <TextField
            label="Supervisor"
            fullWidth
            margin="dense"
            value={selectedProject?.supervisor || ''}
            onChange={(e) =>
              setSelectedProject({ ...selectedProject, supervisor: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para agregar un nuevo proyecto */}
      <Dialog open={addDialogOpen} onClose={handleAddClose}>
        <DialogTitle>Agregar Proyecto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="dense"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <TextField
            label="Tecnologías"
            fullWidth
            margin="dense"
            value={newProject.technologies}
            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <TextField
            label="Supervisor"
            fullWidth
            margin="dense"
            value={newProject.supervisor}
            onChange={(e) => setNewProject({ ...newProject, supervisor: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Projects;
