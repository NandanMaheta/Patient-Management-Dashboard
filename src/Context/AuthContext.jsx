import { useContext, createContext, useState } from "react";

const AuthContext = createContext(); //created context


//Created context provider
//Providing props such as isLoggedin, user, functions
export function AuthProvider({ children }) {
  const [isLoggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userdata) => {
    setLoggedin(true);
    setUser(userdata);
  };

  const logout = () => {
    setLoggedin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{isLoggedin,user,login,logout}}>
        {children}
    </AuthContext.Provider>
  )

}



//useAuth() is a custom hook that makes it easier to use AuthContext.

//Instead of writing receiving context - const { isAuthenticated, login, logout } = useContext(AuthContext);
//we can simply write this: const { isAuthenticated, login, logout } = useAuth();


export function useAuth(){
    return useContext(AuthContext)
}
