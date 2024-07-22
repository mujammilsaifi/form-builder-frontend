import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DynamicInput from './DynamicInput';

const ViewForm = () => {
  const { id } = useParams(); 
  const [inputData, setInputData] = useState({});
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/forms/get-form/${id}`); 
        setFormData(response.data.form);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, [id]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });

    // Validate input as user types
    const input = formData.inputs[index];
    const isValid = validateInput(input, value);
    setErrors({ ...errors, [index]: !isValid });
  };

  const validateInput = (input, value) => {
    switch (input.type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'number':
        return !isNaN(value) && value.trim() !== '';
      case 'text':
      case 'password':
      case 'date':
        return value.trim() !== '';
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = {};

    formData.inputs.forEach((input, index) => {
      const value = inputData[input.title] || '';
      if (!validateInput(input, value)) {
        newErrors[index] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      console.log(inputData);
      alert("Form submitted successfully! Open console to see form data.");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  return (
    <div className='form-container'>
      <h2>{formData?.title}</h2>
      <form style={{ display: 'flex', flexWrap: 'wrap' }}>
        {formData?.inputs.map((input, index) => (
          <div key={index} style={{ width: '47%', margin: '10px' }}>
            <DynamicInput
              type={input.type}
              label={input.title}
              onChange={(e) => handleChange(e, index)}
              required
              name={input.title}
              error={errors[index] || false}
            />
          </div>
        ))}
      </form>
      <button className='submit-btn' type="button" onClick={handleSubmit}>SUBMIT </button>
    </div>
  );
};

export default ViewForm;
