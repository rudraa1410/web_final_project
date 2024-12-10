"use client";

import Link from "next/link";
import { useUserAuth } from "../app/_utils/auth-context";
import { Heart, Home, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ searchComponent }) {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push("/LoginPage");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/MainPage" className="text-2xl font-bold text-yellow-400">
          MovieDB
        </Link>
        <nav className="flex items-center space-x-4">
          {searchComponent}
          <Link href="/MainPage" className="text-gray-300 hover:text-yellow-400">
            <Home size={24} />
            </Link>
          <Link
            href="/WatchListPage"
            className="text-gray-300 hover:text-yellow-400"
          >
            <Heart size={24} />
          </Link>
          {user ? (
            <>
              <span className="text-gray-300">Hello, {user.displayName || "User"}!</span>
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-yellow-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/LoginPage"
              className="text-gray-300 hover:text-yellow-400"
            >
              <User size={24} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
