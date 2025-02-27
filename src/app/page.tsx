"use client"
import { auth } from "../firebase";   
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "components/navbar"; 
import ChatBox from "components/chatbox";  
import Welcome from "components/welcome";  
import "./page.css";  

const Page = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="bg-[#1c2c4c] text-[#4c768d]">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <ChatBox />
      )}
    </div>
  );
};

export default Page;
