import React from 'react'

const TermsOfService = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold mb-2 text-white">Terms of Service</h1>
          <p className="text-gray-300 mb-8 border-b border-white/20 pb-4">Effective Date: April 25, 2026</p>
          
          <div className="space-y-6 text-gray-200">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">1. Acceptance of Terms</h2>
              <p>By accessing or using the TikTok Sentiment Analyzer Service ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service. These terms apply to all users, visitors, and others who access the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">2. Description of Service</h2>
              <p>The TikTok Sentiment Analyzer provides users with:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Sentiment analysis of TikTok videos you've liked (Positive, Negative, Neutral classification)</li>
                <li>AI-powered transcription of audio content from your liked videos</li>
                <li>Mood tracking and trend analysis over time</li>
                <li>Personalized content insights and recommendations based on sentiment patterns</li>
                <li>Data visualization dashboards showing your emotional engagement with content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">3. User Consent & Authorization</h2>
              <p>By connecting your TikTok account to our Service:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>You explicitly authorize us to access your TikTok liked videos</li>
                <li>You consent to our AI models analyzing video content and audio</li>
                <li>You understand that videos are temporarily downloaded for analysis and then deleted</li>
                <li>You agree to TikTok's Terms of Service and Developer Policies</li>
                <li>You confirm you have the legal capacity to enter into these terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">4. API Usage & Rate Limits</h2>
              <p>Our Service uses third-party APIs (TikTok Open API, Google Gemini AI):</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>We adhere strictly to TikTok's API rate limits to ensure service stability</li>
                <li>Google Gemini API is used for sentiment analysis and transcription (Gemini 3.1 Flash-Lite model)</li>
                <li>Free tier limits may apply: approximately 500 requests per day per user</li>
                <li>We are not responsible for API downtime or changes from third-party providers</li>
                <li>We reserve the right to implement additional rate limiting to ensure fair usage for all users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">5. User Responsibilities</h2>
              <p>As a user of our Service, you agree that:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>You will not use the Service for any illegal or unauthorized purpose</li>
                <li>You will not attempt to reverse engineer, decompile, or extract source code from our systems</li>
                <li>You will not use automated scripts or bots to interact with our APIs without permission</li>
                <li>You will not share your TikTok credentials with third parties</li>
                <li>You are responsible for maintaining the security of your TikTok account connection</li>
                <li>You will immediately disconnect your account if you suspect unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">6. Intellectual Property Rights</h2>
              <p>Ownership of content and our Service:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>TikTok Videos:</strong> All TikTok videos remain the property of their original creators</li>
                <li><strong>Our Service:</strong> The sentiment analysis algorithms, dashboard design, and code are our intellectual property</li>
                <li><strong>Analysis Results:</strong> Sentiment analysis outputs belong to you, but we retain the right to anonymized, aggregated data for service improvement</li>
                <li><strong>AI Models:</strong> Transcripts are generated by Google Gemini AI and are subject to Google's Terms of Service</li>
                <li>You may not copy, modify, or distribute our code or dashboard designs without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">7. Disclaimer of Warranties</h2>
              <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>The Service will function uninterrupted, secure, or available at any particular time</li>
                <li>Sentiment analysis results will be 100% accurate (AI models may have errors)</li>
                <li>Transcription quality will be perfect (accuracy depends on audio quality)</li>
                <li>We will be liable for any indirect, incidental, or consequential damages</li>
                <li>Service will be compatible with all versions of TikTok or third-party services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">8. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, in no event shall we be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">9. Termination & Suspension</h2>
              <p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately. You can also terminate by disconnecting your TikTok account from our Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">10. Modifications to Terms</h2>
              <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">11. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively in the courts of Pakistan.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-white">12. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Email: legal@tayyabmughal.tech</li>
                <li>Website: https://www.tayyabmughal.tech</li>
                <li>For urgent matters: Response within 48 hours</li>
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

export default TermsOfService
