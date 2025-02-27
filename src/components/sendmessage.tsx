"use client";

import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { runGoMath } from 'gemini';

interface SendMessageProps {
  scroll: React.MutableRefObject<HTMLSpanElement | null>;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll }) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("User not authenticated");
      return;
    }

    const { uid, displayName, photoURL } = currentUser;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    const botResult = await runGoMath(message);

    await addDoc(collection(db, "messages"), {
      text: botResult,
      name: "GoMath",
      avatar: "https://i.imgflip.com/7olxe3.jpg?a483264",
      createdAt: serverTimestamp(),
      uid: "12345678",
    });

    setMessage("");
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage} className="fixed bottom-0 w-full p-4 bg-[#4c768d] flex">
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="h-10 px-3 rounded-l-md border-none flex-grow bg-white text-[#1c2c4c] text-base placeholder-gray-300 focus:outline-none focus:border-b-2 focus:border-[#7cc5d9]"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="w-[70px] h-10 p-2 rounded-r-md text-[#242443] border border-[#7cc5d9] bg-[#7cc5d9] font-semibold hover:bg-[#65b1c8] transition"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
