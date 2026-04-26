import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      
      <div className="space-y-4 text-gray-700">
        <p className="font-semibold text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>By using the TikTok Sentiment Analyzer ("Service"), you agree to these terms.</p>
        
        <h2 className="text-xl font-semibold mt-4">1. Service Description</h2>
        <p>This service analyzes the sentiment of TikTok videos you've liked to provide you with insights about your content preferences.</p>
        
        <h2 className="text-xl font-semibold mt-4">2. User Consent</h2>
        <p>You explicitly consent to accessing your TikTok liked videos when you connect your account through TikTok's OAuth flow.</p>
        
        <h2 className="text-xl font-semibold mt-4">3. Data Usage</h2>
        <p>We only process videos you've liked. No videos are permanently stored. Analysis results are stored for providing insights.</p>
        
        <h2 className="text-xl font-semibold mt-4">4. Termination</h2>
        <p>You can disconnect your account at any time. We reserve the right to terminate service for violation of terms.</p>
        
        <h2 className="text-xl font-semibold mt-4">5. Contact</h2>
        <p>For questions about these terms, contact: your-email@example.com</p>
      </div>
    </div>
  );
};

export default TermsOfService;
