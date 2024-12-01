import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";


const routes = constructRoutes(microfrontendLayout);

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();


/*import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    console.log(`Loading application: ${name}`);
    return System.import(name);
  },
});



// Define your BFF URL here
const BFF_URL = process.env.BFF_URL || 'http://localhost:3001'; // Default to local BFF
console.log("BFF URL:", BFF_URL);
// Register applications with BFF URL as a prop
applications.forEach(app => {
  console.log(`Registering application: ${app.name}`);
  registerApplication({
    name: app.name,
    app: app.app,
    activeWhen: app.activeWhen,
    customProps: {
      bffUrl: BFF_URL, // Pass the BFF URL to your micro-frontend
    },
  });
});
const layoutEngine = constructLayoutEngine({ routes, applications });
layoutEngine.activate();
start();*/
