import { baseMetadata } from "@/app/base-metadata";
import { type Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Privacy Policy - CNC Share",
  description:
    "Read our Privacy Policy to learn how we collect, use, and protect your information.",
};

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <div className="typography max-w-prose">
        <h1>Privacy Policy</h1>
        <p>
          <em>Effective Date: February 11th, 2025</em>
        </p>
        <p>
          At CNCShare, your privacy is a priority. This Privacy Policy explains
          how we collect, use, and safeguard your information when you visit our
          website, <a href="https://cnc-share.com">cnc-share.com</a>. By using
          our site, you agree to this policy.
        </p>
        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            <strong>Personal Data:</strong> We may collect personal details such
            as your name, email address, and any other information you
            voluntarily provide (e.g., when you sign up or contact us).
          </li>
          <li>
            <strong>Non-Personal Data:</strong> We automatically gather
            non-identifying information including your IP address, browser type,
            device details, and usage data via cookies and similar tracking
            technologies.
          </li>
        </ul>
        <h2>2. How We Use Your Information</h2>
        <p>We use the collected data to:</p>
        <ul>
          <li>Provide and maintain our services.</li>
          <li>Enhance and personalize your user experience.</li>
          <li>Communicate updates, promotions, or relevant information.</li>
          <li>
            Analyze site usage to help us improve our website and services.
          </li>
        </ul>
        <h2>3. Third-Party Services</h2>
        <p>
          We work with trusted third-party providers to support our website’s
          functionality. This includes (but is not limited to):
        </p>
        <ul>
          <li>
            <strong>Google Ads:</strong> We use Google Ads to display relevant
            advertising. Google may use cookies to collect data about your
            browsing behavior for ad personalization. For more information,
            please review{" "}
            <a href="https://policies.google.com/privacy">
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Database Providers:</strong> Our upstream database providers
            help us securely manage and store data. These partners process data
            solely on our behalf and are contractually obligated to protect your
            information.
          </li>
        </ul>
        <h2>4. Data Sharing and Disclosure</h2>
        <p>
          We do <strong>not</strong> sell, trade, or otherwise transfer your
          personal information to third parties for their own use. Any sharing
          of data is strictly for operational purposes (such as with the
          third-party services noted above) or as required by law.
        </p>
        <h2>5. Data Security</h2>
        <p>
          We implement reasonable technical and organizational measures to
          protect your information from unauthorized access, alteration,
          disclosure, or destruction. However, no online method is entirely
          secure, so while we strive to protect your data, we cannot guarantee
          its absolute security.
        </p>
        <h2>6. Cookies and Tracking Technologies</h2>
        <p>
          Our website uses cookies and similar technologies to improve your
          experience and analyze site traffic. Most browsers automatically
          accept cookies, but you can modify your browser settings to decline
          them. Note that disabling cookies may affect your ability to use some
          features of our website.
        </p>
        <h2>7. Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights regarding your
          personal data, such as accessing, updating, or deleting your
          information. To exercise these rights, please contact us at the
          address below.
        </p>
        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy occasionally. Any changes will be
          posted on this page with a revised effective date. We encourage you to
          review this policy periodically to stay informed about how we are
          protecting your information.
        </p>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please reach out to us:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@cnc-share.com">contact@cnc-share.com</a>
          </li>
        </ul>
        <p>
          By using CNCShare, you acknowledge that you have read and agree to
          this Privacy Policy.
        </p>
      </div>
    </div>
  );
}
