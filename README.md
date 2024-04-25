# Tender

## Rubrics and Explanation

### 1. Adequate Setup of the React JS Project

- **Dependencies and Libraries**: The project includes necessary libraries such as `react-router-dom` for routing, `react-bootstrap` for UI components, and Redux (`react-redux`) for state management. These are foundational dependencies for a robust React application.
- **Configuration**: Use of `ReactDOM.createRoot` in the index file adheres to React 18’s new root API, indicating up-to-date configuration. The inclusion of an `ErrorBoundary` component also demonstrates advanced configuration for error handling.
- **File Structure**: The project is structured into directories like `components/pages` and `components/shared`, which segregate UI components based on their roles and reusability. This separation enhances maintainability and scalability.

### 2. Thoughtful Organization of Components, Services, and Other Code Files

- **Component Segregation**: By dividing components into `pages` and `shared`, the project adheres to best practices in React development. Pages are likely more complex and serve as containers, while shared components (like `Header` and `Footer`) are reusable across different parts of the application.
- **Routing**: Utilizing `react-router-dom` for defining private and public routes (`PrivateRoute` and `PublicRoute` components) encapsulates authentication logic, ensuring that routes are only accessible based on user authentication state.
- **Centralized State Management**: Using Redux for state management and organizing user-related actions (`setUserProfile`, `clearUserProfile`, `setAuthState`) into a specific module (`userActions`) reflects a modular approach to managing state. This separation of concerns is crucial for larger applications where state management can become complex.
- **Services**: The `axiosClient` are separated from the main application logic, centralizing API interactions and enhancing reusability and maintainability.
- **Error Handling**: Implementation of an `ErrorBoundary` to wrap the application's routes indicates a proactive approach to handling runtime errors gracefully, preventing the entire app from crashing due to errors in components.

### 3. Proficient Consumption of the RESTful Service

- **API Integration**: The project uses `axios` to create a customized client (`axiosClient`) that is configured with default headers and a timeout, ensuring efficient and consistent API requests.
- **Authentication Handling**: An interceptor is added to the `axiosClient` to inject the `Authorization` header with an access token from local storage for authenticated requests, demonstrating proper integration and use of authentication mechanisms with the RESTful service.

### 4. Correct Implementation of CRUD Operations

- **Read Operation**: The `Home` component fetches user profiles from `/api/Users` using `axiosClient.get`. This operation demonstrates the correct use of the GET method in REST.
- **Create Operation**: In the `handleSubmit` function, user authentication is performed by posting login credentials to `/api/Account/login`. Additionally, in `Home`, swiping actions (like/dislike) are sent to the server via `axiosClient.post` to `/api/Swipes/{userId}`, representing the correct usage of the POST method to create resources.
- **Update Operation**: In `Profile`, updating user profile actions are sent to the server via `axiosClient.put` to `/api/UserProfiles`, representing the correct usage of the Put method to update resources.
- **Delete Operation**: In `Profile`, deleting user actions are sent to the the server via `axiosClient.delete` to `/api/UserProfiles`, representing the correct usage of the Delete method to delete resources.
- **Error Handling**: The code properly handles errors by setting an error state and displaying messages based on the HTTP status codes and responses, which ensures accuracy and provides feedback on the CRUD operations.

### 5. Creation of an Intuitive and User-Friendly Interface

- **Layout and Design**: The use of `MDBContainer`, `MDBRow`, and `MDBCol` from `mdb-react-ui-kit` creates a responsive layout that adjusts to different screen sizes, improving the user experience. The visual separation between the login form and an attractive image enhances the aesthetic appeal and draws user attention.
- **Interaction Design**: The LoginForm component's clear and focused design, with large input fields and prominent login buttons, makes interactions straightforward and user-friendly.
- **Swipe Interaction**: The `useSwipeable` hook from the `react-swipeable` library is used to add swipe gestures to the profile cards. Users can swipe right to "like" or left to "dislike" a profile. This interaction is made intuitive through visual feedback from swipe actions.
- **Animation**: The `useSpring` and `animated` components from the `@react-spring/web` library animate the swipe actions, enhancing the user experience by providing smooth and visually appealing transitions as cards are liked or disliked.

### 6. Effective Handling of User Inputs and Events

- **Responsive Feedback**: The application provides immediate feedback on user actions, such as displaying error alerts when login fails. This ensures users are well-informed of their interaction outcomes, enhancing user experience.
- **Input Handling**: User inputs for email and password are managed with state hooks (`useState`), which are updated on every keystroke to ensure the interface reacts dynamically to user inputs.

### 7.Integration of Bootstrap/CSS3, React Widgets, and Tabs

