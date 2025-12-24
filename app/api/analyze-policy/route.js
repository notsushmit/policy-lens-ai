/**
 * Policy Analysis API Endpoint
 * POST /api/analyze-policy
 * 
 * Accepts policy text and user profile, returns AI-generated analysis
 */

import { NextResponse } from 'next/server';
import { analyzePolicyWithGemini } from '../../../lib/gemini';

// Helper to validate PDF size (max 10MB)
function validatePDFSize(fileSize) {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    return fileSize <= MAX_SIZE;
}

export async function POST(request) {
    try {
        // Parse request body
        const formData = await request.formData();

        // Extract fields
        const inputMethod = formData.get('inputMethod'); // 'text', 'pdf', or 'example'
        let policyText = formData.get('policyText');
        const pdfFile = formData.get('pdfFile');

        // Extract user profile
        const userProfile = {
            ageGroup: formData.get('ageGroup'),
            occupation: formData.get('occupation'),
            incomeRange: formData.get('incomeRange'),
            locationType: formData.get('locationType'),
            sector: formData.get('sector')
        };

        // Validate user profile
        if (!userProfile.ageGroup || !userProfile.occupation || !userProfile.locationType || !userProfile.sector) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Please complete all required profile fields (age group, occupation, location type, and sector)'
                },
                { status: 400 }
            );
        }

        // Handle PDF input
        let pdfBase64 = null;
        if (inputMethod === 'pdf' && pdfFile) {
            // Validate file size
            if (!validatePDFSize(pdfFile.size)) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'PDF file is too large. Maximum size is 10MB.'
                    },
                    { status: 400 }
                );
            }

            // Convert PDF to base64 for Gemini Multimodal
            const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
            pdfBase64 = pdfBuffer.toString('base64');

            // We no longer extract text locally, relying on Gemini's multimodal capabilities
            policyText = null;
        }

        // Validate policy text (only if not using PDF)
        if (!pdfBase64 && (!policyText || policyText.trim().length < 200)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Policy text must be at least 200 characters long. Please provide more detailed policy content.'
                },
                { status: 400 }
            );
        }

        // Limit policy text length to prevent token issues (max ~100k characters)
        if (policyText && policyText.length > 100000) {
            policyText = policyText.substring(0, 100000);
            console.warn('Policy text truncated to 100k characters to prevent token limit issues');
        }

        // Call Gemini API for analysis
        const analysisResult = await analyzePolicyWithGemini(policyText, userProfile, pdfBase64);

        if (!analysisResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: analysisResult.error
                },
                { status: 500 }
            );
        }

        // Return successful analysis
        return NextResponse.json({
            success: true,
            data: analysisResult.data
        });

    } catch (error) {
        console.error('API endpoint error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'An unexpected error occurred. Please try again.'
            },
            { status: 500 }
        );
    }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
