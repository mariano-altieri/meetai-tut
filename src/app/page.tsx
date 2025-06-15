"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authClient.signUp.email({ email, password, name });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authClient.signIn.email({ email, password });
  };

  if (session) {
    return (
      <div>
        User is logged in as {session.user.name} <br />
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 w-96 mx-auto mt-24">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 p-4 w-96 mx-auto mt-24"
      >
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete="username"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Button type="submit">Create user</Button>
      </form>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-4 p-4 w-96 mx-auto mt-24"
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
}
