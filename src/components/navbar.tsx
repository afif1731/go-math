import React from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { Trash2 } from "lucide-react"; 

const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google:", error);
    });
  };

  const signOut = (): void => {
    auth.signOut().catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  const deleteAllMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "messages", docSnap.id));
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[60px] bg-[#4c768d] text-white flex items-center justify-between px-6 z-10">
      <h1 className="text-lg font-bold">Chat App</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <button
            onClick={deleteAllMessages}
            className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
            type="button"
            aria-label="Hapus Semua Chat"
          >
            <Trash2 size={20} /> 
          </button>

          <button
            onClick={signOut}
            className="px-4 py-2 rounded-[5px] text-[#88dded] border border-[#1c2c4c] bg-[#1c2c4c] font-semibold"
            type="button"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button className="border-none bg-transparent" type="button">
          <Image
            onClick={googleSignIn}
            src="/img/btn_google_signin_dark_pressed_web.png"
            alt="sign in with google"
            width={191}
            height={46}
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
