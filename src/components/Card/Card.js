import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../../api";
import { Button } from "reactstrap";
import "./Card.css";

const Card = ({ data, type, handleApply, currentUser }) => {
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const checkApplied = async () => {
      if (type === "job") {
        const jobId = data.id;
        const user = await JoblyApi.hasApplied(currentUser.username);
        const applications = user.applications;
        return setAlreadyApplied(applications.includes(jobId));
      }
    };
    checkApplied();
  });

  const companyCard = (
    <Link to={`/companies/${data.handle}`} className="Card">
      <div>
        <h3>{data.name}</h3>
        <p>Number of Employees: {data.numEmployees}</p>
        <p>{data.description}</p>
      </div>
    </Link>
  );

  const handleClick = async (e) => {
    e.persist();
    const jobId = e.target.parentNode.dataset.id;
    const res = await handleApply(e, jobId);
    if (res.applied) {
      e.target.parentNode.classList.add("applied");
      e.target.textContent = "Applied!";
    }
  };

  const jobCard = (
    <div
      className={"Card " + (alreadyApplied === true ? "applied" : "")}
      data-id={data.id}
    >
      <h3>{data.title}</h3>
      <p>Company: {data.companyName}</p>
      <p>Salary: {data.salary}</p>
      <p>Equity: {data.equity}</p>
      <Button
        color="danger"
        className="Card-apply"
        onClick={(e) => handleClick(e)}
      >
        {alreadyApplied === true ? "Applied!" : "Apply"}
      </Button>
    </div>
  );

  return type === "company" ? companyCard : jobCard;
};

export default Card;
