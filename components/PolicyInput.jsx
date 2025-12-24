/**
 * Policy Input Component
 * Allows users to input policy via text, PDF upload, or example selection
 */

'use client';

import { useState } from 'react';
import { examplePolicies } from '../lib/examplePolicies';
import styles from './PolicyInput.module.css';

export default function PolicyInput({ onPolicySubmit }) {
    const [inputMethod, setInputMethod] = useState('text'); // 'text', 'pdf', 'example'
    const [policyText, setPolicyText] = useState('');
    const [selectedExample, setSelectedExample] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [error, setError] = useState('');

    const handleMethodChange = (method) => {
        setInputMethod(method);
        setError('');
        setPolicyText('');
        setPdfFile(null);
        setSelectedExample('');
    };

    const handleExampleSelect = (e) => {
        const exampleId = e.target.value;
        setSelectedExample(exampleId);

        if (exampleId) {
            const policy = examplePolicies.find(p => p.id === exampleId);
            if (policy) {
                setPolicyText(policy.text);
                setError('');
            }
        } else {
            setPolicyText('');
        }
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setError('Please upload a PDF file');
                setPdfFile(null);
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setError('PDF file must be less than 10MB');
                setPdfFile(null);
                return;
            }
            setPdfFile(file);
            setError('');
        }
    };

    const handleSubmit = () => {
        setError('');

        // Validate based on input method
        if (inputMethod === 'text' || inputMethod === 'example') {
            if (!policyText || policyText.trim().length < 200) {
                setError('Policy text must be at least 200 characters long');
                return;
            }
            onPolicySubmit({ method: inputMethod, text: policyText });
        } else if (inputMethod === 'pdf') {
            if (!pdfFile) {
                setError('Please select a PDF file');
                return;
            }
            onPolicySubmit({ method: 'pdf', file: pdfFile });
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>📄 Step 1: Choose Your Policy</h2>

            {/* Input Method Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${inputMethod === 'text' ? styles.tabActive : ''}`}
                    onClick={() => handleMethodChange('text')}
                >
                    ✍️ Paste Text
                </button>
                <button
                    className={`${styles.tab} ${inputMethod === 'pdf' ? styles.tabActive : ''}`}
                    onClick={() => handleMethodChange('pdf')}
                >
                    📎 Upload PDF
                </button>
                <button
                    className={`${styles.tab} ${inputMethod === 'example' ? styles.tabActive : ''}`}
                    onClick={() => handleMethodChange('example')}
                >
                    📚 Example Policies
                </button>
            </div>

            {/* Input Content */}
            <div className={styles.content}>
                {inputMethod === 'text' && (
                    <div className="form-group">
                        <label className="form-label">Paste Policy Text</label>
                        <textarea
                            className="form-textarea"
                            value={policyText}
                            onChange={(e) => setPolicyText(e.target.value)}
                            placeholder="Paste the full policy text here (minimum 200 characters)..."
                            rows={10}
                        />
                        <div className={styles.charCount}>
                            {policyText.length} characters {policyText.length < 200 && `(${200 - policyText.length} more needed)`}
                        </div>
                    </div>
                )}

                {inputMethod === 'pdf' && (
                    <div className="form-group">
                        <label className="form-label">Upload Policy PDF</label>
                        <div className={styles.fileUpload}>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handlePdfChange}
                                className={styles.fileInput}
                                id="pdf-upload"
                            />
                            <label htmlFor="pdf-upload" className={styles.fileLabel}>
                                {pdfFile ? (
                                    <>
                                        <span className={styles.fileName}>✓ {pdfFile.name}</span>
                                        <span className={styles.fileSize}>
                                            ({(pdfFile.size / 1024).toFixed(0)} KB)
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className={styles.uploadIcon}>📁</span>
                                        <span>Click to select PDF file (max 10MB)</span>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>
                )}

                {inputMethod === 'example' && (
                    <div className="form-group">
                        <label className="form-label">Select Example Policy</label>
                        <select
                            className="form-select"
                            value={selectedExample}
                            onChange={handleExampleSelect}
                        >
                            <option value="">-- Choose a policy --</option>
                            {examplePolicies.map((policy) => (
                                <option key={policy.id} value={policy.id}>
                                    {policy.title}
                                </option>
                            ))}
                        </select>

                        {policyText && (
                            <div className={styles.examplePreview}>
                                <div className={styles.previewLabel}>Policy Preview:</div>
                                <div className={styles.previewText}>
                                    {policyText.substring(0, 300)}...
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div className={styles.error}>
                        ⚠️ {error}
                    </div>
                )}

                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={
                        (inputMethod === 'text' && policyText.length < 200) ||
                        (inputMethod === 'pdf' && !pdfFile) ||
                        (inputMethod === 'example' && !selectedExample)
                    }
                >
                    Continue to Profile →
                </button>
            </div>
        </div>
    );
}
