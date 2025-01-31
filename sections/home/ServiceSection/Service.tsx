"use client";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Image from "next/image";
import angleLeftIcon from "../../../public/icons/angle-left.svg";
import angleRightIcon from "../../../public/icons/angle-right.svg";
import ServiceCard from "../../../components/ServiceCard";
import icons from "../../../public/icons";
import { useTheme } from "../../../hooks/useTheme";

const cards = [
  { id: 1, title: "دروس وأنماط الميدجوزي", icon: icons.transparentBookIcon },
  { id: 2, title: "بنك الأسئلة التقنية", icon: icons.transparentQuizIcon },
  { id: 3, title: "قاموس المصطلحات التقنية", icon: icons.educationLogo },
  { id: 4, title: "لغة ضاد", icon: icons.serviceSection2 },
  {
    id: 5,
    title: "دليل أدوات الذكاء الاصطناعي",
    icon: icons.serviceSection1,
  },
  { id: 6, title: "دروس الفيديو القصيرة", icon: icons.serviceSection3 },
];

export const Service = () => {
  const { color, bg } = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPerSlide = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 3;
  const imageWidth = useBreakpointValue({ base: 55, md: 77, lg: 55 }) || 58;
  const imageHeight = useBreakpointValue({ base: 65, md: 84, lg: 55 }) || 58;

  const visibleCards = useMemo(
    () => cards.slice(currentIndex, currentIndex + cardsPerSlide),
    [currentIndex, cardsPerSlide]
  );

  const handleNext = () => {
    if (currentIndex + cardsPerSlide < cards.length) {
      setCurrentIndex(currentIndex + cardsPerSlide);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsPerSlide);
    }
  };

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      maxH={{ base: 258, md: 364, lg: 337 }}
      zIndex={2}
    >
      <Box
        color={color}
        bg={bg}
        boxShadow="0px 1px 20px 3px #00000040"
        display={"flex"}
        minHeight={{ base: 297, md: 433, lg: 450 }}
        width={{ base: 200, sm: 260, md: 720, lg: 900 }}
        borderRadius="md"
        px={{ base: 28, md: 80, lg: 67 }}
        py={{ base: 17, md: 27, lg: 65 }}
        gap={{ base: 0, md: 100, lg: 83 }}
        transform={{
          base: "translateY(-6%)",
          md: "translateY(-8%)",
          lg: "translateY(-12%)",
        }}
        justifyContent={"center"}
      >
        {visibleCards.map((card) => (
          <ServiceCard
            key={card.id}
            card={card}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        ))}
      </Box>

      <IconButton
        width={{ base: "10", sm: 12, lg: 16 }}
        icon={<Image src={angleLeftIcon} alt="Next" />}
        onClick={handleNext}
        position="absolute"
        left={{ base: 5, sm: 30, md: 85, lg: 50 }}
        top="50%"
        transform="translateY(-50%)"
        isDisabled={currentIndex + cardsPerSlide >= cards.length}
        zIndex={2}
        aria-label="Next"
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
      />
      <IconButton
        width={{ base: "10", sm: 12, lg: 16 }}
        icon={<Image src={angleRightIcon} alt="Previous" />}
        onClick={handlePrev}
        position="absolute"
        right={{ base: 5, sm: 30, md: 85, lg: 50 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        isDisabled={currentIndex === 0}
        aria-label="Previous"
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
      />
    </Box>
  );
};
