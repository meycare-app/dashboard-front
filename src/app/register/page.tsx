"use client";

import Register from "@/components/auth/Register";
import { Navbar } from "@/components/menu/Navbar";

export default function RegisterPage() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <Register />
    </div>
  );
}
