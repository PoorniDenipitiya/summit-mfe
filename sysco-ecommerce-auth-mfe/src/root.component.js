/*import { BrowserRouter } from "react-router-dom";
import App from "./App";

export default function Root(props) {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
*/


import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App";
import awsConfig from './aws-exports';

// Configure Amplify
Amplify.configure({
  ...awsConfig,
  // Ensure Auth configuration is at the root level
  Auth: {
    region: awsConfig.aws_cognito_region,
    userPoolId: awsConfig.aws_user_pools_id,
    userPoolWebClientId: awsConfig.aws_user_pools_web_client_id,
    mandatorySignIn: true,
    authenticationFlowType: "USER_SRP_AUTH"
  }
});

export default function Root(props) {
  return (
    <BrowserRouter>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
    </BrowserRouter>
  );
}