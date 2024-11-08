## Project Overview

This project template is built using a micro-frontend (MFE) architecture using single-spa. Each MFE functions as an independent module, allowing for modular development, testing, and deployment.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (version `>=14.x`): [Download Node.js](https://nodejs.org/)
- **NPM**: Comes with Node.js
- **Git**: [Download Git](https://git-scm.com/)

**Optional**:

- **VS Code** (recommended): [Download VS Code](https://code.visualstudio.com/)

## Project Structure

The project structure contains a main directory and several subdirectories, each corresponding to an MFE:

```plaintext
project-root/
│
├── package.json           # Main package.json with all project commands
├── install-all.sh         # Script to install dependencies in all MFEs
|
├── mfe-root/              # Root micro-frontend
│   ├── package.json
│   └── src/
│
├── mfe-auth/              # Auth micro-frontend
│   ├── package.json
│   └── src/
│
├── mfe-categories/        # Categories micro-frontend
│   ├── package.json
│   └── src/
│
├── mfe-home/              # Home micro-frontend
│   ├── package.json
│   └── src/
│
└── mfe-navbar/            # Navbar micro-frontend
    ├── package.json
    └── src/
```

## Setup Steps

### 1. Clone the Repository

Open your terminal, navigate to the directory where you want the project, and run:

```bash
git clone https://github.com/summitcommunity/summit-mfe-base-template
cd summit-mfe-base-template

```

### 2. Install Dependencies

This project uses multiple MFEs, each with its own package.json. To install all dependencies at once, run the provided script:

```bash
bash install-all.sh
```

### 3. Running the Application

To start all MFEs simultaneously, use the start:all command:

```bash
npm run start:all
```
