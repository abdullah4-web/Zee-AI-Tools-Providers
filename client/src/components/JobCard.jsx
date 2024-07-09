import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ job }) => {
    const labelStyle = { fontWeight: 'bold' };
    const textStyle = { textAlign: 'left' };

    return (
        <div className="col-md-4 mb-4">
            <div className="border p-3">
                <img src={job.employer_logo} height={40} width={40} alt="Employer Logo" />
                <h5 className="card-title">{job.job_title}</h5>
                <p style={textStyle}>
                    <span style={labelStyle}>Employer:</span> {job.employer_name}
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Job Publisher:</span> {job.job_publisher}
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Employment Type:</span> {job.job_employment_type}
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Location:</span> {job.job_city}
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Remote:</span> {job.job_is_remote ? 'Yes' : 'No'}
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Required Skills:</span>
                    <ul>
                        {job.job_required_skills ? (
                            job.job_required_skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))
                        ) : (
                            <li>No skills specified</li>
                        )}
                    </ul>
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Required Experience:</span>{' '}
                    {job.job_required_experience.no_experience_required
                        ? 'No experience required'
                        : `Minimum ${job.job_required_experience.required_experience_in_months} months of experience`}
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Posted:</span>{' '}
                    {formatDistanceToNow(new Date(job.job_posted_at_datetime_utc), { addSuffix: true })}
                </p>
                <p style={textStyle}>
                    <span style={labelStyle}>Job Offer Expiration:</span>{' '}
                    {formatDistanceToNow(new Date(job.job_offer_expiration_datetime_utc), { addSuffix: true })}
                </p>
                <a
                    href={job.job_apply_link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Apply Now
                </a>
            </div>
        </div>
    );
};

export default JobCard;
