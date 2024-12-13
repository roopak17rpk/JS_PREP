/**
 * on global level there are many state management libraries
 *
 * 1. redux
 * 2. zustand
 * 3. context api
 * 4. vuex
 * 5. mobx
 * 6. jotai
 * 7. valtio
 * 8. recoil
 *
 * states stored in this are reactive(changes ui if theya re changed)
 *
 * MobX - State Management Library
 * 
 * Core Concepts:
 * 1. Observable State - Data that can be tracked for changes
 *    - Can be objects, arrays, primitives
 *    - Automatically tracks dependencies
 * 
 * 2. Actions - Methods that modify state
 *    - Must be used to change observable state
 *    - Ensures state changes are traceable
 *    - Can be synchronous or async
 * 
 * 3. Computed Values - Values derived from state
 *    - Automatically update when dependencies change
 *    - Cached until dependencies change
 *    - Helps optimize performance
 * 
 * 4. Reactions - Side effects that run on state changes
 *    - autorun() - Runs immediately and on any state change
 *    - reaction() - Runs when specific data changes
 *    - when() - Runs once when condition is met
 * 
 * Flow:
 * Action -> Changes Observable State -> Computed Values Update -> 
 * Reactions Fire -> UI Re-renders
 * 
 * Benefits:
 * - Simple & straightforward API
 * - Automatic dependency tracking
 * - Optimized rendering
 * - Works with any UI framework
 *
 */
