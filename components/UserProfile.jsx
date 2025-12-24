/**
 * User Profile Component
 * Collects user demographic and professional information for personalized analysis
 */

'use client';

import { useState } from 'react';
import styles from './UserProfile.module.css';

export default function UserProfile({ onProfileSubmit, onBack }) {
    const [profile, setProfile] = useState({
        ageGroup: '',
        occupation: '',
        incomeRange: '',
        locationType: '',
        sector: ''
    });

    const [error, setError] = useState('');

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleSubmit = () => {
        // Validate required fields
        if (!profile.ageGroup || !profile.occupation || !profile.locationType || !profile.sector) {
            setError('Please complete all required fields');
            return;
        }

        onProfileSubmit(profile);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>👤 Step 2: Tell Us About Yourself</h2>
            <p className={styles.subtitle}>
                This helps us personalize the policy analysis for your specific situation
            </p>

            <div className={styles.form}>
                <div className="form-group">
                    <label className="form-label">
                        Age Group <span className={styles.required}>*</span>
                    </label>
                    <select
                        className="form-select"
                        value={profile.ageGroup}
                        onChange={(e) => handleChange('ageGroup', e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="18-25">18-25 years</option>
                        <option value="26-35">26-35 years</option>
                        <option value="36-45">36-45 years</option>
                        <option value="46-55">46-55 years</option>
                        <option value="56-65">56-65 years</option>
                        <option value="65+">65+ years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Occupation <span className={styles.required}>*</span>
                    </label>
                    <select
                        className="form-select"
                        value={profile.occupation}
                        onChange={(e) => handleChange('occupation', e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee (Salaried)</option>
                        <option value="Self-Employed">Self-Employed / Business Owner</option>
                        <option value="Freelancer">Freelancer / Gig Worker</option>
                        <option value="Unemployed">Unemployed / Job Seeker</option>
                        <option value="Retired">Retired</option>
                        <option value="Homemaker">Homemaker</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Income Range <span className={styles.optional}>(Optional)</span>
                    </label>
                    <select
                        className="form-select"
                        value={profile.incomeRange}
                        onChange={(e) => handleChange('incomeRange', e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="Below ₹3 lakh">Below ₹3 lakh/year</option>
                        <option value="₹3-6 lakh">₹3-6 lakh/year</option>
                        <option value="₹6-10 lakh">₹6-10 lakh/year</option>
                        <option value="₹10-15 lakh">₹10-15 lakh/year</option>
                        <option value="₹15-25 lakh">₹15-25 lakh/year</option>
                        <option value="Above ₹25 lakh">Above ₹25 lakh/year</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Location Type <span className={styles.required}>*</span>
                    </label>
                    <select
                        className="form-select"
                        value={profile.locationType}
                        onChange={(e) => handleChange('locationType', e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="Urban - Metro">Urban - Metro City</option>
                        <option value="Urban - Tier 2/3">Urban - Tier 2/3 City</option>
                        <option value="Semi-Urban">Semi-Urban</option>
                        <option value="Rural">Rural</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Sector / Industry <span className={styles.required}>*</span>
                    </label>
                    <select
                        className="form-select"
                        value={profile.sector}
                        onChange={(e) => handleChange('sector', e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Technology / IT">Technology / IT</option>
                        <option value="Finance / Banking">Finance / Banking</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Retail / E-commerce">Retail / E-commerce</option>
                        <option value="Transportation">Transportation / Logistics</option>
                        <option value="Construction">Construction / Real Estate</option>
                        <option value="Government">Government / Public Sector</option>
                        <option value="Non-Profit">Non-Profit / NGO</option>
                        <option value="Media / Entertainment">Media / Entertainment</option>
                        <option value="Hospitality / Tourism">Hospitality / Tourism</option>
                        <option value="Energy">Energy / Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {error && (
                    <div className={styles.error}>
                        ⚠️ {error}
                    </div>
                )}

                <div className={styles.actions}>
                    <button className="btn btn-secondary" onClick={onBack}>
                        ← Back
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!profile.ageGroup || !profile.occupation || !profile.locationType || !profile.sector}
                    >
                        Analyze Policy 🔍
                    </button>
                </div>
            </div>
        </div>
    );
}
