import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const sendUserData = async () => {
      if (isAuthenticated && user) {
        const userData = {
          username: user.name,
          email: user.email,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/authenticate",
            userData
          );

          if (response.status === 200) {
            const responseData = response.data;
            console.log("Response data:", responseData);
          } else {
            console.error("Error sending user data");
          }
        } catch (error) {
          console.error(
            "Error sending user data:",
            error.response || error.message || error
          );
        }
      }
    };

    sendUserData();
  }, [isAuthenticated, user]);

  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>
      </div>
    )
  );
};

export default Dashboard;
