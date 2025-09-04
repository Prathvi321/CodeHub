import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        user: {
          ...state.user,
          progress: action.payload,
        },
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      dispatch({
        type: 'LOGIN',
        payload: {
          token,
          user: JSON.parse(user),
        },
      });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Update user in allUsers array
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const userIndex = allUsers.findIndex(u => u.email === userData.email);
    if (userIndex !== -1) {
      allUsers[userIndex] = userData;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }
    
    dispatch({
      type: 'LOGIN',
      payload: { user: userData, token },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProgress = (progress) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: progress });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};