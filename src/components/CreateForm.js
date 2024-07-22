import React, { useState } from "react";
import "../styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DynamicInput from "./DynamicInput";

const CreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled Form");
  const [inputs, setInputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [editingTitle, setEditingTitle] = useState(true);
  const [addinput, setAddInput] = useState(false);

  const addInput = (type) => {
    setEditingTitle(false);
    const newInput = { type, title: "", placeholder: "" };
    if (inputs.length < 20) {
      setInputs([...inputs, newInput]);
      setSelectedInput(inputs.length);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const deleteInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
    setSelectedInput(null);
  };

  const saveForm = async () => {
  if (!title || inputs.length === 0) {
    alert("Please ensure that the form has a title and at least one input.");
    return;
  }
  for (const input of inputs) {
    if (!input.title) {
      alert("Each input must have a title.");
      return;
    }
  }
    const formData = { title, inputs };
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/forms/create-form",
        formData
      );
      if (data.success) {
        alert("Form data Add Successfully");
        navigate("/");
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInput = (index) => {
    setSelectedInput(index);
  };

  const handleTitleEdit = () => {
    setEditingTitle(true);
  };

  return (
    <div className="create-form-container">
      <h1>Create New Form</h1>
      <div className="create-form">
        <div className="form-builder">
          <div className="form-preview">
            <h5>
              {title}
              <button onClick={handleTitleEdit} className="edit-btn">
                ✏️
              </button>
            </h5>
            <div className="preview-container">
            {inputs.map((input, index) => (
              <div key={index} className="form-input-preview">
                <div className="div-prev">
                  <DynamicInput label={input.title || 'Title'} type={input.type} required/>
                  <button
                    onClick={() => handleEditInput(index)}
                    className="edit-btn"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteInput(index)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
            </div>

            {!addinput && (
              <button className="add-input" onClick={() => setAddInput(true)}>
                Add Input
              </button>
            )}
            {addinput && (
              <div className="input-btn">
                <button
                  onClick={() => addInput("text")}
                  className="input-type-btn"
                >
                  Text
                </button>
                <button
                  onClick={() => addInput("number")}
                  className="input-type-btn"
                >
                  Number
                </button>
                <button
                  onClick={() => addInput("email")}
                  className="input-type-btn"
                >
                  Email
                </button>
                <button
                  onClick={() => addInput("password")}
                  className="input-type-btn"
                >
                  Password
                </button>
                <button
                  onClick={() => addInput("date")}
                  className="input-type-btn"
                >
                  Date
                </button>
              </div>
            )}
            <button className="submit-btn" >
              Submit
            </button>
          </div>
          <div className="form-editor">
            <h2>Form Editor</h2>
            {editingTitle && (
              <div>
                <DynamicInput
                  label={"Form Title"}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            )}
            {selectedInput !== null && (
              <div className="edit-input-section">
                <h4>Edit Input</h4>
                <div>
                  <DynamicInput
                    label={"Input Title"}
                    value={inputs[selectedInput]?.title}
                    onChange={(e) =>
                      handleInputChange(selectedInput, "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <DynamicInput
                    label={"Placeholder"}
                    value={inputs[selectedInput]?.placeholder}
                    onChange={(e) =>
                      handleInputChange(
                        selectedInput,
                        "placeholder",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button className="create-form-btn" onClick={saveForm}>
        Create Form
      </button>
    </div>
  );
};

export default CreateForm;
