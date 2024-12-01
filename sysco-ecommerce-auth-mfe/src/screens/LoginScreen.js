import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from '@aws-amplify/auth';
import axios from 'axios';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const saveUserToBFF = async (user) => {
    try {
      const currentSession = await getCurrentUser();
      const token = (await currentSession.getSignInUserSession()).getIdToken().getJwtToken();
      
      await axios.post('http://localhost:3001/api/users', {
        email: user.attributes.email,
        name: user.attributes.name
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('User data sent to BFF');
    } catch (error) {
      console.error('Error sending user data to BFF:', error);
    }
  };

  useEffect(() => {
    if (user) {
      saveUserToBFF(user);
      navigate("/home"); 
    }
  }, [user]);

  return (
    <Authenticator>
      {({ signOut, user: authUser }) => {
        if (authUser && !user) {
          setUser(authUser);
        }
        
      return (
          <div className="auth-container">
            <h2>Welcome {user?.attributes?.email}</h2>
            <button onClick={signOut}>Sign Out</button>
          </div>
        );
      }}
    </Authenticator>
  );
};

export default LoginScreen;



/*
with session but not working
import React, { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import "@aws-amplify/ui-react/styles.css";
import eventBus from './shared-events';

const LoginScreen = () => {
  const [user, setUser] = useState(null);

  const saveUserToBFF = async (user) => {
    try {
      const currentSession = await Auth.currentSession();
      const token = currentSession.getIdToken().getJwtToken();

      localStorage.setItem("token", token);

      await axios.post(
        "http://localhost:3001/api/users",
        {
          email: user.attributes.email,
          name: user.attributes.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User data sent to BFF");
    } catch (error) {
      console.error("Error sending user data to BFF:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      saveUserToBFF(user);
    }
  }, [user]);

  return (
    <Authenticator>
      {({ signOut, user: authUser }) => {
        if (authUser && !user) {
          setUser(authUser);
          eventBus.emit('userLoggedIn', authUser);
        }

        return (
          <div className="auth-container">
            <h2>Welcome {authUser?.attributes?.email}</h2>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                eventBus.emit('userLoggedOut');
                signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        );
      }}
    </Authenticator>
  );
};

export default LoginScreen;
*/