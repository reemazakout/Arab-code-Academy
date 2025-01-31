"use client";
import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import arabacademy from "../../public/images/arabacademy.png";
import Image from "next/image";

export default function RightsSection() {
  const textAlign =
    useBreakpointValue<"left" | "center" | "right" | "justify">({
      base: "center",
      md: "center",
      lg: "right",
    }) || "center"; 

  return (
    <Flex
      justifyContent={{ base: "center", md: "space-between" }}
      mt={10}
      color="white"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      gap={{ base: 4, md: 0 }}
      px={{ base: 4, md: 0 }}
    >
      <Image
        src={arabacademy}
        alt="Arab Academy Logo"
        width={80}
        height={50}
        style={{ objectFit: "contain" }}
      />
      <Text textAlign={textAlign}>
        جميع الحقوق محفوظة © {new Date().getFullYear()} الأكاديمية العربية
        للبرمجة
      </Text>
    </Flex>
  );
}
