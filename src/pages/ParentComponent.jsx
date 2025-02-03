import React, { useState } from "react";
import ChildForm from "./ChildForm";

function ParentComponent() {
  const [formData, setFormData] = useState(null);

  // Callback function to receive data from the child
  const handleFormSubmit = (data) => {
    console.log("Received data in parent:", data);
    
    setFormData(data); // Update state with the data from the child
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildForm onSubmit={handleFormSubmit} />
      {formData && (
        <div>
          <h2>Received Data:</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
        </div>
      )}
    </div>
  );
}

export default ParentComponent;