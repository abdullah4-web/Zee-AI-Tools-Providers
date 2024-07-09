import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobCard from '../components/JobCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './AuthContext';
import { Spinner } from 'react-bootstrap';

const JobSearch = () => { 
  const  { state } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [date_posted, setDatePosted] = useState(null);
  const [remote_jobs_only, setRemoteJobsOnly] = useState(null);
  const [employment_types, setEmploymentTypes] = useState(null);
  const [job_requirements, setJobRequirements] = useState(null);
  const [actively_hiring, setActivelyHiring] = useState(null);
  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState('en');
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJobSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const options = {
        method: 'GET',
        url: '/api/jobsearch',
        params: {
          query,
          date_posted,
          remote_jobs_only,
          employment_types,
          job_requirements,
          actively_hiring,
          country,
          language,
        },
        headers: {
          Authorization: `Bearer ${state.user.token}`, // Include the authToken in the Authorization header
        },
      };

      const response = await axios.request(options);
      setJobResults(response.data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching job data.');
      setError('An error occurred while fetching job data.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setQuery('');
    setLocation('');
    setDatePosted(null);
    setRemoteJobsOnly(null);
    setEmploymentTypes(null);
    setJobRequirements(null);
    setActivelyHiring(null);
    setCountry(null);
    setLanguage('en');
  };

  const countries = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AX', name: 'Åland Islands' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AS', name: 'American Samoa' },
    { code: 'AD', name: 'Andorra' },
    { code: 'AO', name: 'Angola' },
    { code: 'AI', name: 'Anguilla' },
    { code: 'AQ', name: 'Antarctica' },
    { code: 'AG', name: 'Antigua and Barbuda' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AM', name: 'Armenia' },
    { code: 'AW', name: 'Aruba' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BB', name: 'Barbados' },
    { code: 'BY', name: 'Belarus' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BZ', name: 'Belize' },
    { code: 'BJ', name: 'Benin' },
    { code: 'BM', name: 'Bermuda' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'BO', name: 'Bolivia (Plurinational State of)' },
    { code: 'BQ', name: 'Bonaire, Sint Eustatius and Saba' },
    { code: 'BA', name: 'Bosnia and Herzegovina' },
    { code: 'BW', name: 'Botswana' },
    { code: 'BV', name: 'Bouvet Island' },
    { code: 'BR', name: 'Brazil' },
    { code: 'IO', name: 'British Indian Ocean Territory' },
    { code: 'BN', name: 'Brunei Darussalam' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'BI', name: 'Burundi' },
    { code: 'CV', name: 'Cabo Verde' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CA', name: 'Canada' },
    { code: 'KY', name: 'Cayman Islands' },
    { code: 'CF', name: 'Central African Republic' },
    { code: 'TD', name: 'Chad' },
    { code: 'CL', name: 'Chile' },
    { code: 'CN', name: 'China' },
    { code: 'CX', name: 'Christmas Island' },
    { code: 'CC', name: 'Cocos (Keeling) Islands' },
    { code: 'CO', name: 'Colombia' },
    { code: 'KM', name: 'Comoros' },
    { code: 'CG', name: 'Congo' },
    { code: 'CD', name: 'Congo (Democratic Republic of the)' },
    { code: 'CK', name: 'Cook Islands' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CW', name: 'Curaçao' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czechia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'DM', name: 'Dominica' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egypt' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'GQ', name: 'Equatorial Guinea' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'EE', name: 'Estonia' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'FK', name: 'Falkland Islands (Malvinas)' },
    { code: 'FO', name: 'Faroe Islands' },
    { code: 'FJ', name: 'Fiji' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GF', name: 'French Guiana' },
    { code: 'PF', name: 'French Polynesia' },
    { code: 'TF', name: 'French Southern Territories' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GM', name: 'Gambia' },
    { code: 'GE', name: 'Georgia' },
    { code: 'DE', name: 'Germany' },
    { code: 'GH', name: 'Ghana' },
    { code: 'GI', name: 'Gibraltar' },
    { code: 'GR', name: 'Greece' },
    { code: 'GL', name: 'Greenland' },
    { code: 'GD', name: 'Grenada' },
    { code: 'GP', name: 'Guadeloupe' },
    { code: 'GU', name: 'Guam' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'GG', name: 'Guernsey' },
    { code: 'GN', name: 'Guinea' },
    { code: 'GW', name: 'Guinea-Bissau' },
    { code: 'GY', name: 'Guyana' },
    { code: 'HT', name: 'Haiti' },
    { code: 'HM', name: 'Heard Island and McDonald Islands' },
    { code: 'VA', name: 'Holy See' },
    { code: 'HN', name: 'Honduras' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran (Islamic Republic of)' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IM', name: 'Isle of Man' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'JP', name: 'Japan' },
    { code: 'JE', name: 'Jersey' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KI', name: 'Kiribati' },
    { code: 'KP', name: 'Korea (Democratic People\'s Republic of)' },
    { code: 'KR', name: 'Korea (Republic of)' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'LA', name: 'Lao People\'s Democratic Republic' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'LR', name: 'Liberia' },
    { code: 'LY', name: 'Libya' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MO', name: 'Macao' },
    { code: 'MK', name: 'North Macedonia' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MV', name: 'Maldives' },
    { code: 'ML', name: 'Mali' },
    { code: 'MT', name: 'Malta' },
    { code: 'MH', name: 'Marshall Islands' },
    { code: 'MQ', name: 'Martinique' },
    { code: 'MR', name: 'Mauritania' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'YT', name: 'Mayotte' },
    { code: 'MX', name: 'Mexico' },
    { code: 'FM', name: 'Micronesia (Federated States of)' },
    { code: 'MD', name: 'Moldova (Republic of)' },
    { code: 'MC', name: 'Monaco' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'MS', name: 'Montserrat' },
    { code: 'MA', name: 'Morocco' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'NA', name: 'Namibia' },
    { code: 'NR', name: 'Nauru' },
    { code: 'NP', name: 'Nepal' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NC', name: 'New Caledonia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NU', name: 'Niue' },
    { code: 'NF', name: 'Norfolk Island' },
    { code: 'MP', name: 'Northern Mariana Islands' },
    { code: 'NO', name: 'Norway' },
    { code: 'OM', name: 'Oman' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PW', name: 'Palau' },
    { code: 'PS', name: 'Palestine, State of' },
    { code: 'PA', name: 'Panama' },
    { code: 'PG', name: 'Papua New Guinea' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PN', name: 'Pitcairn' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RE', name: 'Réunion' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russian Federation' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'BL', name: 'Saint Barthélemy' },
    { code: 'SH', name: 'Saint Helena, Ascension and Tristan da Cunha' },
    { code: 'KN', name: 'Saint Kitts and Nevis' },
    { code: 'LC', name: 'Saint Lucia' },
    { code: 'MF', name: 'Saint Martin (French part)' },
    { code: 'PM', name: 'Saint Pierre and Miquelon' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines' },
    { code: 'WS', name: 'Samoa' },
    { code: 'SM', name: 'San Marino' },
    { code: 'ST', name: 'Sao Tome and Principe' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SN', name: 'Senegal' },
    { code: 'RS', name: 'Serbia' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'SG', name: 'Singapore' },
    { code: 'SX', name: 'Sint Maarten (Dutch part)' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
  
      <div className="container text-center mt-3">
      <div className="mx-auto" style={{ maxWidth: '1000px', border: '2px dashed #3498db', padding: '10px', marginBottom: '20px' }}>
          <h2>Find Jobs on Differenet Platforms</h2>
          <div className="row pt-3">
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Search Job</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Job in Country'
                  />
                </div>
              </div>
             
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Job Experience</label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={job_requirements}
                    onChange={(e) => setJobRequirements(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="under_3_years_experience">Under 3 Years Experience</option>
                    <option value="more_than_3_years_experience">More than 3 years of experince</option>
                    <option value="no_experience">No Experince</option>
                    <option value="no_degree">No Degree</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Actively Hiring</label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={actively_hiring}
                    onChange={(e) => setActivelyHiring(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Date Posted </label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={date_posted}
                    onChange={(e) => setDatePosted(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="3days">3 days ago</option>
                    <option value="week">Week ago</option>
                    <option value="month">Month ago</option>
                    {/* Add other options as needed */}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Remote Jobs Only:</label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={remote_jobs_only}
                    onChange={(e) => setRemoteJobsOnly(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Employment Types:</label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={employment_types}
                    onChange={(e) => setEmploymentTypes(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="FULLTIME">Full-time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handleJobSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search Jobs'}
            </button>
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
          <div className="mt-3 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {loading && (
             <div className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
            <div className="text-center">
              <Spinner animation="border" role="status"size="lg" >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
            </div>
          )}
            {error && <p>{error}</p>}
            {!loading && !error && jobResults.length > 0 ? (
              jobResults.map((job) => <JobCard key={job.job_id} job={job} />)
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default JobSearch;
