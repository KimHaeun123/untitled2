import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { ReactComponent as SearchIcon } from './search.svg';

const Home: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // URL 파라미터에서 original_url 가져오기
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const originalUrl = params.get('original_url');
        if (originalUrl) {
            setUrl(originalUrl);
            handleSearch(originalUrl); // URL에 대한 결과 자동으로 가져오기
        }
    }, []);

    const handleSearch = async (inputUrl: string) => {
        if (inputUrl.trim() === '') return;

        setLoading(true);
        try {
            const response = await axios.post('/api/url/detailed', { url: inputUrl });
            console.log(response.data);
            setResult(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const getReliabilityText = (prediction_result: number) => {
        if (prediction_result === 1) {
            return 'phishing site';
        } else if (prediction_result === 0) {
            return 'suspicious site';
        } else if (prediction_result === -1) {
            return 'reliable site';
        } else {
            return 'unknown';
        }
    };

    const getStatusText = (prediction_result: number) => {
        if (prediction_result === 1) {
            return 'Danger';
        } else if (prediction_result === 0) {
            return 'Suspicious';
        } else if (prediction_result === -1) {
            return 'Safe';
        } else {
            return 'Unknown';
        }
    };

    return (
        <div className={`home ${result && result.prediction_result === 1 ? 'phishing' : ''}`}>
            <h1 className="title">Catch Phishing</h1>
            <div className="search-container">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter the suspicious URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(url);
                        }
                    }}
                />
            </div>

            <div className="url-title">
                {result ? (
                    <>
                        <h1>{result.url}</h1>
                        <p className="reliable-site">{getReliabilityText(result.prediction_result)}</p>
                    </>
                ) : null}
            </div>

            {loading && <p>Loading...</p>}

            {result && (
                <div className="content-box">
                    <h2 className="about-heading">About</h2>
                    <div className="upper-section">
                        <div className="left-section">
                            <div className="url-risk">
                                <div className="url-risk-dot"></div>
                                <p className="section-title">URL RISK</p>
                            </div>
                            <div className="status-url-wrapper">
                                <div className={`status-box ${getStatusText(result.prediction_result).toLowerCase()}`}>
                                    {getStatusText(result.prediction_result)}
                                </div>
                                <div className="url-display">
                                    <p className="url-text">URL</p>
                                    <p>
                                        {result.url}
                                        <SearchIcon
                                            className="url-search-icon"
                                            style={{ fill: result.prediction_result === 1 ? '#652121' : '#245AAB' }}
                                        />
                                    </p>
                                    <div className={`phishing-probability-box ${result.prediction_result === 1 ? 'phishing' : 'normal'}`}>
                                        Phishing Probability: <span style={{ color: result.prediction_result === 1 ? '#652121' : '#0066FF' }}>{result.prediction_prob}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="right-section">
                            <div className="ip-risk">
                                <div className="ip-risk-dot"></div>
                                <p className="section-title">IP SCORE</p>
                            </div>
                            <div className="ip-region-wrapper">
                                <div>
                                    <span className="ip-text" style={{ marginRight: '15px' }}>IP</span>
                                    <span style={{ color: '#ffffff' }}>{result.ip_address}</span>
                                </div>
                                <div className="right-info">
                                    <p>Country: {result.country}</p>
                                    <p>Region: {result.region}</p>
                                    <p>ISP Name: {result.isp_name}</p>
                                    <p>VPN Usage: {result.is_vpn ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reason & Summary 섹션을 조건부로 렌더링 */}
                    {result.prediction_result !== -1 && (
                        <div className="lower-section">
                            <h3>Reason & Summary</h3>
                            <div className="feature-list">
                                <p>url_based_feature: {result.url_based_feature_list?.join(', ')}</p>
                                <p>content_based_feature: {result.content_based_feature_list?.join(', ')}</p>
                                <p>domain_based_feature: {result.domain_based_feature_list?.join(', ')}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
