import React, { useState, useEffect } from 'react';
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
} 
from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../components/NavBar';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addFormType, setAddFormType] = useState(null);
  const [filterTech, setFilterTech] = useState('');
  const [filterSupervisor, setFilterSupervisor] = useState('');

  const [newProject, setNewProject] = useState({
    name: '',
    technologies: '',
    description: '',
    supervisor: ''
  });

  // Cargar proyectos desde el backend al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFilterTechChange = (e) => {
    setFilterTech(e.target.value);
  };
  
  const handleFilterSupervisorChange = (e) => {
    setFilterSupervisor(e.target.value);
  };

  const filteredProjects = projects.filter((project) => {
    const tech = project.technologies ? project.technologies : '';  // Fallback to empty string if undefined or null
    const supervisor = project.supervisor ? project.supervisor : ''; // Same fallback for supervisor
  
    const matchesTechnology = filterTech
      ? tech.toLowerCase().includes(filterTech.toLowerCase())
      : true;
  
    const matchesSupervisor = filterSupervisor
      ? supervisor.toLowerCase().includes(filterSupervisor.toLowerCase())
      : true;
  
    return matchesTechnology && matchesSupervisor;
  });

  const handleAddClose = () => {
    handleCloseAllDialogs(); // Close all dialogs
  };


  const fetchProjects = async () => {
    try {
      const response = await fetch("https://devseccvr.alwaysdata.net/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
    }
  };

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
    handleCloseAllDialogs(); // Close all dialogs
  };

// Manejo de errores en la subida de varios proyectos
// Handle file upload and close dialogs
const handleFileUpload = async (projects) => {
  for (const project of projects) {
    const response = await fetch("https://devseccvr.alwaysdata.net/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Error al agregar el proyecto ${project.name}`);
    }
  }
  fetchProjects(); // Actualizar la lista de proyectos
  handleCloseAllDialogs(); // Close all dialogs
};


// Parse CSV file content
const parseCSV = (content) => {
  // Use PapaParse to parse the CSV data into an array of objects
  Papa.parse(content, {
    header: true,
    dynamicTyping: true,
    complete: (result) => {
      console.log('CSV Data:', result.data);
      // Convert CSV data to project format
      const projects = result.data.map(row => ({
        name: row.name,  // Assuming the CSV column headers match the data structure
        technologies: row.technologies,
        description: row.description,
        supervisor: row.supervisor
      }));
      handleFileUpload(projects);  // Upload to the backend
    },
    error: (error) => {
      console.error('Error parsing CSV:', error);
    }
  });
};

