"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Google Sign-In Method
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Set session persistence to browser session only
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  // GitHub Sign-In Method
  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      // Set session persistence to browser session only
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("GitHub Sign-In Error:", error);
      throw error;
    }
  };

  const emailSignUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign-Up Error:", error);
      throw error;
    }
  };

  const emailSignIn = async (email, password) => {
    try {
      // Set session persistence to browser session only
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign-In Error:", error);
      throw error;
    }
  };

  const firebaseSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-Out Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, emailSignUp, emailSignIn, googleSignIn, firebaseSignOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
