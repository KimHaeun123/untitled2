import React from 'react';
import './about.css';  // about.css 임포트
import { ReactComponent as SearchIcon } from './search.svg';

const About: React.FC = () => {
    return (
        <div className="about-container">
            {/* 첫 번째 화면 */}
            <div className="about-split-container">
                <div className="about-left-section">
                    <p>scroll down {'>'}</p>
                </div>
                <div className="about-right-section">
                    <p className="about-main-text">
                        If you suspect a website, check it using the extension we provide
                    </p>
                    <p className="about-sub-text">
                        Our website utilizes an AI model trained with machine learning, which enables us to detect even newly emerging phishing sites.
                    </p>
                </div>
            </div>

            {/* 두 번째 화면 - home.tsx의 검색창 재활용 */}
            <div className="about-split-container">
                <div className="about-right-section">
                    <p className="about-main-text">Step1: Enter the suspicious URL</p>
                    <h1 className="title">Catch Phishing</h1>
                    <div className="search-container">
                        <SearchIcon className="search-icon"/>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Enter the suspicious URL"
                        />
                    </div>
                </div>
            </div>

            {/* 세 번째 화면 - home.tsx의 content-box 재활용 */}
            <div className="about-split-container">
                <div className="about-right-section">
                    <p className="about-main-text">Step2 :Check the URL information</p>
                    <div className="content-box" style={{width: '80%'}}>
                        <h2 className="about-heading">About</h2>
                        <div className="upper-section">
                            <div className="left-section">
                                <div className="url-risk">
                                    <div className="url-risk-dot"></div>
                                    <p className="section-title">URL RISK</p>
                                </div>
                                <div className="status-url-wrapper">
                                    <div className={`status-box phishing`}>
                                        safe
                                    </div>
                                    <div className="url-display">
                                        <p className="url-text">URL</p>
                                        <p>https://example.com</p>
                                        <div className={`phishing-probability-box`}>
                                            Phishing Probability: <span style={{color: '#0066FF'}}>75%</span>
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
                                        <span className="ip-text" style={{marginRight: '15px'}}>IP</span>
                                        <span style={{color: '#ffffff'}}>127.0.0.1</span>
                                    </div>
                                    <div className="right-info">
                                        <p>Country: Korea</p>
                                        <p>Region: Seoul</p>
                                        <p>ISP Name: ExampleISP</p>
                                        <p>VPN Usage: no</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="about-footer">
                <p>Copyright © 2024 Phishing Detection</p>
                <a href="https://phishing-detection.com">Visit Our Website</a>
            </div>
        </div>
    );
};

export default About;
