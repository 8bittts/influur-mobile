export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Influur. By accessing or using our platform, you agree to be bound by these Terms of Service.
          </p>

          <h2>2. Definitions</h2>
          <p>
            "Platform" refers to the Influur website and mobile applications.
            "Content" refers to all materials uploaded or shared through our platform.
            "User" refers to any individual or entity using our platform.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            Users must provide accurate information when creating an account.
            Users are responsible for maintaining the security of their account credentials.
            Users must be at least 18 years old to use the platform.
          </p>

          <h2>4. Content Guidelines</h2>
          <p>
            Users must have rights to all content they share.
            Content must not violate any laws or third-party rights.
            We reserve the right to remove content that violates our guidelines.
          </p>

          <h2>5. Campaign Participation</h2>
          <p>
            Users must meet specified requirements to participate in campaigns.
            Campaign deliverables must be completed within agreed timeframes.
            Payment terms are specified in individual campaign agreements.
          </p>

          <h2>6. Platform Usage</h2>
          <p>
            Users agree not to misuse or attempt to harm the platform.
            Automated access to the platform is prohibited without express permission.
            Users must not attempt to circumvent platform security measures.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            Users retain rights to their original content.
            Users grant Influur a license to use shared content for platform purposes.
            Influur's trademarks and branding may not be used without permission.
          </p>

          <h2>8. Privacy</h2>
          <p>
            User data is handled according to our Privacy Policy.
            Users consent to data collection and processing as described in the Privacy Policy.
          </p>

          <h2>9. Termination</h2>
          <p>
            We reserve the right to terminate accounts that violate these terms.
            Users may terminate their account at any time.
            Certain obligations survive account termination.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We may update these terms with notice to users.
            Continued use of the platform constitutes acceptance of updated terms.
          </p>

          <h2>11. Contact</h2>
          <p>
            For questions about these terms, please contact support@influur.com
          </p>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
} 