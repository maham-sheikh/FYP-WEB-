// src/components/TermsOfUse.js

import React from "react";
import './termprivacy.css'; 

const TermsOfUse = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Terms of Use</h1>
      <h2>Access and Authorization:</h2>
      <p>1. Only authorized personnel are allowed access to the admin panel.</p>
      <p>
        2. Users must maintain the confidentiality of their login credentials
        and notify the company immediately if they suspect unauthorized access.
      </p>
      <p>
        3. Any unauthorized attempt to access the admin panel may result in
        disciplinary action, including termination and legal consequences.
      </p>

      <h2>Usage Guidelines:</h2>
      <p>
        1. The admin panel is to be used solely for managing the application,
        its users, services, and related data.
      </p>
      <p>
        2. Administrators must comply with all relevant laws and company
        policies while using the panel.
      </p>
      <p>
        3. Misuse of the panel, including altering, deleting, or mismanaging
        data without proper authorization, is strictly prohibited.
      </p>

      <h2>Data Management:</h2>
      <p>
        1. Administrators are responsible for ensuring that the data they input,
        update, or delete is accurate and complies with the company's data
        policies.
      </p>
      <p>
        2. Data accessed or processed through the admin panel must be handled in
        a way that ensures confidentiality and integrity.
      </p>

      <h2>Monitoring and Compliance:</h2>
      <p>
        1. The company reserves the right to monitor all activity on the admin
        panel to ensure compliance with these terms.
      </p>
      <p>
        2. Violations of the terms of use may result in restricted access,
        disciplinary action, or legal consequences.
      </p>

      <h2>Liability and Indemnity:</h2>
      <p>
        1. The company is not liable for any losses or damages resulting from
        unauthorized use of the admin panel.
      </p>
      <p>
        2. Administrators agree to indemnify the company against any claims
        arising from their misuse of the admin panel.
      </p>
    </div>
  );
};

export default TermsOfUse;
