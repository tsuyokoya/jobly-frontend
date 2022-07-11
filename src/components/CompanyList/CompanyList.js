import React, { useState, useEffect } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";
import JoblyApi from "../../api";

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
    <div className="CompanyList">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search for Companies</label>
        <input
          type="search"
          id="search"
          name="search"
          value={formData.searchValue || ""}
          onChange={handleSearch}
        />
      </form>
      {companies
        ? companies.map((company) => (
            <CompanyCard company={company} key={company.handle} />
          ))
        : null}
    </div>
  );
};

export default CompanyList;
