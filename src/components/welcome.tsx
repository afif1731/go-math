import React from "react";
// import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";

const Welcome: React.FC = () => {
  const googleSignIn = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google:", error);
    });
  };

  return (
    <main className="h-screen overflow-y-hidden p-[30px] text-center mt-[40px] text-[#7cc5d9] ">
      <h2 className="text-2xl pt-36 font-bold mb-5">Selamat Datang di Next Chat app.</h2>
      <div className="flex mb-[20px] justify-center">
      <Image
        src="/img/logo512.png"
        alt="ReactJs logo"
        width={100}
        height={50}
      />
      </div>
      <p className="mb-[20px]">Sign in with Google to chat by Augista</p>
      <button className="border-none bg-transparent" type="button">
        <Image
          onClick={googleSignIn}
          src="/img/btn_google_signin_dark_pressed_web.png"
          alt="sign in with google"
          width={191}
          height={46}
        />
      </button>
    </main>
  );
};

export default Welcome;
