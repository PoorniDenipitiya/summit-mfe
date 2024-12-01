import React from 'react';
import LoginScreen from "./screens/LoginScreen";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from '@aws-amplify/core';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => {
  return (
   
    <div className="app-container">
      <LoginScreen />
    </div>

  );
};

export default App;
