
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; 

const Home = () => {
  const [forms, setForms] = useState([]);

  const getForms=async()=>{
     const {data}= await axios.get('https://form-builder-backend-lgps.onrender.com/api/forms/get-form');
     if(data.success){
      setForms(data.forms)
     }
  }
  useEffect(() => {
    getForms();
  }, []);
  const handleDelete = (id) => {
    axios.delete(`https://form-builder-backend-lgps.onrender.com/api/forms/delete-form/${id}`)
      .then(() => {
       getForms();
      })
      .catch((error) => console.error('Error deleting form:', error));
  };
  return (
    <div className='container'>
      <div className="form-first">
        <h1>Welcome to Form.com</h1>
        <p>This is Simple Form Builder</p>
        <Link to="/form/create">
          <button className='submit-btn'>Create Form</button>
        </Link>
        <hr style={{marginTop:'30px'}}/>
      </div>
      <div className="form-list-container">
        <h1>Forms</h1>
        {forms.length === 0 ? (
          <p>You have no form created yet. </p>
        ) : (
          forms?.map((form, index) => (
            <div key={index} className="form-list">
              <h2>{form.title}</h2>
              <div className="action">
              <Link to={`/view/${form._id}`} className='' style={{color:'green'}}>View</Link>
              <Link to={`/edit/${form._id}`} >Edit</Link>
              <button onClick={()=>handleDelete(form._id)} style={{color:'red'}}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
