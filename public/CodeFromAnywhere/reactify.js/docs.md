# Reactify.js Documentation

Reactify.js is a lightweight library that simplifies raw HTML + JS development by adding React-like state management capabilities. It allows you to create interactive web applications without the need for build tools or a complex runtime.

## Key Concepts

1. **Global State Management**: Unlike React, all state hooks in Reactify.js are used at the root level and are globally accessible.
2. **Automatic Re-rendering**: The library automatically re-renders the entire application when state changes.
3. **localStorage Integration**: Provides built-in support for persistent state using localStorage.

## Core Functions

### 1. useState(initialValue)

Creates a stateful value and a function to update it.

- **Parameters**:
  - `initialValue`: The initial state value or a function that returns the initial state.
- **Returns**: An array containing:
  - A getter function that returns the current state value.
  - A setter function to update the state.

Example:

```javascript
const [getCount, setCount] = useState(0);

// Using the getter
console.log(getCount()); // Output: 0

// Using the setter
setCount(1);
console.log(getCount()); // Output: 1

// Using a function with the setter
setCount((prev) => prev + 1);
console.log(getCount()); // Output: 2
```

### 2. useStore(key, initialValue)

Similar to `useState`, but persists the state in localStorage.

- **Parameters**:
  - `key`: A string key for localStorage.
  - `initialValue`: The initial state value or a function that returns the initial state.
- **Returns**: Same as `useState`.

Example:

```javascript
const [getStoredCount, setStoredCount] = useStore("count", 0);

// Using the getter
console.log(getStoredCount()); // Output: 0 (or the last stored value)

// Using the setter
setStoredCount(5);
console.log(getStoredCount()); // Output: 5
// The value 5 is now stored in localStorage
```

### 3. reactify()

Renders the application by calling the `renderRoot` function and updating the DOM.

- This function is automatically called when state changes.
- It should be called once at the end of your script to initiate the first render.

## Usage Guidelines

1. Define a `renderRoot` function that returns the HTML string for your entire application.
2. Use `useState` and `useStore` at the root level of your script.
3. Call `reactify()` at the end of your script for the initial render.

## Example Application

Here's a simple counter application using Reactify.js:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reactify.js Counter</title>
    <script src="https://reactify-js.vercel.app"></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      const [getCount, setCount] = useState(0);
      const [getStoredCount, setStoredCount] = useStore("storedCount", 0);

      function incrementCount() {
        setCount((prev) => prev + 1);
      }

      function incrementStoredCount() {
        setStoredCount((prev) => prev + 1);
      }

      function renderRoot() {
        return `
                <div>
                    <h1>Reactify.js Counter</h1>
                    <p>Count: ${getCount()}</p>
                    <button onclick="incrementCount()">Increment Count</button>
                    <p>Stored Count: ${getStoredCount()}</p>
                    <button onclick="incrementStoredCount()">Increment Stored Count</button>
                </div>
            `;
      }

      reactify();
    </script>
  </body>
</html>
```

This example demonstrates:

- Using `useState` for regular state management
- Using `useStore` for persistent state management
- Defining a `renderRoot` function that returns the HTML string
- Using state values and event handlers in the rendered HTML
- Calling `reactify()` to initiate the first render

Remember, all state management should be done at the root level, and the entire application will re-render on any state change. This approach is simple but may not be suitable for large, complex applications where performance is critical.
