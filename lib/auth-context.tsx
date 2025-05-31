import React, { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  isFetchingUser: boolean;
  signUp: ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => Promise<string | void>;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<string | void>;
  signOut: () => Promise<string | void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setIsFetchingUser(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Something went wrong when sign in!";
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await account.create(ID.unique(), email, password, username);
      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Something went wrong when sign up!";
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Something went wrong when sign out!";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isFetchingUser, isLoading, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside of the AuthProvider");
  }
  return context;
};
