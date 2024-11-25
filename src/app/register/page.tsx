"use client";

import Register from "@/components/auth/Register";
import Appbar from "@/components/menu/Navbar";

export default function RegisterPage() {
  return (
    <div className="flex h-screen flex-col">
      <Appbar />
      <Register />
    </div>
  );
}
