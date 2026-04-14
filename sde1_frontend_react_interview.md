# SDE-1 Frontend Interview (JavaScript + React)

This interview is tailored to this repo (`interview.js`, `basics/react_hooks.js`, `basics/react_lifecycle.js`, `basics/debouncing.js`, `basics/throttling.js`, `basics/polyfill_for_reduce.js`).

## Interview Format (60 minutes)

1. Intro and project discussion (5 min)
2. JavaScript fundamentals (15 min)
3. React fundamentals (15 min)
4. Live coding (20 min)
5. Wrap-up and candidate questions (5 min)

## Round 1: Intro and Resume Deep-Dive (5 min)

### Questions
1. Walk me through one frontend feature you built end-to-end.
2. What was your role in debugging production issues?
3. What trade-off did you make between speed and code quality?

### Strong Signals
- Can explain decisions, not just implementation steps
- Mentions users, performance, edge cases, and testing
- Communicates clearly and structures thoughts

## Round 2: JavaScript Fundamentals (15 min)

### Q1. Closure
Use the closure example style from `interview.js`.
- What is a closure?
- Why does the inner function still access outer variables after outer execution ends?
- One practical use case in UI apps.

### Q2. Event Loop + Async Flow
Use `ApiCall`, `A`, `B` style from `interview.js`.
- Predict console output order and explain why.
- Difference between `await` and `.then` in execution flow.

### Q3. Debounce vs Throttle
Use `basics/debouncing.js` and `basics/throttling.js`.
- Explain the difference with real UI examples.
- Where would you use each in a React app?

### Q4. Polyfill Thinking
From `basics/polyfill_for_reduce.js`.
- Ask candidate to identify one issue in `myReduce` implementation.
- Ask them how native `reduce` behaves when initial value is missing.

### Expected SDE-1 Level
- Correct core concepts
- Can reason about asynchronous behavior
- Spots basic edge cases (empty array, stale timers, wrong output order)

## Round 3: React Fundamentals (15 min)

### Q1. Hooks Basics
Based on `basics/react_hooks.js`.
- Rules of hooks.
- `useState` update patterns for objects.
- `useRef` vs `useState`: when and why.

### Q2. useEffect and Cleanup
Based on debounce snippet in `interview.js`.
- Why cleanup is required.
- What happens if cleanup is skipped.
- Dependency array mistakes and stale values.

### Q3. Lifecycle Mapping
From `basics/react_lifecycle.js`.
- Map class lifecycle methods to `useEffect`.
- Explain mount/update/unmount behavior with dependencies.

### Expected SDE-1 Level
- Understands render/effect cycle
- Avoids common anti-patterns
- Can discuss practical bugs (extra API calls, memory leaks)

## Round 4: Live Coding (20 min)

### Problem Statement
Build a React component with:
1. Text input
2. Debounced history save (500ms)
3. Undo and Redo actions

Use the pattern from `interview.js`, but ask candidate to fix edge cases.

### Must-Have Behaviors
1. User typing saves snapshots with debounce
2. Undo should go to previous valid state
3. Redo should only work after undo
4. New typing after undo clears redo history
5. No memory leaks from timers

### Hints (if candidate is stuck)
1. Keep history as stacks
2. Use `useRef` for mutable stacks and timer IDs
3. Guard against empty-stack operations

### Evaluation During Coding
- Breaks down problem into state model first
- Handles edge cases
- Writes readable code and explains decisions
- Tests manually with meaningful scenarios

## Scoring Rubric (0-10)

1. JavaScript fundamentals: 0-3
2. React fundamentals: 0-3
3. Problem solving + coding quality: 0-3
4. Communication: 0-1

### Decision Bands
- 8-10: Strong Hire
- 6-7: Hire / Lean Hire
- 4-5: Lean No Hire
- 0-3: No Hire

## Quick Follow-up Questions (if time remains)

1. How would you persist undo history in `localStorage`?
2. How would you test the debounced undo/redo behavior in Jest?
3. How would you optimize this component for very long text input sessions?
