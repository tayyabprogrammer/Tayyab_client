import React from 'react'

const PrivacyPolicy = () => {
  return (
    // Removed min-h-screen and added relative z-index to stay above background
    <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Dark Card with Shadow - No transparency needed */}
        <div className="bg-[#0a0a0a]/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400 mt-2">Last Updated: April 25, 2026</p>
          </div>

          {/* Content with consistent dark theme */}
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
              <p>When you connect your TikTok account, we securely access:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Your TikTok username and public profile information</li>
                <li>Videos you've liked (with your explicit permission)</li>
                <li>Basic account metadata for analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Data</h2>
              <p>We use the collected information to provide you with personalized insights:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Sentiment analysis of your liked TikTok videos</li>
                <li>Mood tracking and trend analysis over time</li>
                <li>Improving our AI sentiment models (anonymously)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Data Storage & Security</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Videos are temporarily downloaded (max 5 min) and immediately deleted</li>
                <li>Only sentiment results and transcriptions are stored permanently</li>
                <li>Data is encrypted using AES-256 at rest</li>
                <li>We never share or sell your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Your Rights (GDPR Compliant)</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="text-white">Right to Access:</span> Request your data copy</li>
                <li><span className="text-white">Right to Deletion:</span> Permanently delete your analysis history</li>
                <li><span className="text-white">Right to Withdraw:</span> Disconnect TikTok anytime</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Contact Us</h2>
              <p>📧 <a href="mailto:privacy@tayyabmughal.tech" className="text-purple-400 hover:underline">privacy@tayyabmughal.tech</a></p>
              <p>🌐 <a href="https://www.tayyabmughal.tech" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">www.tayyabmughal.tech</a></p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Tayyab Mughal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
