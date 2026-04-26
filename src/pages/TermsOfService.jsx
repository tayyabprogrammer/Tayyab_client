import React from 'react'

const TermsOfService = () => {
  return (
    <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-gray-400 mt-2">Effective Date: April 25, 2026</p>
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By using the TikTok Sentiment Analyzer, you agree to these Terms. If you disagree, please do not use our Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
              <p>We provide AI-powered sentiment analysis for TikTok videos you've liked, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Sentiment classification (Positive, Negative, Neutral)</li>
                <li>Audio transcription via Google Gemini AI</li>
                <li>Personalized mood tracking dashboards</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>You must have the legal capacity to use this service</li>
                <li>You agree not to misuse or abuse our API</li>
                <li>You are responsible for your TikTok account security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. API & Third-Party Services</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="text-white">TikTok API:</span> Subject to TikTok's Terms of Service</li>
                <li><span className="text-white">Google Gemini AI:</span> Used for transcription (subject to Google's policies)</li>
                <li>We are not liable for changes or downtime in third-party services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
              <p>We provide the service "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Termination</h2>
              <p>We reserve the right to suspend or terminate access to users who violate these terms. You may also delete your data and disconnect anytime.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Governing Law</h2>
              <p>These Terms are governed by the laws of Pakistan.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
              <p>For legal inquiries: <a href="mailto:legal@tayyabmughal.tech" className="text-purple-400 hover:underline">legal@tayyabmughal.tech</a></p>
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

export default TermsOfService
