import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import JoblyApi from "../../api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ searchValue: "" });

  const handleSearch = (e) => {
    const { value } = e.target;
    setFormData({ searchValue: value });
  };

  // fetch list of all jobs or filtered jobs based on input
  useEffect(() => {
    const getFilteredJobs = async () => {
      const res = await JoblyApi.getFilteredJobs(formData.searchValue);
      setJobs(res);
      console.log(res);
    };
    getFilteredJobs();
  }, [formData]);

  return (
    <div className="JobList">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-jobs">Search for Jobs</label>
        <input
          type="search"
          id="search-jobs"
          value={formData.searchValue || ""}
          onChange={handleSearch}
        />
      </form>
      {jobs
        ? jobs.map((job) => <Card data={job} type="job" key={job.id} />)
        : null}
    </div>
  );
};

export default JobList;
