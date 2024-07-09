import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './AuthContext';

const ProductSearch = () => {
  const { state } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [condition, setCondition] = useState(null);
  const [freeReturns, setFreeReturns] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [minRating, setMinRating] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchTime, setLastSearchTime] = useState(null);
 

  const handleSearch = async () => {
    try {
      const currentTime = new Date().getTime();
      if (lastSearchTime && currentTime - lastSearchTime < 5 * 60 * 1000) {
        // Less than 5 minutes have passed since the last search
        toast.error('Wait for 5 minutes to search again');
        return;
      }

      setLoading(true);
      setError(null);

      const options = {
        method: 'GET',
        url: '/api/search',
        params: {
          q: searchQuery,
          country,
          language: 'en',
          sort_by: sortOption,
          min_price: minPrice,
          max_price: maxPrice,
          product_condition: condition,
          free_returns: freeReturns.toString(),
          free_shipping: freeShipping.toString(),
          min_rating: minRating,
        }, 
        headers: {
          Authorization: `Bearer ${state.user.token}`, // Include the authToken in the Authorization header
        },
      };

      const response = await axios.request(options);
      setSearchResults(response.data.data);
      setLastSearchTime(currentTime); // Update last search time
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
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
    const clearFilters = () => {
      setSearchQuery('');
      setCountry(null);
      setSortOption(null);
      setMinPrice(null);
      setMaxPrice(null);
      setCondition(null);
      setFreeReturns(false);
      setFreeShipping(false);
      setMinRating(null);
    };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      
      <div className="container text-center mt-3">
      <div className="mx-auto" style={{ maxWidth: '1000px', border: '2px dashed #3498db', padding: '10px', marginBottom: '20px' }}>
          
          <h2>Find Product on Different Markets</h2>
          <h3>Compare Values of Your Product</h3>

          <div className="row pt-3">
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Search Product:</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Country:</label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Sort By:</label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">Price</option>
                    <option value="LOWEST_PRICE">Lowest Price</option>
                    <option value="HIGHEST_PRICE">Highest Price</option>
                    <option value="BEST_MATCH">Best Match</option>
                    <option value="TOP_RATED">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Min Price:</label>
                <div className="col-md-9">
                  <input
                    type="number"
                    className="form-control"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Max Price:</label>
                <div className="col-md-9">
                  <input
                    type="number"
                    className="form-control"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Condition:</label>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="">Condition</option>
                    <option value="NEW">New</option>
                    <option value="USED">Used</option>
                    <option value="REFURBISHED">Refurbished</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="freeReturnsCheckbox"
                  checked={freeReturns}
                  onChange={(e) => setFreeReturns(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="freeReturnsCheckbox">
                  Free Returns
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="freeShippingCheckbox"
                  checked={freeShipping}
                  onChange={(e) => setFreeShipping(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="freeShippingCheckbox">
                  Free Shipping
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-3">
                <label className="col-form-label col-md-3">Min Rating:</label>
                <div className="col-md-9">
                  <input
                    type="number"
                    className="form-control"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3  ">
        <button className="btn btn-primary m-1" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button className="btn btn-secondary" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

          {error && <div className="mt-3" style={{ color: 'red' }}>{error}</div>}
          {loading && (
             <div className="mx-auto" style={{ maxWidth: '800px', border: '2px dashed #3498db', padding: '40px', marginBottom: '20px' }}>
            <div className="text-center">
              <Spinner animation="border" role="status"size="lg" >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
            </div>
          )}
        </div>

        <div className="mt-3 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {searchResults.map((product) => (
            <div key={product.product_id} className="col mb-4">
              <div className="card h-100">
                <img
                  src={product.product_photos[0]}
                  className="card-img-top img-fluid"
                  alt={product.product_title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.product_title}</h5>
                  <p className="card-text"> Store :{product.offer.store_name}</p>
                  <p className="card-text">Price :{product.offer.price}</p>
                  <p className="card-text">Shipping :{product.offer.shipping}</p>
                  <p className="card-text">Condition :{product.offer.product_condition}</p>
                  <a
                    href={product.offer.offer_page_url}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}; 

export default ProductSearch;
