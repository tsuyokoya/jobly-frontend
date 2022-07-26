import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import JoblyApi from "../../api";
import { Form, Input, Label } from "reactstrap";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ searchValue: "" });

  const handleSearch = (e) => {
    const { value } = e.target;
    setFormData({ searchValue: value });
  };

  // fetch list of all companies or filtered companies based on input
  useEffect(() => {
    const getFilteredCompanies = async () => {
      const res = await JoblyApi.getFilteredCompanies(formData.searchValue);
      setCompanies(res);
    };
    getFilteredCompanies();
  }, [formData]);

  return (
    <div className="CompanyList d-flex flex-column align-items-center">
      <Form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex flex-row w-50"
        style={{ marginTop: "100px" }}
      >
        <Label hidden htmlFor="search-companies">
          Search for Companies
        </Label>
        <Input
          type="search"
          id="search-companies"
          value={formData.searchValue || ""}
          onChange={handleSearch}
          placeholder="Search for a company"
          bsSize="lg"
        />
      </Form>
      {companies
        ? companies.map((company) => (
            <Card data={company} type="company" key={company.handle} />
          ))
        : null}
    </div>
  );
};

export default CompanyList;
