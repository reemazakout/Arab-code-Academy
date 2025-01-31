"use client";
import { useMounted } from "../hooks/useMountes";
interface MountedProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function MountedProvider({
  children,
  fallback = null,
}: MountedProviderProps) {
  const mounted = useMounted();

  if (!mounted) {
    return fallback;
  }

  return children;
}
