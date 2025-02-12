import AuthStatus from "@/components/auth-status";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">CNCShare</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="rounded-md py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Files
              </Link>
              <Link
                href="/upload"
                className="rounded-md py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Upload
              </Link>
              <Link
                href="/about"
                className="rounded-md py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                About
              </Link>
            </div>
          </div>
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
}
