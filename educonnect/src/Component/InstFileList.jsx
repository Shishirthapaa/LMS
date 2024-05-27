import React, { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

function InstFileList({ folderId }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileEditModal, setFileEditModal] = useState(false);
  const [fileDeleteModal, setFileDeleteModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetchFiles(folderId);
  }, [folderId]);

  const fetchFiles = async (folderId) => {
    try {
      const response = await axios.get(`http://localhost:3001/courses/folders/${folderId}/files`);
      if (response.status === 200) {
        setFiles(response.data);
      } else {
        console.error('Failed to fetch files:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleRenameFile = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/courses/folders/files/${selectedFile._id}`, { newName: newFileName });
      if (response.status === 200) {
        const updatedFiles = files.map((file) => {
          if (file._id === selectedFile._id) {
            return { ...file, name: newFileName };
          }
          return file;
        });
        setFiles(updatedFiles);
        setFileEditModal(false);
        alert('File Renamed successfully.');
      } else {
        console.error('Failed to rename file:', response.statusText);
      }
    } catch (error) {
      console.error('Error renaming file:', error);
    }
  };

  const handleDeleteFile = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/courses/folders/files/${selectedFile._id}`);
      if (response.status === 200) {
        const updatedFiles = files.filter((file) => file._id !== selectedFile._id);
        setFiles(updatedFiles);
        setFileDeleteModal(false);
        alert('File deleted successfully.');
      } else {
        console.error('Failed to delete file:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

const handleOpenFileEditModal = (file) =>{
    setFileEditModal(true);
    setSelectedFile(file);
    setNewFileName(file.name);
}
const handleCloseFileEditModal = () =>{
    setFileEditModal(false);
    setSelectedFile(null);
    setNewFileName('');
    setErrors("");
}
const handleOpenFileDeleteModal = (file) =>{
    setFileDeleteModal(true);
    setSelectedFile(file);
}
const handleCloseFileDeleteModal = () =>{
    setFileDeleteModal(false);
    setSelectedFile(null);
    setErrors("");

}

const handleFileClick = (file) =>{
  const fileUrl = `http://localhost:3001/uploads/${file.path}`;
  window.open(fileUrl, '_blank');
}
  return (
    <>
    <div>
      <div>
      <ListGroup>
        {files.map((file, index) => (
          <ListGroup.Item key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span onClick={() => handleFileClick(file)} style={{cursor: 'pointer'}}>{file.name}</span>
              <div>
                <Button variant="primary" className="me-2" style={{fontSize:'14px'}} onClick={() => handleOpenFileEditModal(file)}>Rename</Button>
                <Button variant="danger" style={{fontSize:'14px'}} onClick={() => handleOpenFileDeleteModal(file)}>Delete</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    </div>

    <div className={`modal fade ${fileEditModal ? 'show' : ''}`} id="editFileModal" tabIndex="-1" aria-labelledby="editFileModalLabel" aria-hidden="true" style={{ display: fileEditModal ? 'block' : 'none' }}>
<div className="modal-dialog modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="editFileModalLabel">Rename file</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseFileEditModal}></button>
    </div>
    
    <div className="modal-body">
        <form>
            <div className="mb-3">
                <label htmlFor="fileId" className="col-form-label">File ID:</label>
                <input type="text" className="form-control" id="fileId" name="fileId" value={selectedFile ? selectedFile._id: ''} required disabled/>
            </div>
            <div className="mb-3">
                <label htmlFor="fileName" className="col-form-label">New file Name:</label>
                <input type="text" className="form-control" id="fileName" name="fileName" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} required />
            </div>
            
            <div className="mb-3">
                {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}        
            </div>
        </form>
    </div>
    
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleCloseFileEditModal}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handleRenameFile} style={{backgroundColor:"#7E30E1"}}>Rename File</button>
    </div>
    
</div>

</div>

</div>
<div className={`modal fade ${fileDeleteModal ? 'show' : ''}`} id="deleteFileModal" tabIndex="-1" aria-labelledby="editFileModalLabel" aria-hidden="true" style={{ display: fileDeleteModal ? 'block' : 'none' }}>
<div className="modal-dialog modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
        
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseFileDeleteModal}></button>
    </div>
    
    <div className="modal-body">
        <h1 className="modal-title fs-5" id="deleteFileModalLabel">Delete File</h1>
    </div>
    <div className="mb-3">
      {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleCloseFileDeleteModal}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handleDeleteFile} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
    </div>
    
</div>

</div>

</div>
</>
  );
}

export default InstFileList;
