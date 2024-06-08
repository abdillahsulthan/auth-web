# React Website with Firebase Authentication

## Description

This website utilizes Firebase Authentication for simple registration, login, and Google sign-in features, providing a secure and efficient user authentication process.

## Features
- **Sign in**
- **Google sign-in**
- **Sign up**

## Prerequisites

Before running this project locally, make sure you have completed following steps:

1. **Firebase Setup**
    - Go to the Firebase Console.
    - Click on "Add project" and follow the on-screen instructions to create a new project.
    - Once your project is created, click on the "Authentication" tab in the Firebase console.
    - Enable Email/Password and Google sign-in methods under the "Sign-in method" tab.
    - Click on the "Firestore Database" tab in the Firebase console.
    - Click on "Create Database" and follow the on-screen instructions to set up Firestore.
    - Go to the "Project settings" by clicking the gear icon next to "Project Overview" in the Firebase console.
    - Under the "General" tab, you will find your Firebase SDK configuration snippet. Copy the configuration details, as you will need them to initialize Firebase in your project.

2. **Create `.env` file in your root project**

    Add your Firebase configuration details to the .env file. It should look something like this
    ```
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```


## Installation

```bash
# Clone the repository
git clone https://github.com/abdillahsulthan/auth-web.git

# Navigate to the project directory
cd login-zot

# Install dependencies
npm install
```

## Running the Application

To run the application in development mode, use the following command:

```bash
npm start
```

## Deployment

When you're ready to build the application for production, run:

```bash
npm run build
```