import React, {useState} from 'react';

const userDefault ={
    user:{ id: '', name: '', avatar: '', country: '' },
    setUser: ()=>{}
}

const UserContext = React.createContext(userDefault);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userDefault);

  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  );
};

export {UserContext}
