import React from "react";

const CompanyCard = ({ company }) => {
  return (
    <div className="CompanyCard">
      <h3>{company.name}</h3>
      <p>Number of Employees: {company.numEmployees}</p>
      <p>{company.description}</p>
    </div>
  );
};

export default CompanyCard;
