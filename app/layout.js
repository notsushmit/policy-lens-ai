import './globals.css'

export const metadata = {
    title: 'Policy Lens AI - Understand How Policies Affect You',
    description: 'AI-powered public policy impact simulator that provides personalized, easy-to-understand analysis of how policies affect you.',
    keywords: 'policy analysis, AI, civic education, public policy, personalized impact',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
