"use client";
import {
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  Link,
  Box,
  Text,
} from "@chakra-ui/react";
import ChakraImage from "next/image";
import ButtonAC from "../../components/ButtonAC";
import Image from "next/image";
import loginlogo from "../../public/images/log_in.png";
import registerlogo from "../../public/images/profile_circled.png";
import dropdownicon from "../../public/images/Polygon 2.png";
import logo from "../../public/images/8e6c847871186b9180f5ae9f99b6bcbc.png";
import vector1 from "../../public/images/Vector (1).png";
import group46 from "../../public/images/Group 46.png";
import { useSession, signOut } from "next-auth/react";
import DarkModeToggle from "../../components/DarkToggle";

const HeaderDesktop = () => {
  const { status, data } = useSession();

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  if (status === "loading") return null;
  return (
    <Box>
      <Flex
        bg="#783BA2"
        justifyContent="space-between"
        color="white"
        alignItems="center"
        display={{ base: "none", sm: "flex", md: "flex", lg: "flex" }}
      >
        <Grid
          templateColumns={{
            base: "1fr 1fr",
            md: "1fr 2fr 1fr",
            sm: "1fr 2fr 1fr",
            lg: "1fr 2fr 1fr",
          }}
          alignItems="center"
          width="100%"
          height={{ lg: 100, sm: 100 }}
        >
          <GridItem
            width={{ sm: 200, lg: 280 }}
            height={{ sm: 34.2, lg: 61.79 }}
            marginRight={{ lg: 97, sm: 5 }}
          >
            <a href="/">
              <ChakraImage src={logo} alt="Logo" />
            </a>
          </GridItem>

          <GridItem display="flex" justifyContent="center" alignItems="center">
            <List
              display="flex"
              gap={{ lg: "40px", md: "40px", sm: "13px" }}
              justifyContent="center"
              fontWeight="bold"
              fontSize="16px"
              sx={{
                "@media (max-width: 825px) and (min-width: 480px)": {
                  fontSize: "10px",
                },
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.48)",
              }}
            >
              <ListItem>
                <DarkModeToggle />
              </ListItem>
              <ListItem>
                <Link
                  href="/aiToolsPage"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <Box
                    marginTop="5px"
                    width={{ sm: "9px", md: "12px", lg: "12px" }}
                    height={{ sm: "6.5px", md: "10px", lg: "10px" }}
                  >
                    <ChakraImage src={dropdownicon} alt="Dropdown Arrow Icon" />
                  </Box>
                  ادوات الذكاء الاصطناعي
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/">التواصل</Link>
              </ListItem>
            </List>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent="left"
            gap={{ lg: 5, md: 5 }}
            marginLeft={{ lg: "75px", md: "20px", sm: "20px" }}
          >
            {status === "authenticated" ? (
              <Flex
                alignItems="center"
                gap={{ lg: 5, md: 8, sm: 8 }}
                ml={{ lg: "18px", md: "30px", sm: "30px" }}
              >
                <Flex alignItems="center" direction="column">
                  <Box
                    width={"50px"}
                    ml={{ lg: 0, md: 0, sm: -4 }}
                    height={"50px"}
                  >
                    <Image
                      src={data.user.image || group46}
                      width={50}
                      height={50}
                      alt="Group 46"
                      className="rounded-full"
                    />
                  </Box>
                  <Text
                    fontSize={{
                      lg: "24px",
                      md: "16px",
                      sm: "10px",
                      base: "10px",
                    }}
                  >
                    {data.user.name}
                  </Text>
                </Flex>
                <Box
                  mt="6px"
                  ml="-30px"
                  width={"40px"}
                  height={"33.33px"}
                  onClick={handleLogout}
                  cursor={"pointer"}
                >
                  <Image src={vector1} alt="Vector 1" />
                </Box>
              </Flex>
            ) : (
              <>
                <ButtonAC
                  alignSelf="center"
                  mt={8}
                  size="lg"
                  color="white"
                  bg="secondary"
                  text="إنشاء حساب"
                  fontSize={{ lg: 22, sm: 12 }}
                  icon={
                    <Image
                      src={registerlogo}
                      alt="Register Icon"
                      style={{ width: "30px", height: "30px" }}
                    />
                  }
                  href="/register"
                  marginTop={{ lg: 0 }}
                  sx={{
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                    width: { sm: "140px", lg: "200px" },
                    height: { sm: "50px", lg: "60px" },
                    "@media (max-width: 745px) and (min-width: 480px)": {
                      width: "120px",
                      height: "45px",
                      fontSize: "8px",
                    },
                  }}
                />
                <ButtonAC
                  alignSelf="center"
                  mt={8}
                  size="lg"
                  color="white"
                  bg="tomato"
                  text="تسجيل الدخول"
                  fontSize={{ lg: 20, sm: 10 }}
                  icon={
                    <Image
                      src={loginlogo}
                      alt="login Icon"
                      style={{ width: "25.71px", height: "30px" }}
                    />
                  }
                  href="/signin"
                  marginTop={{ lg: 0 }}
                  sx={{
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                    width: { sm: "137px", lg: "200px" },
                    height: { sm: "50px", lg: "60px" },
                    "@media (max-width: 745px) and (min-width: 480px)": {
                      width: "120px",
                      height: "45px",
                      fontSize: "8px",
                    },
                  }}
                />
              </>
            )}
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default HeaderDesktop;
