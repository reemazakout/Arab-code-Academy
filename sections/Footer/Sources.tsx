"use client";
import { Box, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import CustomLine from "./CustomLine";

export default function Sources() {
  const resourceColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(4, 1fr)",
  });

  const textAlign =
    useBreakpointValue<"left" | "center" | "right" | "justify">({
      base: "center",
      md: "center",
      lg: "right",
    }) || "center";

  return (
    <Box mt={10} mx={"auto"} w={"80%"}>
      <Text
        fontSize="heading2"
        fontWeight="bold"
        color="white"
        textAlign={textAlign}
      >
        المصادر
      </Text>
      <CustomLine
        width="130px"
        bg="white"
        marginBottom={4}
        marginTop={3}
        mx={textAlign === "center" ? "auto" : "0"}
      />
      <Grid
        templateColumns={resourceColumns}
        gap={4}
        mt={10}
        width="100%"
        justifyContent="center"
      >
        {[
          "المدونة",
          "المنتدى",
          "قاموس الكلمات",
          "دروس فيديو قصيرة",
          "ادوات ذكاء اصطناعي",
          "بنك اسئلة تقنية",
          "لغة ضاد",
          "دروس وانماط الميد جورني",
        ].map((source, index) => (
          <Box
            key={index}
            padding={4}
            border="1px solid #fff"
            borderRadius="5px"
            color="white"
            textAlign={textAlign}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {source}
          </Box>
        ))}
      </Grid>
      <CustomLine width="100%" bg="white" marginTop={10} />
    </Box>
  );
}
