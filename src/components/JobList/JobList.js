import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import JoblyApi from "../../api";
import { Form, Input, Label } from "reactstrap";

const JobList = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ searchValue: "" });
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (e) => {
    const { value } = e.target;
    setFormData({ searchValue: value });
  };

  // fetch list of all jobs or filtered jobs based on input
  useEffect(() => {
    const getFilteredJobs = async () => {
      const res = await JoblyApi.getFilteredJobs(formData.searchValue);
      setJobs(res);
    };
    getFilteredJobs().then(() => {
      setIsLoading(false);
    });
  }, [formData]);

  const handleApply = async (e, id) => {
    return await JoblyApi.applyToJob(id, currentUser.username);
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="display-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="JobList d-flex flex-column align-items-center">
      <Form
        className="d-flex flex-row w-50"
        style={{ marginTop: "100px" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <Label hidden htmlFor="search-jobs">
          Search jobs:
        </Label>
        <Input
          type="search"
          id="search-jobs"
          value={formData.searchValue || ""}
          onChange={handleSearch}
          placeholder="Search for a job"
          bsSize="lg"
        />
      </Form>
      {jobs.map((job) => {
        return (
          <Card
            data={job}
            handleApply={handleApply}
            currentUser={currentUser}
            type="job"
            key={job.id}
          />
        );
      })}
    </div>
  );
};

export default JobList;
