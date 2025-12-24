# Policy Lens AI 🔍

An AI-powered public policy impact simulator that helps users understand how policies affect them personally using Google Gemini AI.

## 🌟 Features

- **Multiple Input Methods**: Paste policy text, upload PDF documents, or select from example policies
- **Personalized Analysis**: AI generates customized impact reports based on your demographic and professional profile
- **Comprehensive Insights**: Get policy summaries, personal impact, benefits/drawbacks, timeline analysis, and actionable suggestions
- **Modern UI**: Clean, responsive design with dark mode support and smooth animations
- **Responsible AI**: Clear disclaimers about the educational nature of AI-generated content

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google AI Studio API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\PROJECTS\Policy Lens AI"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env.local` file is already created with your API key. If you need to update it:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **Choose Your Policy**
   - Paste policy text (minimum 200 characters)
   - Upload a PDF document
   - Select from 5 example policies (Education, Climate, Healthcare, Privacy, Gig Economy)

2. **Complete Your Profile**
   - Age group
   - Occupation
   - Income range (optional)
   - Location type
   - Sector/Industry

3. **Get Your Analysis**
   - AI generates a personalized report in 10-30 seconds
   - View policy summary, personal impact, benefits, concerns, timeline, and actions

## 🏗️ Project Structure

```
policy-lens-ai/
├── app/
│   ├── api/
│   │   └── analyze-policy/
│   │       └── route.js          # API endpoint
│   ├── page.js                    # Main application
│   ├── layout.js                  # Root layout
│   └── globals.css                # Global styles
├── components/
│   ├── PolicyInput.jsx            # Policy input UI
│   ├── UserProfile.jsx            # User profile form
│   ├── ResultsDisplay.jsx         # Analysis results
│   └── Disclaimer.jsx             # Responsible AI notice
├── lib/
│   ├── gemini.js                  # Gemini API client
│   ├── pdfParser.js               # PDF text extraction
│   └── examplePolicies.js         # Example policies
├── .env.local                     # Environment variables
├── package.json
└── README.md
```

## 🤖 How AI is Used

### Technology
- **Model**: Google Gemini 1.5 Flash (free tier)
- **SDK**: `@google/generative-ai`
- **Purpose**: Analyze policy text and generate personalized impact reports

### AI Workflow

1. **Input Processing**: Policy text and user profile are validated
2. **Prompt Engineering**: A carefully crafted prompt instructs the AI to:
   - Remain neutral and non-political
   - Provide simple, explainable analysis
   - Personalize based on user demographics
   - Avoid giving legal/financial/medical advice
3. **Response Parsing**: AI output is validated and structured into sections
4. **Error Handling**: Graceful fallbacks for API failures or malformed responses

### Master Prompt Structure

The AI is instructed to:
- Explain the policy in plain language (max 150 words)
- Describe specific impact on the user
- List 3 benefits and 3 drawbacks relevant to the user
- Analyze short-term vs long-term effects
- Suggest 2 practical, non-prescriptive actions

## 🛡️ Ethical Considerations

### Responsible AI Principles

1. **Non-Advisory**: The system explicitly does NOT provide legal, financial, or medical advice
2. **Neutrality**: AI is instructed to remain politically neutral and non-persuasive
3. **Transparency**: Clear disclaimers inform users about AI-generated content
4. **Educational Purpose**: Focus on civic awareness and understanding, not decision-making
5. **Uncertainty Acknowledgment**: AI states when information is uncertain or incomplete

### Privacy & Data

- **No Database**: All analysis is ephemeral, no user data is stored
- **No Tracking**: No analytics or user tracking implemented
- **Local Processing**: User profiles are only used for the current session
- **API Security**: Gemini API key is stored in environment variables, never exposed to client

### Limitations

- Analysis is AI-generated and may contain inaccuracies
- Not a substitute for professional advice
- May not capture all nuances of complex policies
- Dependent on quality and completeness of input policy text

## 🧪 Testing

### Manual Testing Checklist

- [ ] Test text input with various policy lengths
- [ ] Upload and parse different PDF documents
- [ ] Select and analyze each example policy
- [ ] Test with different user profiles (age, occupation, sector)
- [ ] Verify same policy produces different analyses for different users
- [ ] Test error handling (empty input, invalid PDF, network errors)
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Verify dark mode appearance
- [ ] Test complete workflow in under 3 minutes

### Example Test Scenarios

1. **Student + Education Policy**: Should emphasize learning opportunities, career impact
2. **Retiree + Healthcare Policy**: Should focus on senior benefits, coverage details
3. **Gig Worker + Gig Economy Policy**: Should highlight worker rights, income effects
4. **Farmer + Climate Policy**: Should discuss agricultural impact, subsidies, sustainability

## 🎨 Design Philosophy

- **Modern & Vibrant**: Uses HSL color system with gradients and smooth animations
- **Accessible**: High contrast, readable fonts (Inter), clear hierarchy
- **Responsive**: Mobile-first design that scales to desktop
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Micro-interactions**: Hover effects, transitions, and loading states for better UX

## 📦 Production Build

To create a production build:

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.

## 🔧 Troubleshooting

### Common Issues

**API Key Error**
- Ensure `.env.local` contains valid `GEMINI_API_KEY`
- Restart dev server after changing environment variables

**PDF Parsing Fails**
- Ensure PDF contains readable text (not scanned images)
- Check file size is under 10MB
- Try a different PDF or use text input instead

**Analysis Takes Too Long**
- Large policies may take 20-30 seconds
- Check internet connection
- Gemini API may have rate limits on free tier

**Build Errors**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Ensure Node.js version is 18+

## 🤝 Contributing

This is an MVP educational project. Potential improvements:

- Add more example policies from different countries
- Support multiple languages
- Add comparison mode (analyze multiple policies)
- Export analysis as PDF
- Add citations and fact-checking
- Implement user feedback mechanism

## 📄 License

This project is for educational purposes. Use responsibly and ethically.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the policy analysis
- **Next.js** for the excellent React framework
- **pdf-parse** for PDF text extraction

---

**Built with ❤️ for civic education and awareness**

For questions or issues, please refer to the troubleshooting section or check the code comments for implementation details.
