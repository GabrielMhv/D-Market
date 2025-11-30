"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/firebase/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin();
      if (!admin) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-16 h-16 border-4"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
