"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();
  return (
    <div className="flex justify-between">
      <div>Muzi</div>
      <div>
        {session.data?.user ? (
          <button
            className="m-2 px-4 py-2 bg-blue-400"
            onClick={() => signOut()}
          >
            SignOut
          </button>
        ) : (
          <button
            className="m-2 px-4 py-2 bg-blue-400"
            onClick={() => signIn()}
          >
            SignIn
          </button>
        )}
      </div>
    </div>
  );
}
