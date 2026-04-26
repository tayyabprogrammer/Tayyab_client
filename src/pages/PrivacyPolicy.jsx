import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold mb-2 text-white">Privacy Policy</h1>
          <p className="text-gray-300 mb-8 border-b border-white/20 pb-4">Last updated: April 25, 2026</p>
          
          <div className="space-y-6 text-gray-200">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">1. Information We Collect</h2>
              <p>When you connect your TikTok account through our Service, we access:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Your TikTok username and public profile information</li>
                <li>Videos you have liked (only with your explicit permission)</li>
                <li>Basic account metadata such as follower count (aggregated)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">2. How We Use Your Information</h2>
              <p>We use the collected information specifically for:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Analyzing sentiment patterns in your liked TikTok videos</li>
                <li>Generating personalized insights about your content preferences</li>
                <li>Tracking mood trends over time based on video sentiment</li>
                <li>Improving our AI sentiment analysis models</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">3. Data Storage & Security</h2>
              <p>Your privacy and data security are our top priorities:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Videos are downloaded temporarily and deleted immediately after analysis (max 5 minutes retention)</li>
                <li>Only sentiment analysis results and transcriptions are stored permanently</li>
                <li>All data is encrypted at rest using AES-256 encryption</li>
                <li>We never share, sell, or trade your personal data with third parties</li>
                <li>Our database is hosted on secure MongoDB Atlas infrastructure with GDPR compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">4. Your Rights Under GDPR</h2>
              <p>As a user, you have the following rights regarding your data:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Right to Access:</strong> Request a copy of all data we hold about you</li>
                <li><strong>Right to Deletion:</strong> Request permanent deletion of your analysis history</li>
                <li><strong>Right to Rectification:</strong> Correct any inaccurate data we may have</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Right to Withdraw Consent:</strong> Disconnect TikTok account at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">5. Data Retention Policy</h2>
              <p>We retain your sentiment analysis data for:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Active users: Data retained as long as you maintain an active connection with your TikTok account</li>
                <li>Inactive users: Data is automatically deleted after 12 months of inactivity</li>
                <li>Manual deletion: You can request immediate deletion at any time via email to privacy@tayyabmughal.tech</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">6. Children's Privacy</h2>
              <p>Our Service is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete that information immediately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">7. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">8. Contact Information</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Email: privacy@tayyabmughal.tech</li>
                <li>Website: https://www.tayyabmughal.tech</li>
                <li>Response Time: Within 72 hours</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Tayyab Mughal - TikTok Sentiment Analyzer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
