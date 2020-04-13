import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

import axios from "axios";

const login_endpoint = process.env.API_ENTRYPOINT + '/login';

let _auth = null
try {
  _auth = window.localStorage.getItem('auth') || null
  _auth = _auth ? JSON.parse(_auth) : null;
} catch(e) {
  // nothing to do ^^
}

// ---------------------------------------------------
// Default contextual state values
// ---------------------------------------------------
const defaultState = {
  auth: _auth,
};

// ---------------------------------------------------
// Context provider declaration
// ---------------------------------------------------
const StateContext = React.createContext();
const DispatchContext = React.createContext();

const AuthProvider = ({ children }) => {
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
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  if (state === undefined) {
    throw new Error("Ut oh, where is my state?");
  }

  if (dispatch === undefined) {
    throw new Error("Ut oh, where is my dispatch?");
  }

  async function authLogin(email,password, external_dispatcher) {
    try {
      var response = await axios.post(login_endpoint,{
        email:email,
        password:password,
      })
      if(response.data.token)
      {
        localStorage.setItem('auth',JSON.stringify(response.data));
        dispatch(draft => { draft.auth = response.data; });
        external_dispatcher(response.data)
      }
      else
      {
        localStorage.removeItem('auth');
        dispatch(draft => { draft.auth = false; });
        external_dispatcher(response.data)
      }
    } catch(e) {
      localStorage.removeItem('auth');
      dispatch(draft => { draft.auth = false; });
      external_dispatcher(e.response.data)
    }
  }

  function authLogout() {
    localStorage.removeItem('auth');
    dispatch(draft => { draft.auth = null; });
  }

  function authIsLogged() {
    return state.auth ? true : false;
  }

  function authIsAdmin() {
    return state.auth && state.auth.roles.includes('ROLE_ADMIN') ? true : false;
  }

  return { authLogin, authLogout, authIsLogged, authIsAdmin };
};

const useAuthContext = () => {
  return [useStateContext(), useDispatchContext()]
}

// ---------------------------------------------------
// final export (addapt useContext and Provider name)
// ---------------------------------------------------
export { useAuthContext, AuthProvider, StateContext, DispatchContext };
