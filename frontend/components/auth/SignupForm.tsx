"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      setError("Fill all fields");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Signup</h2>

        <input
          placeholder="Enter your Name"
          className="w-full border p-2.5 rounded-2xl mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Enter your Email"
          autoComplete="off"
          className="w-full border p-2.5 rounded-2xl mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your Password"
          autoComplete="new-password"
          className="w-full border p-2.5 rounded-2xl mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}
        <div className="flex justify-center">
        <button
          onClick={handleSignup}
          className="w-40 bg-blue-600 text-white py-2.5 rounded-2xl mb-3"
        >
          Signup
        </button>
        </div>

        <button
          onClick={()=>
            signIn("google",{
              callbackUrl:"/",
              prompt:"select_account",
            })
          }
          className="w-full border py-2.5 rounded-2xl mb-2 bg-blue-400"
        >
          Login with Google
        </button>

        <button
          onClick={() =>
            signIn("github", {
              callbackUrl: "/",
              prompt: "login",
            })
          }
          className="w-full border py-2.5 rounded-2xl bg-blue-400"
        >
          Login with GitHub
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}