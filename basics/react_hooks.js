/**
 * Comprehensive React Hooks Guide
 * ------------------------------
 * Hooks enable functional components to use state and lifecycle features.
 * Key Rules:
 * - Must be called at the top level (not inside loops, conditions, nested functions)
 * - Can only be called from React function components or custom hooks
 * - Names must start with 'use'
 */

// 1. useState
interface UseStateExampleProps {
  initialCount: number;
}

const UseStateExample = (props: UseStateExampleProps) => {
  const { initialCount } = props;
  
  /**
   * useState Best Practices:
   * - Use when you need simple state management
   * - Prefer multiple useState calls over complex objects
   * - Use functional updates for state that depends on previous value
   * - Initialize expensive computations with callback
   */
  
  // Simple state
  const [count, setCount] = useState(initialCount);
  
  // Complex object state - consider splitting into multiple useState calls
  const [state, setState] = useState({
    count: 0,
    name: ''
  });

  // Correct way to update object state
  const updateName = (name: string) => {
    setState(prev => ({
      ...prev,
      name
    }));
  };

  // Lazy initialization for expensive computations
  const [expensiveValue] = useState(() => someExpensiveCalculation());

  console.log("count", count);
  console.log("state", state);

  return null;
};

// 2. useEffect
interface UseEffectExampleProps {
  id: string;
}

const UseEffectExample = (props: UseEffectExampleProps) => {
  const { id } = props;

  /**
   * useEffect Best Practices:
   * - Use multiple focused effects instead of one large effect
   * - Always clean up subscriptions and listeners
   * - Include all dependencies in the dependency array
   * - Use useCallback for function dependencies
   * - Avoid infinite loops by properly managing dependencies
   */

  // 🚫 Anti-pattern: Missing dependency
  useEffect(() => {
    console.log(id); // Warning: id should be in deps array
  }, []); 

  // ✅ Correct pattern: With proper dependencies
  useEffect(() => {
    console.log("Effect with id dependency");
    
    // Cleanup pattern for subscriptions/API calls
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data/${id}`, {
          signal: controller.signal
        });
        // Handle response
      } catch (error) {
        if (!controller.signal.aborted) {
          // Handle error
        }
      }
    };

    fetchData();
    
    return () => {
      controller.abort(); // Cleanup
    };
  }, [id]);

  return null;
};

// 3. useRef
interface UseRefExampleProps {
  focusInput: boolean;
}

const UseRefExample = (props: UseRefExampleProps) => {
  const { focusInput } = props;
  
  /**
   * useRef Best Practices:
   * - Use for values that shouldn't trigger re-renders
   * - Perfect for DOM element references
   * - Great for previous value patterns
   * - Use for mutable values that persist across renders
   */

  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const previousValueRef = useRef();

  // Store previous value pattern
  useEffect(() => {
    previousValueRef.current = focusInput;
  }, [focusInput]);

  useEffect(() => {
    // DOM manipulation
    if (focusInput && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Mutable updates without re-renders
    countRef.current += 1;
  }, [focusInput]);

  console.log("countRef", countRef.current);

  return <input ref={inputRef} />;
};

// 4. useMemo
interface UseMemoExampleProps {
  numbers: number[];
}

const UseMemoExample = (props: UseMemoExampleProps) => {
  const { numbers } = props;

  /**
   * useMemo Best Practices:
   * - Use for expensive calculations
   * - Memoize values passed as props to child components
   * - Don't overuse - simple calculations don't need memoization
   * - Consider the cost of creating vs recomputing
   */

  // Expensive computation memoization
  const sum = useMemo(() => {
    console.log("Computing sum - expensive operation");
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }, [numbers]);

  // Memoize objects to prevent unnecessary re-renders
  const memoizedValue = useMemo(() => ({
    complex: 'object',
    that: 'should',
    not: 'change',
    frequently: true
  }), []);

  console.log("sum", sum);

  return null;
};

// 5. useContext
interface Theme {
  background: string;
  color: string;
}

const ThemeContext = React.createContext<Theme>({
  background: 'light',
  color: 'black'
});

const UseContextExample = () => {
  /**
   * useContext Best Practices:
   * - Use for global state that many components need
   * - Split contexts by domain/purpose
   * - Keep context values at the right level
   * - Consider performance implications of context changes
   */
  
  const theme = useContext(ThemeContext);
  
  console.log("theme", theme);

  return null;
};

// 6. useReducer
interface State {
  count: number;
}

interface Action {
  type: 'increment' | 'decrement';
  payload?: number;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) };
    case 'decrement':
      return { count: state.count - (action.payload || 1) };
    default:
      return state;
  }
};

const UseReducerExample = () => {
  /**
   * useReducer Best Practices:
   * - Use for complex state logic
   * - Prefer over useState for related state transitions
   * - Great for state machines
   * - Keep reducers pure
   * - Use with context for global state management
   */

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // Example of dispatch with payload
  const handleIncrement = (amount: number) => {
    dispatch({ type: 'increment', payload: amount });
  };

  console.log("reducer state", state);

  return null;
};

// 7. useCallback
interface UseCallbackExampleProps {
  onItemClick: (id: string) => void;
}

const UseCallbackExample = (props: UseCallbackExampleProps) => {
  const { onItemClick } = props;

  /**
   * useCallback Best Practices:
   * - Use when passing callbacks to optimized child components
   * - Combine with React.memo for child components
   * - Consider whether memoization is actually needed
   * - Include all dependencies in the dependency array
   */

  const handleClick = useCallback((id: string) => {
    console.log("Item clicked");
    onItemClick(id);
  }, [onItemClick]);

  return null;
};

/**
 * Custom Hooks Best Practices
 * --------------------------
 * 1. Start name with 'use'
 * 2. Keep hooks focused and reusable
 * 3. Handle cleanup properly
 * 4. Document parameters and return values
 * 5. Consider error handling
 */

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

/**
 * Advanced Hook Patterns:
 * 1. Composition: Combine multiple hooks into a single custom hook
 * 2. Conditional hooks: Use wrapper hooks for conditional logic
 * 3. Async hooks: Handle loading and error states
 * 4. Debounced/throttled hooks: Control execution frequency
 * 5. Persistent hooks: Combine with localStorage/sessionStorage
 */
