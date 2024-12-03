import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import Papa from 'papaparse';
import XLSX from 'xlsx';

const FileUploadDialog = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  // Handle file change (CSV, JSON, or Excel files)
  const handleFileChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop();

      // Parse the file based on its type
      if (fileExtension === 'csv') {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result;
          parseCSV(content);  // Parse CSV file content
        };
        reader.readAsText(file);
      } else if (fileExtension === 'json') {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result;
          parseJSON(content);  // Parse JSON file content
        };
        reader.readAsText(file);
      } else if (fileExtension === 'xlsx') {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result;
          parseExcel(content);  // Parse Excel file content
        };
        reader.readAsArrayBuffer(file); // Read as ArrayBuffer for Excel
      } else {
        alert('Por favor, sube un archivo CSV, JSON o Excel (.xlsx)');
        setLoading(false);
      }
    }
  };

  // Handle the file upload for the projects
  const handleFileUpload = async (projects) => {
    try {
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
      onClose();  // Close the dialog once upload is successful
    } catch (error) {
      console.error("Error al agregar los proyectos:", error);
      alert('Ocurrió un error al agregar los proyectos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);  // Stop loading after upload process
    }
  };

  // Parse CSV file content
  const parseCSV = (content) => {
    Papa.parse(content, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const projects = result.data.map(row => ({
          name: row.name,
          technologies: row.technologies,
          description: row.description,
          supervisor: row.supervisor,
        }));
        handleFileUpload(projects);  // Upload projects to backend
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setLoading(false);
      }
    });
  };

  // Parse JSON file content
  const parseJSON = (content) => {
    try {
      const data = JSON.parse(content);
      const projects = data.map(item => ({
        name: item.name,
        technologies: item.technologies,
        description: item.description,
        supervisor: item.supervisor,
      }));
      handleFileUpload(projects);  // Upload projects to backend
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setLoading(false);
    }
  };

  // Parse Excel file content
  const parseExcel = (content) => {
    const workbook = XLSX.read(content, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const projects = data.slice(1).map(row => ({
      name: row[0],
      technologies: row[1],
      description: row[2],
      supervisor: row[3],
    }));

    handleFileUpload(projects);  // Upload projects to backend
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Subir Archivo con Proyectos</DialogTitle>
      <DialogContent>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <span style={{ marginLeft: '10px' }}>Subiendo proyectos...</span>
          </div>
        ) : (
          <input type="file" onChange={handleFileChange} accept=".csv, .json, .xlsx" />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;
