import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AuthUserContext from '../interfaces/AuthUserContext';
import { User } from '../interfaces/User';

const AuthContext = createContext<AuthUserContext | undefined>(undefined);

let logoutTimer: NodeJS.Timeout | undefined;

export default function AuthProvider({ children }: PropsWithChildren) {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<
    Date | undefined
  >();

  const logIn = useCallback((user: User, expirationDate?: Date) => {
    setLoggedUser(user);
    setTokenExpirationDate(expirationDate);
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'loggedUser',
      JSON.stringify({ user, expirationDate: tokenExpiration.toISOString() }),
    );
  }, []);

  const logOut = useCallback(() => {
    setLoggedUser(undefined);
    localStorage.removeItem('loggedUser');
  }, []);

  useEffect(() => {
    const storedUser: { user: User; expirationDate: string } | null =
      JSON.parse(localStorage.getItem('loggedUser') || 'null');
    if (storedUser && new Date(storedUser.expirationDate) > new Date()) {
      logIn(storedUser.user, new Date(storedUser.expirationDate));
    }
  }, [logIn]);

  useEffect(() => {
    if (loggedUser?.token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [loggedUser?.token, logOut, tokenExpirationDate]);

  const contextValue = useMemo(
    () => ({ loggedUser, logIn, logOut }),
    [logIn, logOut, loggedUser],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
