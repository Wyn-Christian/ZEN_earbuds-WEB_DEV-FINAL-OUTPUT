import { createContext, useContext, useState } from "react";

const UserSource = () => {};

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "asdf1234",
    username: "John Doe",
    email: "John@sample.com",
    password: "123123",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
