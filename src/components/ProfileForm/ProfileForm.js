import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({ updateUserData, currentUser }) => {
  const INITIAL_STATE = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let fieldValue of Object.values(formData)) {
      if (fieldValue === "") {
        return alert("Please fill out each field!");
      }
    }
    const res = await updateUserData(formData, currentUser.username);
    if (res.success) {
      navigate("/", { replace: true });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <p>{currentUser.username}</p>
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          id="firstName"
          name="firstName"
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          id="lastName"
          name="lastName"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          id="email"
          name="email"
        />
      </div>
      <button>Register</button>
    </form>
  );
};

export default ProfileForm;
