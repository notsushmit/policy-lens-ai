/**
 * Results Display Component
 * Shows the AI-generated policy analysis in a structured, easy-to-read format
 */

'use client';

import styles from './ResultsDisplay.module.css';

export default function ResultsDisplay({ results, onStartOver }) {
    if (!results) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>📊 Your Personalized Policy Analysis</h2>
                <button className="btn btn-secondary" onClick={onStartOver}>
                    ← Start Over
                </button>
            </div>

            {/* Policy Summary */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.icon}>📘</span>
                    <h3 className={styles.sectionTitle}>Policy Summary</h3>
                </div>
                <p className={styles.text}>{results.policy_summary}</p>
            </section>

            {/* Personal Impact */}
            <section className={`${styles.section} ${styles.highlight}`}>
                <div className={styles.sectionHeader}>
                    <span className={styles.icon}>👤</span>
                    <h3 className={styles.sectionTitle}>How This Affects You</h3>
                </div>
                <p className={styles.text}>{results.personal_impact}</p>
            </section>

            {/* Benefits vs Drawbacks */}
            <div className={styles.grid}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.icon}>✅</span>
                        <h3 className={styles.sectionTitle}>Potential Benefits</h3>
                    </div>
                    <ul className={styles.list}>
                        {results.benefits.map((benefit, index) => (
                            <li key={index} className={styles.listItem}>
                                <span className={styles.bullet}>•</span>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.icon}>⚠️</span>
                        <h3 className={styles.sectionTitle}>Possible Concerns</h3>
                    </div>
                    <ul className={styles.list}>
                        {results.drawbacks.map((drawback, index) => (
                            <li key={index} className={styles.listItem}>
                                <span className={styles.bullet}>•</span>
                                {drawback}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Timeline Impact */}
            <div className={styles.grid}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.icon}>⏱️</span>
                        <h3 className={styles.sectionTitle}>Short-Term Impact</h3>
                    </div>
                    <p className={styles.text}>{results.short_term_impact}</p>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.icon}>⏳</span>
                        <h3 className={styles.sectionTitle}>Long-Term Impact</h3>
                    </div>
                    <p className={styles.text}>{results.long_term_impact}</p>
                </section>
            </div>

            {/* User Actions */}
            <section className={`${styles.section} ${styles.actions}`}>
                <div className={styles.sectionHeader}>
                    <span className={styles.icon}>💡</span>
                    <h3 className={styles.sectionTitle}>What You Can Consider</h3>
                </div>
                <ul className={styles.list}>
                    {results.user_actions.map((action, index) => (
                        <li key={index} className={styles.listItem}>
                            <span className={styles.bullet}>→</span>
                            {action}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
