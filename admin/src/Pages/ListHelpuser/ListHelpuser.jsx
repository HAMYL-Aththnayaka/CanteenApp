import React, { useEffect, useState } from 'react';
import './ListHelpuser.css';
import api from '../../lib/axios';
import { toast } from 'react-toastify';

const ListHelpuser = () => {
  const [helpList, setHelpList] = useState([]);

  const fetchHelpList = async () => {
    try {
      const response = await api.get('/helpuser/view');

      if (response.data.success) {
        setHelpList(response.data.Data);
        toast.success("Data Fetched Successfully");
      } else {
        toast.error("Error Occurred During Fetching Users");
      }
    } catch (err) {
      console.log(err.toString());
      toast.error("Something Went Wrong");
    }
  };


  const removeStudent = async(id) => {
    const response = await api.post(`/helpuser/removehelp/${id}`);
    if (response){
      toast.success("User Removed");
       setHelpList(helpList.filter(student => student._id !== id))
    }else{
      toast.error("Error In removing User")
    }
  };
  useEffect(() => {
    fetchHelpList();
  }, []);

  return (
    <div className="help-list-container">
      <div className="help-list-table">
        <div className="help-list-header">
          <span>Name</span>
          <span>Registration</span>
          <span>Action</span>
        </div>
        {helpList.map((student, index) => (
          <div key={index} className="help-list-row">
            <span>{student.name}</span>
            <span>{student.registration}</span>
            <span className="help-list-remove" onClick={() => removeStudent(student._id)}>X</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHelpuser;
