import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import JoblyApi from "../../api";
import { Form, Input, Label } from "reactstrap";
import Paginate from "../Paginate";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ searchValue: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);

  const handleSearch = (e) => {
    const { value } = e.target;
    setFormData({ searchValue: value });
    setCurrentPage(1);
  };

  // fetch list of all companies or filtered companies based on input
  useEffect(() => {
    const getFilteredCompanies = async () => {
      const res = await JoblyApi.getFilteredCompanies(formData.searchValue);
      setCompanies(res);
    };
    getFilteredCompanies();
  }, [formData]);

  //Get current posts
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="CompanyList d-flex flex-column align-items-center">
      <Form
        id="form"
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
        ? currentCompanies.map((company) => (
            <Card data={company} type="company" key={company.handle} />
          ))
        : null}
      <Paginate
        itemsPerPage={companiesPerPage}
        totalItems={companies.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CompanyList;
