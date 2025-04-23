import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // Firebase authentication methods

const Logout = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // Get Firebase Auth instance

  useEffect(() => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }, [auth, navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
