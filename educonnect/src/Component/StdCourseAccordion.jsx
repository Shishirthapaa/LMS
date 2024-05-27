import React, { useEffect, useState } from 'react';
import { Accordion, Card,} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StdFileList from './StdFileList';

function StdCourseAccordion() {
  const { _id } = useParams();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetchFolders(_id);
  }, [_id]);


  const fetchFolders = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3001/courses/${courseId}/folders`);
      if (response.status === 200) {
        setFolders(response.data);
      } else {
        console.error('Failed to fetch folders:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };



  return (
    <>
    <Accordion defaultActiveKey="0" flush>
      {folders &&
        folders.map((folder, index) => (
          <Card key={folder._id}>
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>{folder.name} </Accordion.Header>
              <Accordion.Body>
                <StdFileList folderId={folder._id} /> 
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
    </Accordion>
</>
)}

export default StdCourseAccordion;
