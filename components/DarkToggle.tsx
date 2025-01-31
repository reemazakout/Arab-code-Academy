"use client";

import { Button, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      fontWeight="bold"
      variant="ghost"
      _hover={{
        transform: "scale(1.05)",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      p={0}
      width="fit-content"
      height="fit-content"
      transition="all 0.3s ease"
    >
      <span
        style={{
          display: "inline-block",
          color: colorMode === "light" ? "#000000" : "#FFD700",
          fontSize: "1.5rem",
        }}
      >
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </span>

      <span
        style={{
          color: "white",
          marginLeft: "8px",
          fontSize: "1rem",
          paddingRight: "5px",
        }}
      ></span>
    </Button>
  );
}
