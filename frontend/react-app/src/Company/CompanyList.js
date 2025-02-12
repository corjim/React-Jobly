import React, { useState, useEffect } from "react";
import JoblyApi from "../api/Api";
import CompanyCard from "./CompanyCard";

function CompanyList() {

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                // Fetch the list of companies using the API
                const allCompanies = await JoblyApi.getCompanies();

                // Update the state with the fetched companies
                setCompanies(allCompanies);
            } catch (err) {
                console.error("Error fetching companies:", err);
            }
        };
        fetchCompanies();
    }, []);

    return (
        <div>
            {companies.map((c) => (
                <CompanyCard key={c.handle} company={c} />
            ))}
        </div>
    );
}

export default CompanyList;
