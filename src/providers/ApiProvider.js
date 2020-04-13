import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

import { useAuthContext } from '../providers/AuthProvider.js';

import axios from "axios";

const api_endpoint = process.env.API_ENTRYPOINT + '/api';

// ---------------------------------------------------
// Default contextual state values
// ---------------------------------------------------
const defaultState = {};

// ---------------------------------------------------
// Context provider declaration
// ---------------------------------------------------
const StateContext = React.createContext();
const DispatchContext = React.createContext();

const ApiProvider = ({ children }) => {
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

  const [authState, authDispatch] = useAuthContext();
  const { auth } = authState;
  const authToken = auth ? auth.token : 'none';

  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  if (state === undefined) {
    throw new Error("Ut oh, where is my state?");
  }

  if (dispatch === undefined) {
    throw new Error("Ut oh, where is my dispatch?");
  }

  async function apiFetchEntity(endpoint,id,external_dispatcher) {
    let response = await axios({
      method: 'get',
      url: process.env.API_ENTRYPOINT + '/api/'+endpoint+'/'+id+'.jsonld',
      headers: {
        'Accept': 'application/ld+json',
        'Authorization': 'Bearer ' + authToken
      },
    });
    external_dispatcher(response.data)
  }

  async function apiUpdateEntity(endpoint,id,data,external_dispatcher) {
    let response = await axios({
      method: 'patch',
      data: data,
      url: process.env.API_ENTRYPOINT + '/api/'+endpoint+'/'+id+'.jsonld',
      headers: {
        'Accept': 'application/ld+json',
        'Content-Type' : 'application/merge-patch+json',
        'Authorization': 'Bearer ' + authToken
      },
    });
    external_dispatcher(response.data)
  }

  async function apiFetchCollection(endpoint,params,external_dispatcher) {
    let itemsPerPage = params.itemsPerPage || 10;
    let page = params.page || 1;
    let response = await axios({
      method: 'get',
      url: process.env.API_ENTRYPOINT + '/api/'+endpoint+'.jsonld?itemsPerPage=' + itemsPerPage + '&page=' + page,
      headers: {
        'Accept': 'application/ld+json',
        'Authorization': 'Bearer ' + authToken
      },
    });
    external_dispatcher(response.data)
  }

  return { apiFetchEntity, apiUpdateEntity, apiFetchCollection };
};

const useApiContext = () => {
  return [useStateContext(), useDispatchContext()]
}

// ---------------------------------------------------
// final export (addapt useContext and Provider name)
// ---------------------------------------------------
export { useApiContext, ApiProvider, StateContext, DispatchContext };
