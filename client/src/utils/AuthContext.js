import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("real_estate_app_ches_user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "SIGNIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "REFRESH":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "SIGNIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "SIGNOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("real_estate_app_ches_user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};