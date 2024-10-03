/**
 * Higher Order Components (HOCs) in React
 * 
 * @description
 * A Higher Order Component is a function that takes a component as an argument
 * and returns a new component with some additional functionality or props.
 * HOCs are a powerful pattern for reusing component logic across multiple components.
 * 
 * Key characteristics of HOCs:
 * 1. They are pure functions with no side effects.
 * 2. They don't modify the input component; they compose a new one.
 * 3. They can add additional props, state, or behavior to the wrapped component.
 * 
 * @example
 * Here's a simple HOC that adds a loading state to a component:
 */

import React from 'react';

interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithLoading: React.FC<P & WithLoadingProps> = (props) => {
    const { isLoading, ...otherProps } = props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...otherProps as P} />;
  };

  return WithLoading;
};

/**
 * Usage example:
 */

interface MyComponentProps {
  data: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ data }) => {
  return <div>{data}</div>;
};

const EnhancedComponent = withLoading(MyComponent);

// Now you can use EnhancedComponent like this:
// <EnhancedComponent isLoading={true} data="Some data" />

/**
 * Benefits of HOCs:
 * 1. Code Reusability: Logic can be shared across multiple components.
 * 2. Separation of Concerns: HOCs allow you to extract common functionality.
 * 3. Composability: Multiple HOCs can be composed together.
 * 
 * Considerations:
 * 1. Avoid modifying the component prototype.
 * 2. Pass unrelated props through to the wrapped component.
 * 3. Maximize composability by using composition instead of inheritance.
 * 
 * Alternative to HOCs:
 * With the introduction of Hooks in React, some use cases for HOCs can be 
 * replaced with custom hooks, which offer a more flexible way to reuse stateful logic.
 */

// Example of a more complex HOC that adds authentication logic

interface WithAuthProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const login = () => {
      console.log("Logging in");
      setIsAuthenticated(true);
    };

    const logout = () => {
      console.log("Logging out");
      setIsAuthenticated(false);
    };

    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        login={login}
        logout={logout}
      />
    );
  };

  return WithAuth;
};

// Usage of withAuth HOC
interface SecureComponentProps extends WithAuthProps {
  secretData: string;
}

const SecureComponent: React.FC<SecureComponentProps> = ({ isAuthenticated, login, logout, secretData }) => {
  if (!isAuthenticated) {
    return (
      <div>
        <p>Please log in to view the secret data.</p>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <p>Secret Data: {secretData}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const EnhancedSecureComponent = withAuth(SecureComponent);

// Now you can use EnhancedSecureComponent like this:
// <EnhancedSecureComponent secretData="Top secret information" />

console.log("HOC examples defined");
