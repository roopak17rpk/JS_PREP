/**
 * npm
 *
 * npm is a powerful package manager for JavaScript and Node.js. It serves as a central repository
 * for open-source JavaScript packages and provides tools for managing project dependencies.
 *
 * Key features of npm:
 * 1. Package installation and management
 * 2. Version control for dependencies
 * 3. Script running for project tasks
 *
 * npm init:
 * The 'npm init' command initializes a new Node.js project. It prompts you with a series of
 * questions about your project and generates a package.json file based on your responses.
 *
 * package.json:
 * The package.json file is a crucial component of any Node.js project. It serves as a
 * manifest for your project, containing metadata and configuration information.
 *
 * Responsibilities of package.json:
 * 1. Lists project dependencies and their versions
 * 2. Defines scripts for various project tasks
 * 3. Specifies project metadata (name, version, description, etc.)
 * 4. Configures project settings and behavior
 *
 * By using npm and maintaining a well-structured package.json, developers can easily
 * share, collaborate, and manage their JavaScript projects efficiently.
 *
 * Diagram 1: npm and package.json Workflow
 *
 * +-------------------+
 * |       npm         |
 * +-------------------+
 *           |
 *           v
 * +-------------------+
 * |    npm install    |
 * +-------------------+
 *           |
 *           v
 * +-------------------+
 * |    package.json   |
 * +-------------------+
 *           |
 *           v
 * +-------------------+
 * | Project Structure |
 * +-------------------+
 *     |     |     |
 *     v     v     v
 * +-----+ +-----+ +-----+
 * | Dev | | Prod| |Build|
 * |Deps | |Deps | |Scrip|
 * +-----+ +-----+ +-----+
 *
 * This diagram illustrates the relationship between npm, package.json, and the project structure.
 * npm is used to install dependencies, which are then listed in package.json. The package.json
 * file defines the project structure, including development and production dependencies, as well
 * as build scripts.
 *
 * Diagram 2: npm init Workflow
 *
 * +-------------------+
 * |     npm init      |
 * +-------------------+
 *           |
 *           v
 * +-------------------+
 * |  Project Details  |
 * +-------------------+
 *     |     |     |
 *     v     v     v
 * +-----+ +-----+ +-----+
 * |Name | |Vers-| |Desc-|
 * |     | |ion  | |ript.|
 * +-----+ +-----+ +-----+
 *     |     |     |
 *     v     v     v
 * +-----+ +-----+ +-----+
 * |Entry| |Test | |Git  |
 * |Point| |Cmd  | |Repo |
 * +-----+ +-----+ +-----+
 *           |
 *           v
 * +-------------------+
 * | package.json file |
 * |    generated      |
 * +-------------------+
 *
 * This diagram shows the npm init process. It starts with the npm init command, which prompts
 * for various project details. These details include the project name, version, description,
 * entry point, test command, and git repository. After collecting this information, npm
 * generates a package.json file with the provided details.
 *
 * Difference between devDependencies and normal dependencies:
 *
 * 1. Normal Dependencies:
 *    - Required for the application to run in production.
 *    - Listed in the "dependencies" section of package.json.
 *    - Installed using: npm install <package-name>
 *    - Example: npm install react
 *
 * 2. DevDependencies:
 *    - Needed only for development and testing.
 *    - Listed in the "devDependencies" section of package.json.
 *    - Installed using: npm install <package-name> --save-dev
 *    - Example: npm install jest --save-dev
 *
 * Key Differences:
 * - Purpose: Normal for production runtime, Dev for development processes.
 * - Installation: Normal installed by default, Dev only when specified.
 * - Deployment: Normal included in production, Dev typically excluded.
 *
 * Additional Commands:
 * - Install all dependencies: npm install
 * - Install only production dependencies: npm install --production
 *
 * Example in package.json:
 * {
 *   "dependencies": {
 *     "react": "^17.0.2"
 *   },
 *   "devDependencies": {
 *     "jest": "^27.0.6"
 *   }
 * }
 */


//JSX syntax. will create React.Element by babel.
// React.Element is a JS Object.
// using render method it is changed to HTML.
const jsx = <h1>hello</h1>;

//function based component.
