import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export let UserContext = createContext();

export default function UserContextProvider(props) {
  
  const [UserLogin, setUserLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : null
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") ? localStorage.getItem("userName") : null
  );

  useEffect(() => {
    if (UserLogin) {
      localStorage.setItem("userToken", UserLogin);
      
      const decodedToken = jwtDecode(UserLogin);
      setUserId(decodedToken.id);
      setUserName(decodedToken.name);
      localStorage.setItem("userId", decodedToken.id, decodedToken.name);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      setUserId(null);
    }
  }, [UserLogin]);


  return (
    <UserContext.Provider value={{ UserLogin, setUserLogin, userId, userName }}>
      {props.children}
    </UserContext.Provider>
  );
}
