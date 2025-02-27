"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./message";
import SendMessage from "./sendmessage";

interface MessageType {
  id: string;
  text: string;
  createdAt: number;
  uid: string;
  avatar: string;
  name: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scroll = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const fetchedMessages: MessageType[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          fetchedMessages.push({ ...data, id: doc.id } as MessageType);
        }
      });

      const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="bg-[#1c2c4c] text-[#4c768d] h-screen flex flex-col">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-6 space-y-4 pb-[100px] pt-[80px]">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={scroll}></div>
      </div>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
