"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, logout } from "@/lib/api/auth";

interface HeaderProps {
  variant?: "main" | "simple" | "close";
  showSearch?: boolean;
  showProfile?: boolean;
  closeLink?: string;
}

export default function Header({
  variant = "main",
  showSearch = false,
  showProfile = false,
  closeLink = "/main",
}: HeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState("사용자");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserName(user.name);
      setProfileImage(user.profileImage);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b-2 border-black">
      {/* Logo */}
      <Link href="/main" className="flex items-center">
        <Image
          src="/icons/DORIV.png"
          alt="DORIV"
          width={120}
          height={35}
          className="w-auto h-auto"
          priority
        />
      </Link>

      {/* Search Bar - Only on main page */}
      {showSearch && (
        <div className="flex-1 max-w-[400px] mx-10 flex items-center border-2 border-black rounded overflow-hidden">
          <input
            type="text"
            placeholder="주제 검색..."
            className="flex-1 px-4 py-2.5 border-0 outline-none text-sm"
          />
          <button className="px-4 py-2.5 bg-[#FEE500] border-l-2 border-black cursor-pointer hover:bg-[#FFD700] flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rounded-full relative">
              <div className="absolute -bottom-[6px] -right-[6px] w-[2px] h-[6px] bg-black rotate-45"></div>
            </div>
          </button>
        </div>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Profile - Only on main page */}
        {showProfile && (
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-black">{userName}</div>
                <div className="text-[11px] text-gray-600">DORIV User</div>
              </div>
              <button
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="w-11 h-11 rounded-full bg-[#E8E8E8] border-2 border-black flex items-center justify-center relative overflow-hidden hover:opacity-80 transition-opacity"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {/* Head */}
                    <div className="absolute top-[8px] w-[14px] h-[14px] bg-black rounded-full"></div>
                    {/* Body */}
                    <div className="absolute bottom-[2px] w-[24px] h-[16px] bg-black rounded-t-full"></div>
                  </>
                )}
              </button>
            </div>

            {/* Logout Menu */}
            {showLogoutMenu && (
              <div className="absolute right-0 top-[calc(100%+8px)] bg-white border-2 border-black rounded shadow-[4px_4px_0px_rgba(0,0,0,1)] min-w-[150px] z-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-sm font-semibold text-left hover:bg-[#FEE500] transition-colors border-0"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}

        {/* Back to Dashboard Button - For other pages */}
        {variant === "simple" && (
          <Link
            href="/main"
            className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded bg-white hover:bg-gray-100 transition-colors"
          >
            <span className="text-lg">←</span>
            <span className="text-sm font-semibold">대시보드로 돌아가기</span>
          </Link>
        )}

        {/* Close Button - For modal-like pages */}
        {variant === "close" && (
          <Link
            href={closeLink}
            className="w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl font-bold">×</span>
          </Link>
        )}
      </div>
    </header>
  );
}
