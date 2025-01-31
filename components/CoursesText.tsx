"use client";

import { Text } from "@chakra-ui/react";
import { useTheme } from "../hooks/useTheme";

export default function CoursesText() {
  const { color } = useTheme();
  return (
    <>
      <Text
        color={color}
        borderBottom={"2px solid"}
        width={{ base: "220px", sm: "220px", md: "220px", lg: "250px" }}
        mt={{ base: "30px", sm: "60px", md: "60px", lg: "0px" }}
        ml={{ base: 0, sm: 270, md: 450, lg: 0 }}
        fontWeight="bold"
        fontSize={{ base: "20px", sm: "27px", md: "27px", lg: "27px" }}
        textAlign={{
          base: "center",
          sm: "inherit",
          md: "inherit",
          lg: "inherit",
        }}
        paddingBottom={{ base: "10px", sm: "0", md: "0", lg: "0" }}
      >
        الدورات التدريبية
      </Text>
    </>
  );
}
