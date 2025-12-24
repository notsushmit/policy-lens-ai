/**
 * Disclaimer Component
 * Displays responsible AI notice about the nature of AI-generated analysis
 */

import styles from './Disclaimer.module.css';

export default function Disclaimer() {
    return (
        <div className={styles.disclaimer}>
            <div className={styles.icon}>ℹ️</div>
            <div className={styles.content}>
                <strong>Important Notice:</strong> This analysis is AI-generated to support understanding
                and civic awareness. It does not replace professional, legal, financial, or medical advice.
                The information provided is for educational purposes only.
            </div>
        </div>
    );
}
