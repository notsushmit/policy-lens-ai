/**
 * Example Public Policies for Policy Lens AI
 * These are predefined policies users can select for quick analysis
 */

export const examplePolicies = [
    {
        id: "nep-2020",
        title: "National Education Policy 2020 (India)",
        text: `The National Education Policy 2020 (NEP 2020) is a comprehensive framework for elementary education to higher education as well as vocational training in both rural and urban India. The policy replaces the previous National Policy on Education, 1986.

Key Highlights:
- Universal access to education from pre-primary to secondary level with 100% Gross Enrolment Ratio (GER) in school education by 2030
- New curricular and pedagogical structure (5+3+3+4) replacing the 10+2 system
- No rigid separation between academic streams, extracurricular, vocational streams in schools
- Emphasis on foundational literacy and numeracy, no rigid separation of subjects
- Multiple entry and exit points in higher education with appropriate certification
- Discontinuation of MPhil programmes
- Introduction of a four-year multidisciplinary Bachelor's programme with multiple exit options
- Increase in public investment in Education sector to reach 6% of GDP
- Establishment of National Research Foundation to fund outstanding peer-reviewed research
- Light but tight regulation for both public and private higher education institutions with a single regulator
- Emphasis on technology use and integration of education
- Promotion of Indian languages, arts and culture in education
- Focus on teacher training and continuing professional development
- Vocational education to start from Class 6 with internships
- New National Curricular Framework for Teacher Education, NCFTE 2021
- School complexes/clusters will be the basic unit of governance`
    },
    {
        id: "climate-action",
        title: "Climate Action and Green Energy Initiative",
        text: `The Climate Action and Green Energy Initiative is a comprehensive policy framework aimed at reducing carbon emissions and transitioning to renewable energy sources.

Key Provisions:
- Mandate for 40% renewable energy in the national grid by 2030
- Carbon tax of $50 per ton on industrial emissions starting 2025
- Subsidies for electric vehicle purchases up to $7,500 per vehicle
- Ban on new coal power plant construction from 2024
- Investment of $500 billion in green infrastructure over 10 years
- Requirement for all new buildings to be net-zero energy by 2028
- Incentives for home solar panel installation with 30% tax credit
- Phase-out of single-use plastics by 2026
- Expansion of public transportation with electric buses and trains
- Creation of 2 million green jobs in renewable energy sector
- Mandatory energy efficiency standards for appliances and vehicles
- Protection and expansion of forest cover by 20% over next decade
- Research funding for carbon capture and storage technologies
- International cooperation on climate change mitigation
- Climate education integration in school curricula
- Support for farmers transitioning to sustainable agriculture practices
- Coastal protection and climate resilience infrastructure
- Water conservation and management programs
- Penalties for companies exceeding emission limits
- Annual climate impact assessments for all major industries`
    },
    {
        id: "universal-healthcare",
        title: "Universal Healthcare Access Act",
        text: `The Universal Healthcare Access Act establishes a comprehensive healthcare system ensuring medical coverage for all citizens regardless of income, employment status, or pre-existing conditions.

Core Components:
- Free primary healthcare services at government health centers
- Subsidized specialist care based on income levels (0-80% subsidy)
- Coverage for preventive care, diagnostics, hospitalization, and emergency services
- Prescription drug price caps and generic medication promotion
- Mental health services included with same coverage as physical health
- Dental and vision care for children under 18 and seniors over 65
- Maternity and newborn care fully covered
- Annual health checkups free for all citizens
- Telemedicine services integrated into healthcare system
- Rural healthcare infrastructure expansion with mobile clinics
- Healthcare worker training programs and increased medical school seats
- Electronic health records system for continuity of care
- Maximum out-of-pocket expense cap of $2,000 per year per family
- No lifetime or annual coverage limits
- Prohibition of coverage denial based on pre-existing conditions
- Waiting time reduction targets for non-emergency procedures
- Quality standards and accreditation for all healthcare facilities
- Patient rights charter and complaint redressal mechanism
- Public health campaigns for disease prevention
- Funding through progressive taxation and healthcare levy on high earners`
    },
    {
        id: "digital-privacy",
        title: "Digital Privacy and Data Protection Act",
        text: `The Digital Privacy and Data Protection Act establishes comprehensive rules for how organizations collect, use, store, and share personal data in the digital age.

Key Provisions:
- Right to know what personal data is being collected and how it's used
- Right to access, correct, and delete personal data held by organizations
- Requirement for explicit consent before collecting sensitive personal information
- Prohibition of selling personal data without clear user consent
- Data breach notification within 72 hours to affected individuals
- Right to data portability - transfer data between service providers
- Privacy by design - default settings must be privacy-protective
- Age verification and parental consent for users under 16
- Restrictions on automated decision-making and profiling
- Clear, understandable privacy policies in plain language
- Data minimization - collect only necessary information
- Regular privacy impact assessments for high-risk processing
- Independent Data Protection Authority with enforcement powers
- Significant fines for violations - up to 4% of annual revenue
- Cross-border data transfer restrictions to ensure protection
- Employee data protection rights in workplace
- Biometric data special protections and consent requirements
- Right to object to direct marketing and opt-out easily
- Data retention limits - deletion after purpose fulfilled
- Mandatory data protection officers for large organizations
- Privacy training requirements for employees handling data
- Whistleblower protections for reporting privacy violations
- Regular audits and compliance certifications
- Consumer education programs on digital privacy rights`
    },
    {
        id: "gig-worker-rights",
        title: "Gig Economy Worker Rights and Benefits Act",
        text: `The Gig Economy Worker Rights and Benefits Act extends labor protections and benefits to workers in the gig economy, including ride-share drivers, delivery workers, and freelance platform workers.

Main Features:
- Classification framework distinguishing employees, contractors, and gig workers
- Minimum earnings guarantee of $15 per hour of active work
- Health insurance subsidies for gig workers working 15+ hours per week
- Paid sick leave accrual - 1 hour per 30 hours worked
- Workers' compensation coverage for on-the-job injuries
- Right to organize and collective bargaining for gig workers
- Anti-discrimination protections equal to traditional employees
- Transparency in algorithmic management and deactivation processes
- Appeal rights for account suspension or termination
- Occupational accident insurance provided by platforms
- Retirement savings plan options with platform contribution matching
- Equipment and expense reimbursement for work-related costs
- Protection against retaliation for exercising rights
- Data privacy rights regarding worker performance data
- Flexibility preservation - workers maintain schedule control
- Platform fee transparency and earnings breakdown
- Waiting time compensation for delayed assignments
- Right to reject assignments without penalty
- Safety standards for delivery and transportation workers
- Training and upskilling programs funded by platforms
- Portable benefits system across multiple platforms
- Independent dispute resolution mechanism
- Regular review of classification criteria every 3 years
- Enforcement through labor department with complaint system`
    }
];

/**
 * Get policy by ID
 * @param {string} id - Policy ID
 * @returns {object|null} Policy object or null if not found
 */
export function getPolicyById(id) {
    return examplePolicies.find(policy => policy.id === id) || null;
}

/**
 * Get all policy titles and IDs for selection UI
 * @returns {Array} Array of {id, title} objects
 */
export function getPolicyList() {
    return examplePolicies.map(({ id, title }) => ({ id, title }));
}
