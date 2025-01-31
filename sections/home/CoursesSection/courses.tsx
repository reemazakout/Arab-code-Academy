"use client";
import React, { useState, useEffect } from "react";
import ButtonAC from "../../../components/ButtonAC";
import mazedlogo from "../../../public/images/circled_outline.png";
import paylogo from "../../../public/images/cart_icon.png";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CustomCard from "../../../components/CustomCard";
import { Tooltip } from "@chakra-ui/react";
import { Text, Box, Grid, GridItem } from "@chakra-ui/react";
import { useTheme } from "../../../hooks/useTheme";

interface FormattedCourse {
  id: number;
  name: string;
  price: string;
  image: string;
  duration: string;
  trainer: string;
  description: string;
  level: string;
  isComingSoon: boolean;
}

interface CoursesProps {
  data: FormattedCourse[];
}

const Courses: React.FC<CoursesProps> = ({ data }) => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [showWhiteLayer, setShowWhiteLayer] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 480);

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 2200) {
        setSlidesPerView(5);
      } else if (width >= 1740) {
        setSlidesPerView(4);
      } else if (width >= 1380) {
        setSlidesPerView(3);
      } else if (width >= 1030) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    if (swiper.activeIndex > 0) {
      setShowWhiteLayer(false);
    } else {
      setShowWhiteLayer(true);
    }
  };
  const { color, bg } = useTheme();

  return (
    <Box paddingTop={{ base: 8, sm: 8, md: 8, lg: 2 }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween="-200px"
        navigation={true}
        onSlideChange={handleSlideChange}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          1030: {
            slidesPerView: 2,
          },
          1380: {
            slidesPerView: 3,
          },
          1740: {
            slidesPerView: 4,
          },
          2200: { slidesPerView: 5 },
        }}
      >
        {data &&
          data
            .filter((item) => item.isComingSoon === false)
            .map((item, index) => (
              <SwiperSlide
                key={item.id}
                style={{
                  width: "300px",
                  marginRight: isMobile ? "70px" : index === 0 ? "115px" : "0",

                  position: "relative",
                }}
              >
                <CustomCard
                  title={
                    <Tooltip label={item.name} aria-label="Full Title">
                      <span>
                        {item.name.length > 15
                          ? `${item.name.slice(0, 15)}...`
                          : item.name}
                      </span>
                    </Tooltip>
                  }
                  price={item.price}
                  trainerName={item.trainer}
                  duration={item.duration}
                  imageSrc="/images/85ec0a9778292af7f20d1502a6ed0702.png"
                  applyFilter={true}
                  buttons={[
                    <ButtonAC
                      key="read-more"
                      borderRadius="6px"
                      mb="30px"
                      color="white"
                      bg="secondary"
                      text="اقرأ المزيد"
                      icon={mazedlogo}
                      sx={{
                        width: {
                          base: "95px",
                          sm: "143px",
                          md: "143px",
                          lg: "143px",
                        },
                        height: {
                          base: "37px",
                          sm: "44px",
                          md: "44px",
                          lg: "44px",
                        },
                        fontWeight: "normal",
                        fontSize: {
                          base: "13px",
                          sm: "17px",
                          md: "17px",
                          lg: "17px",
                        },
                      }}
                    />,
                    <ButtonAC
                      key="buy"
                      borderRadius="6px"
                      alignSelf="center"
                      mb="30px"
                      color="white"
                      bg="tomato"
                      text="شراء"
                      icon={paylogo}
                      sx={{
                        width: {
                          base: "95px",
                          sm: "143px",
                          md: "143px",
                          lg: "143px",
                        },
                        height: {
                          base: "37px",
                          sm: "44px",
                          md: "44px",
                          lg: "44px",
                        },
                        fontWeight: "normal",
                        fontSize: {
                          base: "13px",
                          sm: "17px",
                          md: "17px",
                          lg: "17px",
                        },
                      }}
                    />,
                  ]}
                />
                {showWhiteLayer && index === slidesPerView && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    backgroundColor={bg}
                    pointerEvents="none"
                    style={{
                      marginRight: isMobile ? "-1px" : "-5px",
                    }}
                  />
                )}
              </SwiperSlide>
            ))}
      </Swiper>

      <Grid templateColumns="repeat(4, 1fr)" gap="4">
        <GridItem colSpan={1}>
          <Text
            marginRight={{
              base: "150px",
              sm: "120px",
              md: "120px",
              lg: "120px",
            }}
            color={color}
            marginBottom={{ base: "20px", sm: "20px", md: "20px", lg: "69px" }}
            mt={{ base: "30px", sm: 10, md: 10, lg: 0 }}
            paddingTop="40px"
            borderBottom={"2px solid"}
            width="70px"
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
            قريباً
          </Text>
        </GridItem>

        <GridItem colSpan={3}></GridItem>
      </Grid>

      <Box marginBottom={112} paddingTop={2} paddingBottom={2} paddingLeft={3}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween="-200px"
          navigation={true}
          onSlideChange={handleSlideChange}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            1030: {
              slidesPerView: 2,
            },
            1380: {
              slidesPerView: 3,
            },
            1740: {
              slidesPerView: 4,
            },
            2200: { slidesPerView: 5 },
          }}
        >
          {data &&
            data
              .filter((item) => item.isComingSoon === true)
              .map((item, index) => (
                <SwiperSlide
                  key={item.id}
                  style={{
                    width: "300px",
                    marginRight: isMobile
                      ? "70px"
                      : index === 0
                      ? "115px"
                      : "0",
                    position: "relative",
                  }}
                >
                  <CustomCard
                    title={
                      <Tooltip label={item.name} aria-label="Full Title">
                        <span>
                          {item.name.length > 15
                            ? `${item.name.slice(0, 15)}...`
                            : item.name}
                        </span>
                      </Tooltip>
                    }
                    price={item.price}
                    trainerName={item.trainer}
                    duration={item.duration}
                    imageSrc="/images/85ec0a9778292af7f20d1502a6ed0702.png"
                    applyFilter={true}
                    buttons={[
                      <ButtonAC
                        key="read-more"
                        borderRadius="6px"
                        mb="30px"
                        color="white"
                        bg="secondary"
                        text="اقرأ المزيد"
                        icon={mazedlogo}
                        sx={{
                          width: {
                            base: "95px",
                            sm: "143px",
                            md: "143px",
                            lg: "143px",
                          },
                          height: {
                            base: "37px",
                            sm: "44px",
                            md: "44px",
                            lg: "44px",
                          },
                          fontWeight: "normal",
                          fontSize: {
                            base: "13px",
                            sm: "17px",
                            md: "17px",
                            lg: "17px",
                          },
                        }}
                      />,
                      <ButtonAC
                        key="buy"
                        borderRadius="6px"
                        alignSelf="center"
                        mb="30px"
                        color="white"
                        bg="tomato"
                        text="شراء"
                        icon={paylogo}
                        sx={{
                          width: {
                            base: "95px",
                            sm: "143px",
                            md: "143px",
                            lg: "143px",
                          },
                          height: {
                            base: "37px",
                            sm: "44px",
                            md: "44px",
                            lg: "44px",
                          },
                          fontWeight: "normal",
                          fontSize: {
                            base: "13px",
                            sm: "17px",
                            md: "17px",
                            lg: "17px",
                          },
                        }}
                      />,
                    ]}
                  />
                  {showWhiteLayer && index === slidesPerView && (
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      backgroundColor={bg}
                      pointerEvents="none"
                      style={{
                        marginRight: isMobile ? "-1px" : "-5px",
                      }}
                    />
                  )}
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
      <style>
        {`
    .swiper-button-prev, .swiper-button-next {
      width: 70px;
      height: 70px;
      border: 6px solid #713488;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .swiper-button-prev::after, .swiper-button-next::after {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      background: none;
      font-size: 0;
      color: transparent;
      border: none;
    }

    .swiper-button-prev::after {
      width: 20px;
      height: 20px;
      border-left: 6px solid #713488;
      border-bottom: 6px solid #713488;
      transform: rotate(225deg);
    }

    .swiper-button-next::after {
      width: 20px;
      height: 20px;
      border-right: 6px solid #713488;
      border-top: 6px solid #713488;
      transform: rotate(225deg);
    }

    @media (max-width: 480px) { 
    
      .swiper-button-prev, .swiper-button-next {
        width: 40px; 
        height: 40px; 
        border: 3px solid #713488; 
        border-radius: 50%; 
  background: transparent; 
  display: flex;
  align-items: center;
  justify-content: center;
        }

      .swiper-button-prev::after, .swiper-button-next::after {
  content: '';
  display: block;
  width: 15px;
  height: 15px;
  background: none;
  font-size: 0;
  color: transparent;
  border: none;
}
    .swiper-button-prev::after {
  border-left: 3px solid #713488;
  border-bottom: 3px solid #713488;
}

.swiper-button-next::after {
  border-right: 3px solid #713488;
  border-top: 3px solid #713488;
}
      .swiper-button-prev {
        right: 10px !important; 
      }

      .swiper-button-next {
        left: 10px !important; 
      }
    }
  `}
      </style>
    </Box>
  );
};

export default Courses;
