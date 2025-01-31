import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Box, Text } from "@chakra-ui/react";
interface Props {
  header: string;
  text: string;
  icon: string | StaticImport;
}
const InfoSectionComponent: React.FC<Props> = ({
  header,
  text,
  icon,
}: Props) => {
  return (
    <Box
      mb={8}
      display={"flex"}
      flexDirection={"column"}
      alignItems={{ base: "center", md: "center", lg: "start" }}
    >
      <Box display="flex" gap={4} mb={4}>
        <Image
          src={icon}
          alt="quiz"
          height={32}
          width={32}
          style={{ objectFit: "contain" }}
        />
        <Text variant={"heading3"} fontWeight={700}>
          {header}
        </Text>
      </Box>
      <Text
        variant={"body1"}
        textAlign={{ base: "center", md: "center", lg: "start" }}
        w={{ base: "47%", md: "88%", lg: "100%" }}
      >
        {text}
      </Text>
    </Box>
  );
};

export default InfoSectionComponent;
