"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../app/theme";
import { MountedProvider } from "./MountedProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MountedProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </MountedProvider>
  );
}
