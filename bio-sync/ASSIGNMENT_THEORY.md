# FSD Laboratory 05: React Development Theory

This document provides the theoretical background and FAQ answers for the BIO-SYNC project, fulfilling the requirements of FSD Laboratory 05.

## 1. What is React and why is it useful?
**React** is a declarative, component-based JavaScript library for building user interfaces, primarily maintained by Meta (Facebook). 

### Why is it useful?
- **Component-Based Architecture**: Allows developers to build encapsulated components that manage their own state and compose them into complex UIs.
- **Declarative**: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
- **Virtual DOM**: React uses a lightweight representation of the real DOM. When data changes, it compares the current Virtual DOM with a new one (diffing) and updates only the necessary parts of the real DOM, ensuring high performance.
- **Ecosystem**: Huge community support, libraries (like Framer Motion used in this project), and developer tools.

## 2. Basic Architecture of a React Application
A React application is structured as a **Tree of Components**.
- **Root Component (`App.jsx`)**: The parent component that holds the main layout and top-level state.
- **Children Components**: Smaller, reusable units (e.g., `IdentityForm`, `ProfileCard3D`).
- **Data Flow**: Data flows downwards from Parent to Child via **Props**. Events flow upwards from Child to Parent via **Callbacks**.

## 3. Steps to run React App
While the assignment mentions `create-react-app` (CRA), the industry has moved to **Vite** for better speed and performance. 
### Steps using Vite (as performed for BIO-SYNC):
1.  Initialize: `npm create vite@latest my-app --template react`
2.  Install: `cd my-app` and `npm install`
3.  Run Dev Server: `npm run dev`

## 4. Passing Data Through Props (Example)

```jsx
// Parent Component
const Dashboard = () => {
    return <StatusCard status="Operational" />;
};

// Child Component
const StatusCard = (props) => {
    return <h1>System Status: {props.status}</h1>;
};
```

## 5. FAQ: React States and Hooks

### What are React States?
**State** is a built-in object that used to contain data or information about the component. A component's state can change over time; whenever it changes, the component re-renders.

### What are Hooks?
**Hooks** are functions that let you "hook into" React state and lifecycle features from function components.
- **`useState`**: Allows you to add state to a functional component (e.g., tracking form inputs in `IdentityForm.jsx`).
- **`useEffect`**: Lets you perform side effects in functional components (e.g., data fetching or animations).
- **`useRef`**: Used to access DOM elements directly (often used for 3D transforms).
