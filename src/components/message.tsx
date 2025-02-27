import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface MessageType {
  uid: string;
  avatar: string;
  name: string;
  text: string;
}

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [user] = useAuthState(auth);
  const isCurrentUser = message.uid === user?.uid;

  return (
    <div className={`flex items-start mb-5 max-w-[calc(100%-50px)] ${isCurrentUser ? "ml-auto flex-row-reverse" : ""}`}>
      <img
        className="w-12 h-12 rounded-full mr-3"
        src={message.avatar}
        alt="user avatar"
      />
      <div
        className={`p-4 bg-white text-[#1c2c4c] shadow-md rounded-[20px] break-words
          ${isCurrentUser ? "rounded-br-[20px] shadow-red-500" : "rounded-bl-[20px] shadow-yellow-500"}`}
      >
        <p className="font-bold text-sm">{message.name}</p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
