import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InstFileList from './InstFileList';

function InstCourseAccordion() {
  const { _id } = useParams();
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderEditModal, setFolderEditModal] = useState(false);
  const [folderDeleteModal, setFolderDeleteModal] = useState(false);
  const [errors, setErrors] = useState("");
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchFolders(_id);
  }, [_id]);


  const fetchFolders = async (courseId) => {
    try {
      const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/${courseId}/folders`);
      if (response.status === 200) {
        setFolders(response.data);
      } else {
        console.error('Failed to fetch folders:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleUpload = async (folderId, files) => {
    try {
      const formData = new FormData();
      formData.append('folderId', folderId);
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      const response = await axios.post(`https://lms-api-cyan.vercel.app/courses/folders/${folderId}/upload`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200){
        alert('File uploaded successfully.')
        const updatedFolders = folders.map((folder) =>{
          if (folder._id === folderId){
            return {
              ...folder,
              files: response.data.files
            };
          }
          return folder;
        });
        setFolders(updatedFolders);
      } else {
        console.error('Failed to upload files:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading files:',  error);
    }
  };
  const handleEditFolder = async () => {
    try {
      const response = await axios.put(`https://lms-api-cyan.vercel.app/courses/folders/${selectedFolder._id}`, {
        folderName: selectedFolder.name 
      });
      
      if (response.status === 200) {
        setFolderEditModal(false);
        setSelectedFolder(null);
        fetchFolders(_id);
        setErrors("");
      } else {
        console.error('Failed to update folder:', response.statusText);
      }
    } catch (error) {
      setErrors('Error updating folder.');
      console.error('Error updating folder:', error);
    }
    
  };

  const handleDeleteFolder = async () => {
    try {
      const response = await axios.delete(`https://lms-api-cyan.vercel.app/courses/folders/${selectedFolder._id}`);
      
      if (response.status === 200) {
        setFolderDeleteModal(false);
        setSelectedFolder(null);
        fetchFolders(_id);
        setErrors("");
      } else {
        console.error('Failed to delete folder:', response.statusText);
      }
    } catch (error) {
      setErrors('Error deleting folder:');
      console.error('Error deleting folder:', error);
    }
    
  };
const handleOpenfolderEditModal = (folder) =>{
    setFolderEditModal(true);
    setSelectedFolder(folder);
}
const handleClosefolderEditModal = () =>{
    setFolderEditModal(false);
    setSelectedFolder(null);
    setErrors("");
}
const handleOpenfolderDeleteModal = (folder) =>{
    setFolderDeleteModal(true);
    setSelectedFolder(folder);
}
const handleClosefolderDeleteModal = () =>{
    setFolderDeleteModal(false);
    setSelectedFolder(null);
    setErrors("");

}

  return (
    <>
    <Accordion defaultActiveKey="0" flush>
      {folders &&
        folders.map((folder, index) => (
          <Card key={folder._id}>
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>{folder.name} </Accordion.Header>
              <Accordion.Body>
              <div className="d-flex justify-content-end">
                    <button className="btn btn-edit mr-2" onClick={() => handleOpenfolderEditModal(folder)}>
                        <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className="btn btn-delete" onClick={() => handleOpenfolderDeleteModal(folder)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
                <hr />
                <InstFileList folderId={folder._id} />
                <hr />
                
                <Form onSubmit={(event) => {
                      event.preventDefault(); 
                      const files = event.target.elements[`formFile-${folder._id}`].files;
                      if (files.length > 0) {
                        handleUpload(folder._id, files);
                      } else {
                        console.error("No files selected.");
                      }
                    }}>
                  <Form.Group controlId={`formFile-${folder._id}`} className="mb-3">
                    <Form.Label>Add Files or Contents</Form.Label>
                    <Form.Control type="file" multiple />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Upload
                  </Button>

                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
    </Accordion>

<div className={`modal fade ${folderEditModal ? 'show' : ''}`} id="editFolderModal" tabIndex="-1" aria-labelledby="editFolderModalLabel" aria-hidden="true" style={{ display: folderEditModal ? 'block' : 'none' }}>
<div className="modal-dialog modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="editFoldarModalLabel">Edit Folder</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosefolderEditModal}></button>
    </div>
    
    <div className="modal-body">
        <form>
            <div className="mb-3">
                <label htmlFor="folderId" className="col-form-label">Folder ID:</label>
                <input type="text" className="form-control" id="folderId" name="folderId" value={selectedFolder?._id} required disabled/>
            </div>
            <div className="mb-3">
                <label htmlFor="folderName" className="col-form-label">New Folder Name:</label>
                <input type="text" className="form-control" id="folderName" name="folderName" value={selectedFolder?.folderName} onChange={(e) => setSelectedFolder({ ...selectedFolder, name: e.target.value })} required />
            </div>
            
            <div className="mb-3">
                {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}                 </div>
        </form>
    </div>
    
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleClosefolderEditModal}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handleEditFolder} style={{backgroundColor:"#7E30E1"}}>Edit Folder</button>
    </div>
    
</div>

</div>

</div>
<div className={`modal fade ${folderDeleteModal ? 'show' : ''}`} id="deleteFolderModal" tabIndex="-1" aria-labelledby="editFolderModalLabel" aria-hidden="true" style={{ display: folderDeleteModal ? 'block' : 'none' }}>
<div className="modal-dialog modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
        
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClosefolderDeleteModal}></button>
    </div>
    
    <div className="modal-body">
        <h1 className="modal-title fs-5" id="deleteFolderModalLabel">Delete Folder</h1>
    </div>
    <div className="mb-3">
      {errors && (<div className="alert alert-danger mt-2">{errors}</div>)}
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleClosefolderDeleteModal}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handleDeleteFolder} style={{backgroundColor:"#7E30E1"}}>Confirm</button>
    </div>
    
</div>

</div>

</div>
</>
)}

export default InstCourseAccordion;
