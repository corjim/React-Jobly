import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/Api";
import JobCard from "../Job/JobCard";
import "./Company.css"

function CompanyDetail() {

    console.log("COMPANY DETAILS IS POPPING")
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function fetchCompany() {
            const company = await JoblyApi.getCompany(handle);
            setCompany(company);
        }
        fetchCompany();
    }, [handle]);

    if (!company) return <p>Loading...</p>;

    return (
        <div className="CompanyDetail">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            {company.jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}

export default CompanyDetail;
