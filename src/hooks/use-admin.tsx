import { useSession } from "next-auth/react";

export function useAdmin() {
  const session = useSession();
  if (session.data?.user.id && adminUids.includes(session.data?.user.id)) {
    return {
      isAdmin: true,
    };
  }

  return {
    isAdmin: false,
  };
}

export const adminUids = [
  "23675416-0234-4db3-92f5-1f991c0c8aa5",
  "4301ebfd-dadb-4006-875d-b37493b68336",
];
