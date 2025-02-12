import React from "react";
import "./Job.css"

function JobCard({ job }) {
    return (
        <div className="JobCard">
            <div>
                <h3>{job.title}</h3>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity}</p>
            </div>
        </div>
    );
}

export default JobCard;
