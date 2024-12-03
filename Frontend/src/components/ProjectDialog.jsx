import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ProjectDialog = ({ open, onClose, setAddFormType }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Proyecto</DialogTitle>
      <DialogContent>
        <Button fullWidth variant="outlined" color="primary" onClick={() => setAddFormType('single')}>
          Rellenar formulario para un proyecto
        </Button>
        <Button fullWidth variant="outlined" color="primary" onClick={() => setAddFormType('multiple')}>
          Subir archivo con varios proyectos
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
