const renderFunctions = [];
const states = [];
let stateIndex = 0;

/**
 * Global useState function. To be used at the root level only!
 *
 * @param {any} initialValue serializable initial value or a sync function returning an initial value
 * @returns an array with a getter and setter
 */
function useState(initialValue) {
  const currentIndex = stateIndex;

  // Initialize state if it doesn't exist
  if (states[currentIndex] === undefined) {
    if (typeof initialValue === "function") {
      states[currentIndex] = initialValue();
    } else {
      states[currentIndex] = initialValue;
    }
  }

  const setState = (newValue) => {
    if (typeof newValue === "function") {
      states[currentIndex] = newValue(states[currentIndex]);
    } else {
      states[currentIndex] = newValue;
    }
    renderAll(); // Re-render after state change
  };

  // Move to next state for next useState call
  stateIndex++;

  // Return current state and setState function
  return [() => states[currentIndex], setState];
}

/**
 * Global useStore function that uses localStorage for persistence. To be used at the root level only!
 *
 * @param {string} key the name of your localStorage key
 * @param {any} initialValue serializable initial value or a sync function returning an initial value
 * @returns an array with a getter and setter
 */
function useStore(key, initialValue) {
  let getStore = () => {
    const value = window.localStorage.getItem(key);
    if (value === null) {
      if (typeof initialValue === "function") {
        const result = initialValue();
        // no parse needed
        return result;
      } else {
        // no parse needed
        return initialValue;
      }
    }
    return JSON.parse(value);
  };

  const setStore = (newValue) => {
    if (typeof newValue === "function") {
      window.localStorage.setItem(key, JSON.stringify(newValue(getStore())));
    } else {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
    renderAll(); // Re-render after state change
  };
  // Return current state and setState function
  return [getStore, setStore];
}

function renderAll() {
  stateIndex = 0; // Reset index before rendering

  renderFunctions.map((fn) => {
    document.getElementById(fn.name).innerHTML = fn();
  });
}

/**
 * Renders renderRoot and sets it to the innerHTML of the element with id 'renderRoot'
 */
function reactify(renderFunction = renderRoot) {
  if (typeof renderFunction !== "function") {
    return;
  }
  stateIndex = 0; // Reset index before rendering
  renderFunctions.push(renderFunction);
  document.getElementById(renderFunction.name).innerHTML = renderFunction();
}
