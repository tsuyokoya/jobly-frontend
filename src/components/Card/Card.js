import React from "react";

const Card = ({ data, type }) => {
  return type === "company" ? (
    <a href={`/companies/${data.handle}`} className="Card">
      <div>
        <h3>{data.name}</h3>
        <p>Number of Employees: {data.numEmployees}</p>
        <p>{data.description}</p>
      </div>
    </a>
  ) : (
    <div className="Card">
      <h3>{data.title}</h3>
      <p>Company: {data.companyName}</p>
      <p>Salary: {data.salary}</p>
      <p>Equity: {data.equity}</p>
    </div>
  );
};

export default Card;
