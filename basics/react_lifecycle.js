/**
 * Lifecycle Methods: Class Components vs Functional Components with Hooks
 * 
 * This file provides a detailed explanation of React lifecycle methods,
 * comparing the approach in class components to functional components using hooks.
 */

/**
 * Class Component Lifecycle
 * 
 * 1. Initialization:
 *    - constructor(props)
 *      Used to initialize state and bind methods.
 *      
 *    Example:
 *    constructor(props) {
 *      super(props);
 *      this.state = { data: '' };
 *      this.handleClick = this.handleClick.bind(this);
 *    }
 * 
 * 2. Mounting:
 *    - componentDidMount()
 *      Called after the component is inserted into the DOM.
 *      Ideal for initial data fetching or setting up subscriptions.
 *      
 *    Example:
 *    componentDidMount() {
 *      console.log("Component mounted");
 *      this.fetchData();
 *    }
 * 
 * 3. Updating:
 *    - componentDidUpdate(prevProps, prevState)
 *      Called after the component updates.
 *      Use to respond to prop or state changes.
 *      
 *    Example:
 *    componentDidUpdate(prevProps) {
 *      if (prevProps.id !== this.props.id) {
 *        this.fetchData();
 *      }
 *    }
 * 
 * 4. Unmounting:
 *    - componentWillUnmount()
 *      Called just before the component is removed from the DOM.
 *      Use for cleanup (cancelling network requests, removing subscriptions).
 *      
 *    Example:
 *    componentWillUnmount() {
 *      console.log("Component will unmount");
 *      this.subscription.unsubscribe();
 *    }
 */

/**
 * Functional Component with Hooks
 * 
 * Hooks provide a more flexible way to use state and other React features
 * without writing a class.
 * 
 * 1. State Initialization:
 *    - useState hook
 *      Replaces this.state and this.setState in class components.
 *      
 *    Example:
 *    const [data, setData] = useState('');
 * 
 * 2. Side Effects (Mounting, Updating, Unmounting):
 *    - useEffect hook
 *      Combines componentDidMount, componentDidUpdate, and componentWillUnmount.
 *      
 *    Example:
 *    useEffect(() => {
 *      console.log("Component mounted or updated");
 *      fetchData();
 * 
 *      return () => {
 *        console.log("Cleanup: Component will unmount or re-render");
 *        // Cleanup code here
 *      };
 *    }, [id]); // Dependency array
 * 
 *    - Empty dependency array ([]) simulates componentDidMount.
 *    - Including dependencies handles both mounting and updating.
 *    - The return function simulates componentWillUnmount.
 */

/**
 * Key Differences and Advantages of Hooks:
 * 
 * 1. Reusability: Hooks allow you to reuse stateful logic without changing
 *    your component hierarchy.
 * 
 * 2. Simplicity: useEffect combines the functionality of several lifecycle methods,
 *    simplifying the component structure.
 * 
 * 3. Readability: Functional components with hooks tend to be more concise
 *    and easier to understand at a glance.
 * 
 * 4. Separation of Concerns: Hooks encourage separating logic by concern
 *    rather than by lifecycle method.
 * 
 * 5. Avoiding this: No need to worry about 'this' binding in functional components.
 * 
 * 6. Easier Testing: Functional components are generally easier to test.
 */

/**
 * Example Usage Comparison:
 * 
 * Class Component:
 * class ExampleComponent extends React.Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = { data: '' };
 *   }
 * 
 *   componentDidMount() {
 *     this.fetchData();
 *   }
 * 
 *   componentDidUpdate(prevProps) {
 *     if (prevProps.id !== this.props.id) {
 *       this.fetchData();
 *     }
 *   }
 * 
 *   componentWillUnmount() {
 *     // Cleanup
 *   }
 * 
 *   fetchData() {
 *     // Fetch data and update state
 *   }
 * 
 *   render() {
 *     return <div>{this.state.data}</div>;
 *   }
 * }
 * 
 * Functional Component with Hooks:
 * function ExampleComponent({ id }) {
 *   const [data, setData] = useState('');
 * 
 *   useEffect(() => {
 *     const fetchData = async () => {
 *       // Fetch data and update state
 *     };
 * 
 *     fetchData();
 * 
 *     return () => {
 *       // Cleanup
 *     };
 *   }, [id]);
 * 
 *   return <div>{data}</div>;
 * }
 */

// Note: This file is for explanation purposes and does not contain executable code.
console.log("This file explains React lifecycle methods and hooks.");