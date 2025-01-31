"use client";
import React from "react";
import { ReactNode } from "react";
import {
  Card,
  Spacer,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTheme } from "../hooks/useTheme";
interface CustomCardProps {
  title: string | ReactNode;
  price: string;
  trainerName?: string;
  duration?: string;
  imageSrc: string;
  applyFilter?: boolean;
  buttons: ReactNode[];
}
const CustomCard: React.FC<CustomCardProps> = ({
  title,
  price,
  trainerName,
  duration,
  imageSrc,
  buttons,
  applyFilter,
}: CustomCardProps) => {
  const { color, bg } = useTheme();
  const bg2 = useColorModeValue("tomato", "#462576");

  return (
    <Card
      marginBottom="55px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.17)"
      borderRadius="11px"
      bg={bg}
      width={{ base: "230px", sm: "350.03px", md: "350.03px", lg: "350.03px" }}
      height={{ base: "368px", sm: "510px", md: "510px", lg: "510px" }}
    >
      <CardHeader pt="0" pr="0">
        <Box
          bg={bg2}
          p={{ base: 0, sm: 10, md: 10, lg: 10 }}
          pt={{ base: 8, sm: 10, md: 10, lg: 10 }}
          borderRadius="11px 11px 0 0"
          width={{ base: "230px", sm: "350px", md: "350px", lg: "350px" }}
          height={{ base: "217px", sm: "286px", md: "286px", lg: "286px" }}
        >
          <Image
            width={{ base: "170px", sm: "200px", md: "200px", lg: "200px" }}
            height={{ base: "170px", sm: "200px", md: "200px", lg: "200px" }}
            marginRight="38px"
            src={imageSrc}
            alt={String(title)}
            style={{
              filter: applyFilter ? "invert(1)" : "none",
            }}
          />
        </Box>
      </CardHeader>

      <CardBody
        marginRight={{ base: "0px", sm: "20px", md: "20px", lg: "20px" }}
        marginTop={{ base: -8, sm: 0, md: 0, lg: 0 }}
      >
        <Flex marginLeft={{ base: "9px", sm: "20px", md: "20px", lg: "20px" }}>
          <Text
            size="lg"
            fontWeight="bold"
            fontSize={{ base: "15px", sm: "23px", md: "23px", lg: "23px" }}
            color={color}
            paddingTop={1}
            textAlign="center"
          >
            {title}
          </Text>

          <Spacer />
          <Text
            color={color}
            fontSize={{ base: "23px", sm: "30px", md: "30px", lg: "30px" }}
            fontWeight="bold"
          >
            {price}
          </Text>
        </Flex>
        <Box
          color={color}
          fontSize={{ base: "13px", sm: "18px", md: "18px", lg: "18px" }}
          fontWeight="normal"
        >
          <Text mb="1">{trainerName}</Text>
          <Text>{duration}</Text>
        </Box>
      </CardBody>

      <CardFooter paddingTop={0}>
        <Flex gap={{ base: "7px", sm: "13px", md: "13px", lg: "13px" }}>
          {buttons && buttons.length > 0 ? (
            buttons.map((button, index) => (
              <React.Fragment key={index}>{button}</React.Fragment>
            ))
          ) : (
            <p>No buttons available</p>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
