"use client"
import { createContext, useState } from 'react';
import User from '../models/User';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({user: null, setUser(){}});

const UserProvider = ({ children }: {children:any}) => {

  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext as default, type UserContextType }