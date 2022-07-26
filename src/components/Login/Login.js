import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
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
    const res = await login(formData);
    if (res.success) {
      navigate("/", { replace: true });
    }
  };
  return (
    <Form
      className="Login h5 d-flex flex-column align-items-center"
      onSubmit={handleSubmit}
      style={{ marginTop: "100px" }}
    >
      <FormGroup className="w-50">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          id="username"
          name="username"
        />
      </FormGroup>
      <FormGroup className="w-50">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          id="password"
          name="password"
        />
      </FormGroup>
      <Button className="w-50 mt-2" color="primary" outline>
        Login
      </Button>
    </Form>
  );
};

export default Login;