// Parse JSON file content
const parseJSON = (content) => {
  try {
    const data = JSON.parse(content);  // Parse the JSON content
    console.log('JSON Data:', data);

    // Convert JSON data to project format
    const projects = data.map(item => ({
      name: item.name,
      technologies: item.technologies,
      description: item.description,
      supervisor: item.supervisor
    }));
    
    handleFileUpload(projects);  // Upload to the backend
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
};

// Parse Excel file content
const parseExcel = (content) => {
  const workbook = XLSX.read(content, { type: 'array' });
  const sheetName = workbook.SheetNames[0];  // Read the first sheet
  const worksheet = workbook.Sheets[sheetName];

  // Convert the Excel sheet to an array of objects
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  console.log('Excel Data:', data);

  // Assuming that each row corresponds to a project
  const projects = data.slice(1).map(row => ({
    name: row[0],        // First column is project name
    technologies: row[1], // Second column is technologies
    description: row[2],  // Third column is description
    supervisor: row[3],   // Fourth column is supervisor
  }));

  handleFileUpload(projects);  // Upload to the backend
};


// Añadir spinner de carga mientras se procesan los archivos
const [loading, setLoading] = useState(false);

const handleFileChange = (e) => {
  setLoading(true);
  const file = e.target.files[0];

  if (file) {
    const fileExtension = file.name.split('.').pop();

    if (fileExtension === 'csv') {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        parseCSV(content);
      };
      reader.readAsText(file);
    } else if (fileExtension === 'json') {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        parseJSON(content);
      };
      reader.readAsText(file);
    } else if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        parseExcel(content);
      };
      reader.readAsArrayBuffer(file); // Leemos como ArrayBuffer para Excel
    } else {
      alert('Por favor, sube un archivo CSV, JSON o Excel (.xlsx)');
      setLoading(false);
    }
  }
};


  
  const handleEditSave = async () => {
    try {
      const response = await fetch(`https://devseccvr.alwaysdata.net/projects/${selectedProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProject),
      });
      if (response.ok) {
        fetchProjects(); // Actualizar la lista de proyectos
        handleEditClose();
      }
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const response = await fetch(`https://devseccvr.alwaysdata.net/projects/${selectedProject.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProjects(); // Actualizar la lista de proyectos
        handleMenuClose();
      }
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  // Funciones para manejar el diálogo de agregar nuevo proyecto
  const handleAddOpen = () => {
    setAddDialogOpen(true);
  };
// Common function to close all dialogs
const handleCloseAllDialogs = () => {
  setAddDialogOpen(false);
  setEditDialogOpen(false);
  setAddFormType(null); // Reset the form type if it was set
  setNewProject({
    name: '',
    technologies: '',
    description: '',
    supervisor: ''
  });
};

  const handleAddSave = async () => {
    try {
      const response = await fetch("https://devseccvr.alwaysdata.net/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      if (response.ok) {
        fetchProjects(); // Actualizar la lista de proyectos
        handleAddClose();
      }
    } catch (error) {
      console.error("Error al agregar el proyecto:", error);
    }
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
              onClick={handleAddOpen}
            >
              Agregar Proyecto
            </Button>
          </div>

          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <TextField
              label="Filtrar por Tecnología"
              variant="outlined"
              size="small"
              value={filterTech}
              onChange={handleFilterTechChange}
              style={{ flex: 1, marginRight: '10px' }}
            />
            <TextField
              label="Filtrar por Supervisor"
              variant="outlined"
              size="small"
              value={filterSupervisor}
              onChange={handleFilterSupervisorChange}
              style={{ flex: 1 }}
            />
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
                {filteredProjects.map((project) => (
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
            onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
          />
          <TextField
            label="Tecnologías"
            fullWidth
            margin="dense"
            value={selectedProject?.technologies || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, technologies: e.target.value })}
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={selectedProject?.description || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
          />
          <TextField
            label="Supervisor"
            fullWidth
            margin="dense"
            value={selectedProject?.supervisor || ''}
            onChange={(e) => setSelectedProject({ ...selectedProject, supervisor: e.target.value })}
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

{/* Diálogo para seleccionar tipo de entrada */}
<Dialog open={addDialogOpen} onClose={handleAddClose}>
  <DialogTitle>Agregar Proyecto</DialogTitle>
  <DialogContent>
  <Button
  fullWidth
  variant="outlined"
  color="primary"
  onClick={() => setAddFormType('single')}
>
  Rellenar formulario para un proyecto
</Button>
<Button
  fullWidth
  variant="outlined"
  color="primary"
  onClick={() => setAddFormType('multiple')}
>
  Subir archivo con varios proyectos
</Button>

  </DialogContent>
  <DialogActions>
    <Button onClick={handleAddClose} color="primary">
      Cancelar
    </Button>
  </DialogActions>
</Dialog>

{/* Si se selecciona un solo proyecto, mostrar el formulario */}
{addFormType === 'single' && (
  <Dialog open={true} onClose={handleAddClose}>
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
)}

{/* Si se selecciona subir archivo, mostrar campo para seleccionar archivo */}
{addFormType === 'multiple' && (
  <Dialog open={true} onClose={handleAddClose}>
    <DialogTitle>Subir Archivo con Proyectos</DialogTitle>
    <DialogContent>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".csv, .json, .xlsx" 
      />
    </DialogContent>
    <DialogActions>
  {/* Cancel button: Close dialog */}
  <Button onClick={handleAddClose} color="primary">
    Cancelar
  </Button>

  {/* Subir button: Process file upload and then close the dialog */}
  <Button onClick={() => { 
    handleFileUpload();  // Handle file upload
    handleAddClose();    // Close dialog after upload is completed
  }} color="primary">
    Subir
  </Button>
</DialogActions>

  </Dialog>
)}

    </div>
  );
};

export default Projects;
