import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

function StdFileList({ folderId }) {
  const [files, setFiles] = useState([]);
  
  axios.defaults.withCredentials = true;


  useEffect(() => {
    fetchFiles(folderId);
  }, [folderId]);

  const fetchFiles = async (folderId) => {
    try {
      const response = await axios.get(`https://lms-api-cyan.vercel.app/courses/folders/${folderId}/files`);
      if (response.status === 200) {
        setFiles(response.data);
      } else {
        console.error('Failed to fetch files:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

const handleFileClick = (file) =>{
  const fileUrl = `https://lms-api-cyan.vercel.app/uploads/${file.path}`;
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
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    </div>
</>
  );
}

export default StdFileList;
