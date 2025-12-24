/**
 * Policy Lens AI - Main Application Page
 * Orchestrates the policy analysis workflow
 */

'use client';

import { useState } from 'react';
import PolicyInput from '../components/PolicyInput';
import UserProfile from '../components/UserProfile';
import ResultsDisplay from '../components/ResultsDisplay';
import Disclaimer from '../components/Disclaimer';
import Particles from '../components/Particles';
import styles from './page.module.css';

export default function Home() {
    const [step, setStep] = useState(1); // 1: Policy Input, 2: User Profile, 3: Results
    const [policyData, setPolicyData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [analysisResults, setAnalysisResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePolicySubmit = (data) => {
        setPolicyData(data);
        setStep(2);
        setError('');
    };

    const handleProfileSubmit = async (profile) => {
        setUserProfile(profile);
        setLoading(true);
        setError('');

        try {
            // Prepare form data
            const formData = new FormData();
            formData.append('inputMethod', policyData.method);
            formData.append('ageGroup', profile.ageGroup);
            formData.append('occupation', profile.occupation);
            formData.append('incomeRange', profile.incomeRange || '');
            formData.append('locationType', profile.locationType);
            formData.append('sector', profile.sector);

            if (policyData.method === 'pdf') {
                formData.append('pdfFile', policyData.file);
            } else {
                formData.append('policyText', policyData.text);
            }

            // Call API
            const response = await fetch('/api/analyze-policy', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!result.success) {
                setError(result.error || 'Failed to analyze policy. Please try again.');
                setLoading(false);
                return;
            }

            setAnalysisResults(result.data);
            setStep(3);
        } catch (err) {
            console.error('Analysis error:', err);
            setError('An unexpected error occurred. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setStep(1);
        setError('');
    };

    const handleStartOver = () => {
        setStep(1);
        setPolicyData(null);
        setUserProfile(null);
        setAnalysisResults(null);
        setError('');
    };

    return (
        <div className={styles.page}>
            {/* Particle Background */}
            <div className={styles.particleBackground}>
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* Header */}
            <div className="container">
                <div className={styles.headerContent}>
                    <h1 className={styles.logo}>
                        Policy Lens AI
                    </h1>
                    <p className={styles.subtitle}>
                        AI-powered policy analysis tailored to your profile
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className={styles.main}>
                <div className="container">

                    {/* Progress Indicator */}
                    {step < 3 && (
                        <div className={styles.progress}>
                            <div className={`${styles.progressStep} ${step >= 1 ? styles.progressStepActive : ''}`}>
                                <div className={styles.progressNumber}>1</div>
                                <div className={styles.progressLabel}>Policy</div>
                            </div>
                            <div className={styles.progressLine}></div>
                            <div className={`${styles.progressStep} ${step >= 2 ? styles.progressStepActive : ''}`}>
                                <div className={styles.progressNumber}>2</div>
                                <div className={styles.progressLabel}>Profile</div>
                            </div>
                            <div className={styles.progressLine}></div>
                            <div className={`${styles.progressStep} ${step >= 3 ? styles.progressStepActive : ''}`}>
                                <div className={styles.progressNumber}>3</div>
                                <div className={styles.progressLabel}>Results</div>
                            </div>
                        </div>
                    )}

                    {/* Step Content */}
                    {step === 1 && <PolicyInput onPolicySubmit={handlePolicySubmit} />}

                    {step === 2 && !loading && (
                        <UserProfile onProfileSubmit={handleProfileSubmit} onBack={handleBack} />
                    )}

                    {loading && (
                        <div className={styles.loadingContainer}>
                            <div className="spinner"></div>
                            <h3 className={styles.loadingTitle}>Analyzing Policy...</h3>
                            <p className={styles.loadingText}>
                                Our AI is reading the policy and generating your personalized analysis.
                                This may take 10-30 seconds.
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className={styles.errorContainer}>
                            <div className={styles.errorIcon}>⚠️</div>
                            <h3 className={styles.errorTitle}>Analysis Failed</h3>
                            <p className={styles.errorText}>{error}</p>
                            <button className="btn btn-primary" onClick={handleBack}>
                                Try Again
                            </button>
                        </div>
                    )}

                    {step === 3 && analysisResults && (
                        <ResultsDisplay results={analysisResults} onStartOver={handleStartOver} />
                    )}
                </div>
            </main>

            {/* Important Notice - moved to bottom */}
            <div className="container">
                <Disclaimer />
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className="container">
                    <p className={styles.footerText}>
                        Policy Lens AI • For educational purposes only
                    </p>
                </div>
            </footer>
        </div>
    );
}
