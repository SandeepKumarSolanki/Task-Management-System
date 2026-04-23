"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email:email.trim(),
      password:password.trim(),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <input
          type="email"
          placeholder="Username"
          autoComplete="off"
          className="w-full border p-2.5 rounded-2xl mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
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
          onClick={handleLogin}
          className="w-40 bg-blue-600 text-white py-2.5 rounded-2xl mb-3"
        >
          {loading ? "Loading..." : "Login Now"}
        </button>
        </div>
        {/* <h2 className="flex justify-center mb-5">Login with others</h2> */}

        <button
          // type="button"
          onClick={()=>signIn("google", {
          callbackUrl: "/",
          prompt: "select_account",
          })
          }
          className="w-full border py-2.5 rounded-2xl mb-2 bg-blue-400"
        >
          Login with Google
        </button>

        <button
          // type="button"
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
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}