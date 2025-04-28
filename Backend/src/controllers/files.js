import * as filesModel from '../models/files.js';

export async function getAllFiles(req, res) {
  try {
    const files = await filesModel.getAllFiles();

    return res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getFilesById(req, res) {
  try {
    const { id } = req.params;
    const files = await filesModel.getFilesById(id);

    if (files.length === 0) {
      return res.status(404).json({ message: 'No se encontraron archivos para este usuario' });
    }

    return res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files by user ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createFile(req, res) {
  try {
    const { user_id, fileName, fileType, file } = req.body;
    const path = 'https://example.com/file.pdf'; // fake path
    const [result] = await filesModel.createFile({ user_id, name: fileName, fileType, path });

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Falló la creación del archivo' });
    }

    return res.status(201).json({...result, message: 'Archivo creado satisfactoriamente' });
  } catch (error) {
    console.error('Error creating file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateFile(req, res) {
  try {
    const { id } = req.params;
    const { fileName } = req.body;

    const [result] = await filesModel.updateFile({id, name: fileName})
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Falló la actualización del archivo' });
    }

    return res.status(200).json({ message: 'Archivo actualizado satisfactoriamente' });
  } catch (error) {
    console.error('Error updating file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteFile(req, res) {
  try {
    const { id } = req.params;
    const [result] = await filesModel.deleteFile(id);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Falló la eliminación del archivo' });
    }
    
    return res.status(200).json({ message: 'Archivo eliminado satisfactoriamente' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}