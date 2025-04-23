// src/components/PrivacyPolicy.js

import React from "react";
import "./termprivacy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>

      <h2>Data Collection and Use:</h2>
      <p>
        1. The admin panel may collect personal information from administrators,
        including names, contact details, and login information, solely for
        managing access and usage.
      </p>
      <p>
        2. Any data collected within the admin panel related to users of the app
        will be managed in accordance with the company’s general privacy policy.
      </p>

      <h2>Data Security:</h2>
      <p>
        1. The company employs industry-standard security measures to protect
        data stored in the admin panel.
      </p>
      <p>
        2. Administrators are required to follow best practices for data
        security, including regular password updates and avoiding sharing login
        credentials.
      </p>

      <h2>Data Access and Sharing:</h2>
      <p>
        1. Access to data within the admin panel is restricted to authorized
        personnel based on their roles and responsibilities.
      </p>
      <p>
        2. The company will not share personal data accessed through the admin
        panel with third parties unless required by law or with the explicit
        consent of the data subjects.
      </p>

      <h2>Data Retention:</h2>
      <p>
        1. Data within the admin panel is retained only as long as necessary for
        the purposes it was collected for or as required by law.
      </p>
      <p>
        2. Administrators are responsible for ensuring that unnecessary or
        outdated data is appropriately archived or deleted.
      </p>

      <h2>Administrator Rights:</h2>
      <p>
        1. Administrators have the right to access, correct, or request the
        deletion of their personal data held by the company.
      </p>
      <p>
        2. Any concerns or requests regarding personal data can be directed to
        the company’s data protection officer.
      </p>

      <p>
        These terms and policies help ensure that the admin panel is used
        responsibly and that data privacy and security are maintained.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