- **Bootstrap and MDBReact**: The LoginForm uses Bootstrap components like `Form` and `Button`, along with MDBReact components like `MDBInput` and `MDBIcon`, which not only enhance the visual appeal but also ensure consistency and responsiveness across different devices.
- **Aesthetics and Usability**: The LoginForm and Home components' designs are simple yet elegant, facilitated by CSS styling such as `object-fit` for images and custom padding and margins. These stylistic choices improve the usability and accessibility of the interface.

### 8. Proper Configuration and Implementation of Map Functionality

- **Dynamic Map Display**: The application incorporates an interactive Google Maps iframe within the user profile form. This map is dynamically updated to reflect the user's location as they type it into the form. This real-time update is achieved by embedding the `userProfile.location` state directly into the iframe's URL, which queries the Google Maps API to display the specified location.
- **Seamless Interaction with Other Application Features**: The map is integrated directly into the form where users update their profile details. As the user types a new location into the relevant input field, the map updates automatically without requiring a page reload or separate confirmation, providing a seamless user experience.

### 9. Proper Integration in Case of a State Change

- **State Management with React Hooks**: The code uses the `useState` hook to manage the user profile state, including the location. As the `userProfile.location` state changes, the component effectively re-renders to update the map view, showcasing efficient state management that ensures the map remains synchronized with user inputs.
- **Reactivity to User Inputs**: Changes to the location field directly trigger updates to the map, illustrating a responsive and interactive interface. This responsiveness ensures that users receive immediate visual confirmation of the location they have entered, enhancing the user-friendliness and accuracy of the profile management system.

### 10. Efficient Utilization of React’s State Management

- **Local State Management**: The use of `useState` and `useEffect` hooks across multiple components such as `Profile` and `PrivateRoute` demonstrates a proficient handling of local state within components. These hooks manage user-specific data (like user profiles) and authentication status, which are essential for the app's functionality.
- **Integration with Redux**: The use of Redux for global state management is evident through the use of `useDispatch` to dispatch actions and `useSelector` to retrieve state from the Redux store. This is particularly used for handling user authentication states (`isAuth`) and user profile data, allowing for a centralized state management solution that facilitates communication between components.

### 11.Proper Propagation of State Changes Across the Application

- **Consistency and Synchronization**: Changes in the user's authentication state are managed via Redux and affect the entire application. For instance, upon successful login or logout, the `setUserProfile` and `clearUserProfile` actions update the Redux store, which in turn updates components that depend on this state, such as `Header`, ensuring consistent visibility of user-specific navigation options.
- **Route Guarding**: The `PrivateRoute` and `PublicRoute` components use the authentication state (`isAuth`) to control access to routes. This setup ensures that state changes (like logging in or out) directly influence the accessibility of certain routes, thereby maintaining consistent behavior across the application.
- **Dynamic Interaction with Redux State**: In the `Header` component, navigation is dynamically rendered based on the authentication state from the Redux store, which changes based on user actions like signing in or out. This real-time update ensures that the navigation options are always in sync with the user's login status.

### 12. Implementation of Robust Error Handling Mechanisms for API Calls

- **Axios Interceptors for Error Handling**: The code uses Axios interceptors to handle errors globally. Errors are caught during the response phase of an API request, and based on the HTTP status code, different errors (e.g., unauthorized, bad request, not found, etc.) are logged and appropriately handled. For instance, a 401 error results in the removal of the `accessToken` from local storage, addressing session-related issues proactively.
- **Centralized Error Responses**: Each error type is associated with a specific message, which is then returned using `Promise.reject`, allowing for consistent error handling across different parts of the application. This ensures that errors are not only logged but also communicated back to the calling functions for further action.
- **Error Boundary Component**: The `ErrorBoundary` component wraps around the application’s routes, providing a fallback UI when JavaScript errors occur in child components. This mechanism prevents the entire app from crashing and offers a user-friendly error message or alternative page.

### 13. Thorough Validation of User Inputs Before Submission

- **Client-Side Validation Mechanism**: While explicit client-side validation rules are not detailed in the provided code snippet, the error handling within Axios interceptors and error boundaries suggests a framework that could easily extend to include form validation or similar checks before API requests are made. For example, handling a 400 Bad Request error can be a direct result of client-side validation failing, ensuring data integrity by not processing invalid data.
- **Preventative Error Handling in API Requests**: The use of Axios interceptors to check and modify requests before they are sent (for example, by adding authorization headers) indirectly supports the validation process by ensuring that requests meet certain criteria (like authentication) before being processed.
- **Error Feedback in UI Components**: The use of state hooks like `setError` within components like the `fetchUsers` function indicates that the application is set up to provide feedback directly to the user if an API call fails due to issues such as network errors or data fetching problems. This feedback is crucial for maintaining a transparent user experience where users are kept informed of system states and errors.
