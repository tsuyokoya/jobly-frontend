import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../../api";
import {
  Button,
  Card as ReactstrapCard,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
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
    <ReactstrapCard
      className="Card d-flex flex-column w-50 m-2 shadow"
      color="primary"
      outline
    >
      <Link
        to={`/companies/${data.handle}`}
        className="Card text-decoration-none text-dark"
      >
        <CardBody>
          <CardTitle tag="h5" className="h3">
            {data.name}
          </CardTitle>
          <CardText>Number of Employees: {data.numEmployees}</CardText>
          <CardText>{data.description}</CardText>
        </CardBody>
      </Link>
    </ReactstrapCard>
  );

  const handleClick = async (e) => {
    e.persist();
    const jobId = e.target.parentNode.parentNode.dataset.id;
    const res = await handleApply(e, jobId);
    if (res.applied) {
      e.target.parentNode.parentNode.classList.add("applied");
      e.target.textContent = "Applied!";
    }
  };

  const jobCard = (
    <ReactstrapCard
      className={
        "Card d-flex flex-column w-50 m-2 shadow " +
        (alreadyApplied === true ? "applied" : "")
      }
      color="primary"
      outline
      data-id={data.id}
    >
      <CardBody>
        <CardTitle tag="h5" className="h3">
          {data.title}
        </CardTitle>
        <CardText>Company: {data.companyName}</CardText>
        <CardText>Salary: {data.salary || "N/A"}</CardText>
        <CardText>Equity: {data.equity || "N/A"}</CardText>
      </CardBody>
      <div className="Card-btn-wrapper w-100 d-flex flex-row justify-content-end">
        <Button
          className="w-25 m-2"
          color="danger"
          onClick={(e) => handleClick(e)}
        >
          {alreadyApplied === true ? "Applied!" : "Apply"}
        </Button>
      </div>
    </ReactstrapCard>
  );

  return type === "company" ? companyCard : jobCard;
};

export default Card;
