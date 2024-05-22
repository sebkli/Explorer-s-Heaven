import { User } from './User';

interface AuthUserContext {
  loggedUser?: User;
  logIn: (user: User, expirationDate?: Date) => void;
  logOut: () => void;
}

export default AuthUserContext;
