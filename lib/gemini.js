/**
 * Gemini AI Client
 * Handles communication with Google Gemini API for policy analysis
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate the master LLM prompt for policy analysis
 * @param {string} policyText - The policy text to analyze
 * @param {object} userProfile - User profile information
 * @returns {string} Formatted prompt
 */
function generatePrompt(policyText, userProfile) {
    return `You are an expert public policy analyst and civic educator.

Your task is to analyze a public policy and explain its impact in a way that is:
- Simple
- Neutral
- Personalized
- Explainable
- Non-political
- Non-advisory

IMPORTANT RULES:
- Do NOT promote or oppose the policy.
- Do NOT give legal, financial, or medical advice.
- Focus on understanding and awareness.
- Clearly state uncertainty where applicable.

POLICY TEXT:
<<<
${policyText}
>>>

USER PROFILE:
- Age Group: ${userProfile.ageGroup}
- Occupation: ${userProfile.occupation}
- Income Range: ${userProfile.incomeRange || 'Not specified'}
- Location Type: ${userProfile.locationType}
- Sector: ${userProfile.sector}

TASKS:
1. Explain the policy in plain language (max 150 words).
2. Explain how this policy specifically affects this user.
3. List 3 potential benefits relevant to this user.
4. List 3 possible drawbacks or concerns.
5. Describe short-term vs long-term impact.
6. Suggest 2 practical, non-prescriptive actions the user can consider.

OUTPUT FORMAT (STRICT JSON):
{
  "policy_summary": "",
  "personal_impact": "",
  "benefits": [],
  "drawbacks": [],
  "short_term_impact": "",
  "long_term_impact": "",
  "user_actions": []
}`;
}

/**
 * Analyze policy using Gemini AI
 * @param {string} policyText - The policy text to analyze (optional if pdfData is provided)
 * @param {object} userProfile - User profile information
 * @param {string} [pdfData] - Base64 encoded PDF data (optional)
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function analyzePolicyWithGemini(policyText, userProfile, pdfData = null) {
    try {
        // Validate inputs
        if ((!policyText || policyText.trim().length < 10) && !pdfData) {
            return {
                success: false,
                error: 'Please provide either policy text or a PDF file.'
            };
        }

        if (!userProfile || !userProfile.ageGroup || !userProfile.occupation) {
            return {
                success: false,
                error: 'User profile is incomplete. Please provide age group and occupation.'
            };
        }

        // Get the Gemini model (using Gemini 2.5 Flash)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Generate the prompt
        const promptText = generatePrompt(policyText || 'Refer to the attached PDF document for the policy content.', userProfile);

        // Prepare content parts
        const parts = [promptText];

        // Add PDF data if available
        if (pdfData) {
            parts.push({
                inlineData: {
                    data: pdfData,
                    mimeType: 'application/pdf'
                }
            });
        }

        // Call Gemini API
        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        let analysisData;
        try {
            // Extract JSON from markdown code blocks if present
            const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
            const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;

            analysisData = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            return {
                success: false,
                error: 'Failed to parse AI response. Please try again.'
            };
        }

        // Validate response structure
        const requiredFields = [
            'policy_summary',
            'personal_impact',
            'benefits',
            'drawbacks',
            'short_term_impact',
            'long_term_impact',
            'user_actions'
        ];

        const missingFields = requiredFields.filter(field => !analysisData[field]);
        if (missingFields.length > 0) {
            console.error('Missing fields in AI response:', missingFields);
            return {
                success: false,
                error: 'AI response is incomplete. Please try again.'
            };
        }

        // Validate array fields
        if (!Array.isArray(analysisData.benefits) || analysisData.benefits.length === 0) {
            analysisData.benefits = ['Analysis pending - please try again'];
        }
        if (!Array.isArray(analysisData.drawbacks) || analysisData.drawbacks.length === 0) {
            analysisData.drawbacks = ['Analysis pending - please try again'];
        }
        if (!Array.isArray(analysisData.user_actions) || analysisData.user_actions.length === 0) {
            analysisData.user_actions = ['Stay informed about policy updates'];
        }

        return {
            success: true,
            data: analysisData
        };

    } catch (error) {
        console.error('Gemini API error:', error);

        // Handle specific error types
        let errorMessage = 'Failed to analyze policy. ';

        if (error.message.includes('API key')) {
            errorMessage += 'Invalid API key configuration.';
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            errorMessage += 'API quota exceeded. Please try again later.';
        } else if (error.message.includes('timeout')) {
            errorMessage += 'Request timed out. Please try again.';
        } else {
            errorMessage += 'Please try again or contact support if the issue persists.';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}
