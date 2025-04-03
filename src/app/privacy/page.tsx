export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray">
          <h2>1. Introduction</h2>
          <p>
            At Influur, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including:
          </p>
          <ul>
            <li>Account information (name, email, password)</li>
            <li>Profile information (bio, social media handles)</li>
            <li>Content you share on our platform</li>
            <li>Communication preferences</li>
            <li>Payment information</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Match you with relevant campaigns</li>
            <li>Process payments</li>
            <li>Communicate with you</li>
            <li>Ensure platform security</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>
            We share your information with:
          </p>
          <ul>
            <li>Brands you choose to work with</li>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>7. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to:
          </p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze platform usage</li>
            <li>Personalize your experience</li>
            <li>Improve our services</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>
            Our platform is not intended for children under 18.
            We do not knowingly collect information from children.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred and processed in countries outside your residence.
            We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2>10. Changes to Privacy Policy</h2>
          <p>
            We may update this policy periodically.
            We will notify you of significant changes via email or platform notification.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For privacy-related questions, please contact privacy@influur.com
          </p>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
} 