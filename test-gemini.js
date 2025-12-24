/**
 * Test script to verify Gemini API connectivity
 * Run with: node test-gemini.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') });

async function testGeminiAPI() {
    try {
        console.log('Testing Gemini API connection...\n');

        // Check if API key exists
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('❌ ERROR: GEMINI_API_KEY not found in .env.local');
            process.exit(1);
        }

        console.log('✓ API Key found (length:', apiKey.length, ')');

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        console.log('✓ Gemini client initialized');
        console.log('\nSending test prompt...\n');

        // Test with a simple prompt
        const result = await model.generateContent('Say "Hello, the API is working!" in JSON format with a key "message".');
        const response = await result.response;
        const text = response.text();

        console.log('✓ API Response received:\n');
        console.log(text);
        console.log('\n✅ SUCCESS: Gemini API is working correctly!');

    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

testGeminiAPI();
