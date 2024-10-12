# Rise App

## Overview

The Rise App is a mobile application built using React Native, showcasing various features that enable users to manage their investment plans effectively. This README provides insights into the file structure, technologies used, challenges faced during development, and the workarounds implemented to ensure a smooth user experience.

## File Structure

```
rise/
├── assets/                     # Static assets like images and icons
├── components/                 # Reusable UI components
├── context/                    # Context providers for global state management
├── hooks/                      # Custom React hooks for encapsulating reusable logic
├── network/                    # API services for managing network requests
├── navigation/                 # Navigation configuration using React Navigation
├── redux/                      # Redux-related files for global state management
├── screens/                    # Individual screen components for different pages
├── utils/                      # Utility functions for common operations
├── App.tsx                     # Main entry point of the application
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## Technologies Used

- **TypeScript**: The application is developed using TypeScript, which enhances code quality through static typing and facilitates easier debugging and refactoring.

- **React Hooks**: The project leverages React Hooks for managing state and side effects, allowing for more functional and reusable components.

- **React Navigation 5**: This library is used to handle navigation between different screens, providing a fluid user experience with deep linking and stack navigation.

- **Proper Error Handling**: The app implements robust error handling mechanisms to manage API response errors gracefully, ensuring users receive appropriate feedback when issues occur.

- **React Query**: For efficient data fetching and state synchronization, React Query is utilized, allowing for automatic caching and updating of server data.

- **Minimal Redux Usage**: Redux is utilized minimally for global state management. Combined with AsyncStorage, it allows for persistent data storage across app restarts, ensuring that user preferences and data are retained even when the app is closed.

## Challenges

The development of the Rise App encountered several challenges:

1. **Base URL Discrepancy**: The sign-up endpoint uses a different base URL from the other API endpoints:
   - **First Base URL**: `https://manator-staging-qogza.ondigitalocean.app/api/v1`
   - **Second Base URL**: `https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/`

   Attempts to utilize the second base URL for signing up were unsuccessful, while the first base URL successfully processed sign-up requests.

2. **Authentication Issues**: The absence of a valid token restricted access to other API endpoints, which required authorization. The login endpoint could not be used to obtain a token due to the discrepancies with the base URLs.

3. **Endpoint Limitations**: When trying to use a single base URL for all endpoints, only the sign-up endpoint successfully responded when using the first base URL.

## Workaround

To address the issues stemming from the unreliable API, several workarounds were implemented:

- **Demo Account**: A demo account was set up to facilitate basic functionality and allow testing of the app’s features.

- **Local Data Persistence**: Utilizing AsyncStorage in conjunction with Redux allows for the persistence of user data across app restarts. This ensures that essential user information and preferences remain accessible, providing a seamless experience even when the network is unavailable.

## Test APK

A workable APK can be downloaded using this link: https://drive.google.com/file/d/1J7-PAFlPIxUVxnOwnneYveyqg4dRG15k/view?usp=sharing 

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Conclusion

The Rise App demonstrates effective management of investment plans while overcoming various development challenges. By utilizing modern technologies and implementing practical workarounds, the app provides a robust platform for users.

For further details or contributions, feel free to reach out or submit pull requests.
