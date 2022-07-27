import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import JoblyApi from "../../api";
import { Form, Input, Label } from "reactstrap";
import debounce from "lodash.debounce";

const JobList = ({ currentUser }) => {
  /*
  State:
  - jobs: array of job data fetched from database
  - formData: string input; value is used to call JoblyApi to get filtered job list
  - formInputValue: same value as formData; used by input to display typed text
  - isLoading: boolean value to indicate whether to display Loading text or not
  */
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ searchValue: "" });
  const [formInputValue, setFormInputValue] = useState({ searchValue: "" });
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (e) => {
    const { value } = e.target;
    setFormInputValue({ searchValue: value });

    debounce(() => {
      setFormData({ searchValue: value });
    }, 1000)();
  };

  // fetch list of all jobs or filtered jobs based on input
  useEffect(() => {
    const getFilteredJobs = async () => {
      const res = await JoblyApi.getFilteredJobs(formData.searchValue);
      setJobs(res.slice(0, 10));
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
          value={formInputValue.searchValue}
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
