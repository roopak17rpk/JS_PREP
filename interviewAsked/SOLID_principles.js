/**
 * SOLID Principles in JavaScript and React
 * 
 * S - Single Responsibility Principle (SRP)
 * Each class/component should have only one reason to change
 * 
 * Example in React:
 * Bad:
 * const UserProfile = () => {
 *   const fetchUserData = () => {...} // Data fetching
 *   const formatUserData = () => {...} // Data formatting 
 *   const renderUI = () => {...} // UI rendering
 * }
 * 
 * Good:
 * const UserDataService = {
 *   fetchUserData: () => {...}
 * }
 * 
 * const UserDataFormatter = {
 *   formatData: (data) => {...} 
 * }
 * 
 * interface UserProfileProps {
 *   userData: UserData;
 * }
 * 
 * const UserProfile = ({userData}: UserProfileProps) => {
 *   return <div>{userData.name}</div> // Only handles rendering
 * }
 * 
 * O - Open/Closed Principle
 * Software entities should be open for extension but closed for modification
 * 
 * Example:
 * // Base button component
 * interface ButtonProps {
 *   onClick: () => void;
 *   children: React.ReactNode;
 *   variant?: 'primary' | 'secondary';
 * }
 * 
 * const Button = ({onClick, children, variant = 'primary'}: ButtonProps) => {
 *   return (
 *     <button 
 *       className={`btn btn-${variant}`}
 *       onClick={onClick}
 *     >
 *       {children}
 *     </button>
 *   )
 * }
 * 
 * // Extended without modifying base
 * const IconButton = ({icon, ...props}: ButtonProps & {icon: string}) => {
 *   return (
 *     <Button {...props}>
 *       <i className={icon} />
 *       {props.children}
 *     </Button>
 *   )
 * }
 * 
 * L - Liskov Substitution Principle
 * Derived classes must be substitutable for their base classes
 * 
 * Example:
 * The IconButton can composed of Button so IconButton should be able to use
 * where ever Button is used
 * 
 * I - Interface Segregation Principle
 * Clients should not be forced to depend on interfaces they don't use
 * 
 * Example:
 * // Bad
 * interface UserActions {
 *   readProfile(): void;
 *   writePost(): void;
 *   manageUsers(): void; 
 * }
 * 
 * // Good
 * interface UserReader {
 *   readProfile(): void;
 * }
 * 
 * interface PostWriter {
 *   writePost(): void;
 * }
 * 
 * interface UserManager {
 *   manageUsers(): void;
 * }
 * 
 * D - Dependency Inversion Principle
 * High-level modules should not depend on low-level modules
 * Both should depend on abstractions
 * 
 * Example:
 * // Abstract interface
 * interface DataFetcher {
 *   fetch(id: string): Promise<any>;
 * }
 * 
 * // Low level implementation
 * class HTTPDataFetcher implements DataFetcher {
 *   async fetch(id: string) {
 *     return await axios.get(`/api/data/${id}`);
 *   }
 * }
 * 
 * // High level component depends on abstraction
 * interface DataDisplayProps {
 *   dataFetcher: DataFetcher;
 *   id: string;
 * }
 * 
 * const DataDisplay = ({dataFetcher, id}: DataDisplayProps) => {
 *   const [data, setData] = useState(null);
 *   
 *   useEffect(() => {
 *     const getData = async () => {
 *       const result = await dataFetcher.fetch(id);
 *       setData(result);
 *     }
 *     getData();
 *   }, [id, dataFetcher]);
 *   
 *   return <div>{JSON.stringify(data)}</div>
 * }
 */