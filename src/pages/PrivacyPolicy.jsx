import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      
      <div className="space-y-4 text-gray-700">
        <p className="font-semibold text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>This privacy policy applies to the TikTok Sentiment Analyzer integration ("Service") operated by Tayyab Mughal.</p>
        
        <h2 className="text-xl font-semibold mt-4">1. Information We Access</h2>
        <p>When you connect your TikTok account, we access:</p>
        <ul className="list-disc ml-6 mt-2">
          <li>Your TikTok username and profile information</li>
          <li>Videos you've liked (with your explicit permission)</li>
          <li>Basic account information</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
        <p>We analyze the sentiment of your liked videos to provide insights about your content preferences. We do not share your data with third parties.</p>
        
        <h2 className="text-xl font-semibold mt-4">3. Data Storage</h2>
        <p>Your video sentiment analysis results are stored securely in MongoDB. Videos are processed temporarily and deleted after analysis.</p>
        
        <h2 className="text-xl font-semibold mt-4">4. Your Rights</h2>
        <p>You can disconnect your TikTok account at any time. To request data deletion, contact us at your-email@example.com</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
