"use client";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import CustomLine from "./CustomLine";
import Image from "next/image";
import masaratlogo from "../../public/images/masaratlogo.png";

export default function InfoAndPolicy() {
  return (
    <>
      <GridItem
        display="flex"
        flexDirection="column"
        alignItems={{ base: "center", lg: "flex-start" }}
        w="100%"
        px={{ base: 4, md: 0 }}
      >
        <Grid
          templateColumns={{
            base: "repeat(2, minmax(200px, 1fr))",
            lg: "repeat(2, 1fr)",
          }}
          gap={{ base: 6, md: 0, lg: 20 }}
          justifyContent="center"
          alignItems="center"
          width="100%"
          maxW={{ base: "100%", md: "600px" }}
        >
          {/* "معلومات" section */}
          <Box>
            <Text
              fontSize="heading2"
              fontWeight="bold"
              color="white"
              textAlign={{ base: "center", lg: "right" }}
            >
              معلومات
            </Text>
            <CustomLine
              width="130px"
              bg="white"
              marginBottom={8}
              marginTop={3}
              mx={{ base: "auto", lg: "0" }}
            />
            <Flex
              direction="column"
              alignItems={{ base: "center", lg: "flex-start" }}
              gap={{ lg: 4, md: 0 }}
            >
              <Text color="white" fontSize={"19px"} py={{ base: 4, lg: 0 }}>
                المساعدةوالدعم
              </Text>
              <Text color="white" fontSize={"19px"} py={{ base: 4, lg: 0 }}>
                رسالةالاكاديمية
              </Text>
              <Text color="white" fontSize={"19px"} py={{ base: 4, lg: 0 }}>
                حول الاكاديمية
              </Text>
            </Flex>
          </Box>

          {/* "السياسات" section */}
          <Box width={{ base: "80%", md: "100%", lg: "100%" }}>
            <Text
              fontSize="heading2"
              fontWeight="bold"
              color="white"
              textAlign={{ base: "center", lg: "right" }}
            >
              معلومات
            </Text>
            <CustomLine
              width="130px"
              bg="white"
              marginBottom={8}
              marginTop={3}
              mx={{ base: "auto", lg: "0" }}
            />
            <Flex
              direction="column"
              alignItems={{ base: "center", lg: "flex-start" }}
              gap={{ lg: 4, md: 0 }}
            >
              <Text color="white" fontSize={"19px"} py={{ base: 4, lg: 0 }}>
                سياسية استخدام
              </Text>
              <Text color="white" fontSize={"19px"} py={{ base: 4, lg: 0 }}>
                سياسية استخدام
              </Text>
              <Text color="white" fontSize={"19px"} py={{ base: 4, lg: 0 }}>
                اخلاءمسؤلية
              </Text>
            </Flex>
          </Box>
        </Grid>

        {/* Button for المسارات التعليمية */}
        <Box
          mt={{ base: 8, lg: "100px" }}
          width="100%"
          display={{ base: "block", lg: "block" }}
        >
          <Button
            bg="secondary"
            width={{ base: "200px", lg: "310px", md: "310px" }}
            height={{ base: "60px", lg: "80px", md: "80px" }}
            color="white"
            _hover={{ bg: "secondaryDark" }}
            display="flex"
            borderRadius={"5px"}
            alignItems="center"
            justifyContent="center"
            gap="10px"
            mt={{ base: 4, lg: 0 , md:0}}
            mb={{ base: 10, lg: 0 , md:2}}
            mx={{ base: "auto", lg: "0" }}
          >
            <Image
              src={masaratlogo}
              alt="logo"
              width={36}
              height={36}
              style={{ objectFit: "contain" }}
              unoptimized
            />
            <Text fontSize={{ base: "14px", lg: "19px" }} fontWeight="bold">
              المسارات التعليمية
            </Text>
          </Button>
        </Box>
      </GridItem>
    </>
  );
}
