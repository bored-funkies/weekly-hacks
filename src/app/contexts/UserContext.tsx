import { createContext, useState } from 'react';
import User from '../models/User';

interface UserContextType {
  user: User | {};
  setUser: (user: User | {}) => void;
}

const UserContext = createContext<UserContextType>({user: {}, setUser(){}});

const UserProvider = ({ children }: {children:any}) => {

  const [user, setUser] = useState<User | {}>({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext as default, type UserContextType }