"use client";

import { ProfileProvider } from "@/contexts/ProfileContext";
import ProfileSidebar from "./ProfileSidebar";
import MobileBottomNav from "./MobileBottomNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="sticky top-8">
                <ProfileSidebar />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </ProfileProvider>
  );
}
