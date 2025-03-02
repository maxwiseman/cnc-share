import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - CNC Share",
  description:
    "Read our Terms of Service to learn about the rules and guidelines for using CNC Share.",
};

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <div className="typography max-w-prose">
        <h1>Terms of Service</h1>
        <p>
          <em>Effective Date: February 11th, 2025</em>
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using CNCShare (the &quot;Website&quot;) at{" "}
          <a href="https://cnc-share.com">cnc-share.com</a>, you agree to be
          bound by these Terms of Service (&quot;Terms&quot;) and our Privacy
          Policy. If you do not agree to these Terms, please do not use the
          Website.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms at any time
          without prior notice. Your continued use of the Website after any
          changes constitutes your acceptance of the new Terms.
        </p>

        <h2>3. Use of the Website</h2>
        <p>
          You agree to use the Website only for lawful purposes and in a manner
          that does not infringe the rights of or restrict or inhibit anyone
          else&apos;s use of the Website. You are responsible for any activity
          that occurs under your account, if applicable.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on CNCShare, including but not limited to text, graphics,
          logos, images, and software, is the property of CNCShare or its
          licensors and is protected by applicable intellectual property laws.
          You may not reproduce, distribute, modify, or create derivative works
          without our express written permission.
        </p>

        <h2>5. User-Generated Content</h2>
        <p>
          If you contribute content to the Website (e.g., comments, posts,
          uploads), you grant CNCShare a non-exclusive, worldwide, royalty-free
          license to use, reproduce, modify, and distribute such content in
          connection with the Website and our business operations.
        </p>

        <h2>6. Third-Party Links and Services</h2>
        <p>
          The Website may include links to third-party websites, services, or
          resources (including, for example, Google Ads and upstream database
          providers). CNCShare does not control these third-party sites and is
          not responsible for their content or practices. Your interactions with
          these sites are solely between you and the third party.
        </p>

        <h2>7. Disclaimers and Limitation of Liability</h2>
        <p>
          The Website is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without any warranties of any kind, either
          express or implied. CNCShare does not guarantee that the Website will
          be uninterrupted, error-free, or free of viruses or other harmful
          components. In no event shall CNCShare be liable for any direct,
          indirect, incidental, special, or consequential damages arising out of
          or in connection with your use of the Website.
        </p>

        <h2>8. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to the
          Website at any time, without notice, for any reason, including a
          violation of these Terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Insert Jurisdiction]. Any disputes arising from these Terms
          or your use of the Website shall be resolved in the appropriate courts
          located in that jurisdiction.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@cnc-share.com">contact@cnc-share.com</a>
          </li>
        </ul>

        <p>
          By using CNCShare, you acknowledge that you have read and agree to
          these Terms of Service.
        </p>
      </div>
    </div>
  );
}
