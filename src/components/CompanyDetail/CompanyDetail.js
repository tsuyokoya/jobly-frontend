import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import Card from "../Card/Card";

const CompanyDetail = () => {
  const [companyJobs, setCompanyJobs] = useState(null);
  const { handle } = useParams();
  useEffect(() => {
    const getJobs = async () => {
      const res = await JoblyApi.getCompany(handle);
      setCompanyJobs(res.jobs);
    };
    getJobs();
  }, [handle]);

  return (
    <div className="CompanyDetail">
      {companyJobs
        ? companyJobs.map((job) => <Card data={job} type="job" key={job.id} />)
        : null}
    </div>
  );
};

export default CompanyDetail;
