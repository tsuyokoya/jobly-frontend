import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import Card from "../Card/Card";

const CompanyDetail = ({ currentUser }) => {
  const [companyJobs, setCompanyJobs] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const { handle } = useParams();

  useEffect(() => {
    const getJobs = async () => {
      const res = await JoblyApi.getCompany(handle);
      setCompanyJobs(res.jobs);
      setCompanyName(res.name);
    };
    getJobs();
  }, [handle]);

  const handleApply = async (e, id) => {
    return await JoblyApi.applyToJob(id, currentUser.username);
  };

  return (
    <div
      className="CompanyDetail d-flex flex-column align-items-center"
      style={{ marginTop: "100px" }}
    >
      <h1>Jobs at {companyName}</h1>
      {companyJobs
        ? companyJobs.map((job) => (
            <Card
              data={job}
              type="job"
              currentUser={currentUser}
              handleApply={handleApply}
              key={job.id}
            />
          ))
        : null}
    </div>
  );
};

export default CompanyDetail;
