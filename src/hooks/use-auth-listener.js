import { useState, useEffect, useContext} from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
    const {firebase} = useContext(FirebaseContext);

    useEffect(()=> {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // we have a user therefore we can store the user in LS
                localStorage.setItem("authUser", JSON.stringify(authUser));
                setUser(authUser);
            }
            else{
                // we don't have a user therefore clean LS
                localStorage.removeItem("authUser");
                setUser(null);
            }
            // job is done, clean the listener
            return ()=> listener();
        })
    },[firebase])
    return { user };
}