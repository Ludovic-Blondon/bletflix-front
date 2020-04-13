import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

// ---------------------------------------------------
// Default contextual state values
// ---------------------------------------------------
const defaultState = {
  counter:0,
};

// ---------------------------------------------------
// Context provider declaration
// ---------------------------------------------------
const StateContext = React.createContext();
const DispatchContext = React.createContext();

const TestProvider = ({ children }) => {
  const [state, dispatch] = useImmer({ ...defaultState });
  // alternatively without Immer:  const [state, dispatch] = useState({});

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

// ---------------------------------------------------
// Context usage function declaration
// ---------------------------------------------------
function useStateContext() {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error("Ut oh, where is my state?");
  }

  return state;
};

function useDispatchContext() {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error("Ut oh, where is my dispatch?");
  }

  function testSet(value) {
    dispatch(draft => { draft.counter = value; });
  }

  function testIncrement() {
    dispatch(draft => { draft.counter = draft.counter + 1; });
  }

  function testDecrement() {
    dispatch(draft => { draft.counter = draft.counter - 1; });
  }

  return { testSet, testIncrement, testDecrement };
};

const useTestContext = () => {
  return [useStateContext(), useDispatchContext()]
}

// ---------------------------------------------------
// final export (addapt useContext and Provider name)
// ---------------------------------------------------
export { useTestContext, TestProvider, StateContext, DispatchContext };


// ---------------------------------------------------
// Context initialisation in APP
// ---------------------------------------------------
/*
import React from 'react';
import { TestProvider } from './providers/TestProvider.js';
import { TestProvider2 } from './providers/TestProvider2.js';

function App() {
  return (
    <TestProvider>
      <TestProvider2>
        <div>Sample App content</div>
      </TestProvider2>
    </TestProvider>
  );
}
export default App
*/

// ---------------------------------------------------
// usage in a react component :
// ---------------------------------------------------
/*
import React, { useEffect } from 'react';
import { useTestContext } from './TestProvider.js';

const MyComponent = () => {
  const [testState, testDispatch] = useTestContext();
  const { counter } = testState;
  const { testIncrement } = testDispatch;

  return (
    <button onClick={() => testIncrement()}>{counter}</button>
  );
};

export default MyComponent;
*/
