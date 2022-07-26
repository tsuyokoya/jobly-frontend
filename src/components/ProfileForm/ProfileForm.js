import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

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
    <Form
      onSubmit={handleSubmit}
      style={{ marginTop: "100px" }}
      className="ProfileForm h5 d-flex flex-column align-items-center"
    >
      <FormGroup className="w-50">
        <Label htmlFor="username">Username</Label>
        <p>{currentUser.username}</p>
      </FormGroup>
      <FormGroup className="w-50">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          id="firstName"
          name="firstName"
        />
      </FormGroup>
      <FormGroup className="w-50">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          id="lastName"
          name="lastName"
        />
      </FormGroup>
      <FormGroup className="w-50">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          id="email"
          name="email"
        />
      </FormGroup>
      <Button className="w-50 mt-2" color="secondary" outline>
        Update
      </Button>
    </Form>
  );
};

export default ProfileForm;
