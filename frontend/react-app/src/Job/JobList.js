import React, { useState, useEffect } from "react";
import JoblyApi from "../api/Api";
import JobCard from "./JobCard";
import "./Job.css"

function JobList() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            const jobs = await JoblyApi.getJobs();
            setJobs(jobs);
        }

        fetchJobs();
    }, []);

    return (
        <div className="JobList">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}

export default JobList;
