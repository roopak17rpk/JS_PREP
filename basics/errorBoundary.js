/**
 * Error Boundaries in React
 * ------------------------
 *
 * Error boundaries are React components that catch JavaScript errors anywhere
 * in their child component tree, log those errors, and display a fallback UI.
 *
 * Visual Representation:
 *
 * +------------------------+
 * |    Error Boundary     |
 * |  +----------------+   |
 * |  |  Child Comp A  |   |
 * |  |   (crashes)    |   |
 * |  +----------------+   |
 * |  +----------------+   |
 * |  |  Child Comp B  |   |
 * |  +----------------+   |
 * |                      |
 * |  [Fallback UI shown] |
 * +------------------------+
 *
 * Key Points:
 * - Only class components can be error boundaries
 * - Catches errors in:
 *   ✓ Child component rendering
 *   ✓ Lifecycle methods
 *   ✓ Constructors
 * - Does NOT catch errors in:
 *   × Event handlers
 *   × Async code
 *   × Server side rendering
 *   × Errors thrown in the error boundary itself
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * This lifecycle method runs when an error occurs
   * Returns the new state to be used
   */
  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError called with error", error);
    return {
      hasError: true,
      error,
    };
  }

  /**
   * This lifecycle method is called after an error is thrown
   * Used for logging errors to error reporting services
   */
  componentDidCatch(error, errorInfo) {
    console.log("error caught in boundary", error);
    console.log("error info", errorInfo);

    // Here you would typically log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        fallback || (
          <div role="alert">
            <h2>Something went wrong!</h2>
            <details style={{ whiteSpace: "pre-wrap" }}>
              {error?.toString()}
            </details>
          </div>
        )
      );
    }

    return children;
  }
}

// PropTypes for type checking
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node
};

export default ErrorBoundary;

/**
 * Usage Example:
 *
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <ComponentThatMightError />
 * </ErrorBoundary>
 *
 * Any errors in ComponentThatMightError or its children
 * will be caught by ErrorBoundary
 */
