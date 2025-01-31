"use client";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  VStack,
  Heading,
  HStack,
  Image,
  ChakraProvider,
  Text,
  Stack,
  Checkbox,
  Divider,
  Flex,
} from "@chakra-ui/react";
import ButtonAC from "../../../components/ButtonAC";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {};
    let isValid = true;

    if (!email) {
      newErrors.email = "يرجى إدخال البريد الإلكتروني";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صالح";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "يرجى إدخال كلمة المرور";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const res = await signIn("signIn", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/");
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "بيانات تسجيل الدخول غير صحيحة. حاول مرة أخرى.",
      }));
    }
    setLoading(false);
  };

  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
        }}
        alignItems="center"
        justifyContent="center"
        h={{ base: "100%", sm: "100vh", md: "100vh", lg: "100vh" }}
        pt={5}
        pb={5}
        w="100%"
      >
        <Box
          w={{ base: "80%", sm: "50%", md: "50%", lg: "100%" }}
          maxW={{ base: "700px", sm: "700px", md: "700px", lg: "980px" }}
          bg="white"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.35)"
          display="flex"
          flexDirection={{
            base: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack
            m={5}
            ml={{ base: 5, sm: 0, md: 0, lg: 20 }}
            w={{ base: "90%", sm: "90%", md: "90%", lg: "auto" }}
            spacing={5}
            align="stretch"
            color="#783BA2"
          >
            <Heading
              fontSize="20px"
              textAlign="right"
              fontWeight="normal"
              display={{ base: "none", sm: "block", md: "block", lg: "block" }}
            >
              {" "}
              {"تسجيل الدخول"}
            </Heading>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel
                fontSize={{
                  base: "12px",
                  sm: "16px",
                  md: "16px",
                  lg: "16px",
                }}
              >
                <Box display="flex" alignItems="center">
                  <Image
                    src="./icons/letter.svg"
                    alt="Email Icon"
                    h={{ base: "11px", sm: "16px", md: "16px", lg: "16px" }}
                    w={{
                      base: "15.7px",
                      sm: "20.7px",
                      md: "20.7px",
                      lg: "20.7px",
                    }}
                    mr={2}
                    ml={1}
                  />
                  اسم المستخدم أو البريد الإلكتروني<Text>*</Text>
                </Box>
              </FormLabel>
              <Input
                type="email"
                rounded="md"
                variant="outline"
                borderColor={errors.email ? "#DB4A39" : "#A64DC7"}
                focusBorderColor="#A067B6"
                errorBorderColor="#DB4A39"
                borderWidth={errors.email ? "0.0px" : "1px"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color="#A067B6"
                _placeholder={{ color: "#A067B6" }}
              />
              <Box minHeight="20px" mt="4px">
                {errors.email && (
                  <FormErrorMessage color="#DB4A39" m={0} p={0}>
                    {errors.email}
                  </FormErrorMessage>
                )}
                {!errors.email && (
                  <Text
                    sx={{
                      minHeight: "20px",
                      color: "transparent",
                      fontSize: "0.8em",
                    }}
                  >
                    Placeholder
                  </Text>
                )}
              </Box>
            </FormControl>
            <FormControl isInvalid={!!errors.password} mt={-3}>
              <FormLabel
                fontSize={{
                  base: "12px",
                  sm: "16px",
                  md: "16px",
                  lg: "16px",
                }}
              >
                <Box display="flex" alignItems="center">
                  <Image
                    src="./icons/key.svg"
                    alt="Pass Icon"
                    h={{ base: "14px", sm: "20px", md: "20px", lg: "20px" }}
                    w={{
                      base: "15.7px",
                      sm: "22px",
                      md: "22px",
                      lg: "22px",
                    }}
                    mr={2}
                    ml={1}
                  />
                  كلمة المرور<Text>*</Text>
                </Box>
              </FormLabel>

              <Input
                type="password"
                rounded="md"
                variant="outline"
                borderColor={errors.password ? "#DB4A39" : "#A64DC7"}
                focusBorderColor="#A067B6"
                errorBorderColor="#DB4A39"
                borderWidth={errors.password ? "0.0px" : "1px"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="#A067B6"
                _placeholder={{ color: "#A067B6" }}
              />
              <Box minHeight="20px" mt="4px">
                {errors.password && (
                  <FormErrorMessage color="#DB4A39" m={0} p={0}>
                    {errors.password}
                  </FormErrorMessage>
                )}
                {!errors.password && (
                  <Text
                    sx={{
                      minHeight: "20px",
                      color: "transparent",
                      fontSize: "0.8em",
                    }}
                  >
                    Placeholder
                  </Text>
                )}
              </Box>
            </FormControl>
            {errors.form && (
              <Text fontSize="sm" color="red.500" mt={2}>
                {errors.form}
              </Text>
            )}
            <Text
              mt={-1}
              fontSize={{
                base: "12px",
                sm: "16px",
                md: "16px",
                lg: "16px",
              }}
              textAlign="right"
              mr={2}
              cursor="pointer"
            >
              نسيت كلمة المرور؟
            </Text>
            <HStack spacing={4} mt="-10px" mr="10px">
              <Checkbox
                iconColor="#783BA2"
                sx={{
                  ".chakra-checkbox__control": {
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
                    border: "0.1px solid #783BA2",
                  },
                  ".chakra-checkbox__label": {
                    fontSize: {
                      base: "14px",
                      sm: "16px",
                      md: "16px",
                      lg: "16px",
                    },
                    boxShadow: "none",
                  },
                }}
              >
                البقاء متصلاً
              </Checkbox>
            </HStack>
            <Stack
              direction={{ base: "column", sm: "row", base: "row" }}
              spacing={4}
              mt="-10px"
              mb={-1}
            >
              <ButtonAC
                isLoading={loading}
                loadingText="جارٍ تسجيل الدخول..."
                colorScheme="teal"
                width="full"
                mt={4}
                onClick={handleLogin}
                alignSelf="center"
                size="sm"
                color="white"
                bg="#00BE98"
                text="تسجيل الدخول"
                fontSize={{ lg: 13, sm: 10, base: 10 }}
                icon={
                  <Image
                    src="./images/log_in.png"
                    alt="login Icon"
                    sx={{
                      width: {
                        base: "20px",
                        sm: "23px",
                        md: "23px",
                        lg: "23px",
                      },
                      height: {
                        base: "23px",
                        sm: "26px",
                        md: "26px",
                        lg: "26px",
                      },
                    }}
                  />
                }
                href="/signin"
              />
              <ButtonAC
                alignSelf="center"
                size="sm"
                bg="tomato"
                color="white"
                text="إنشاء حساب جديد"
                variant="outline"
                w="full"
                mt={4}
                fontSize={{ lg: 11, sm: 10, base: 10 }}
                icon={
                  <Image
                    src="./images/profile_circled.png"
                    alt="Register Icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                }
                href="/register"
              />
            </Stack>
            <Flex justifyContent="center" alignItems="center">
              <Divider borderColor="#A067B6" />
              <Text
                color="#713488"
                fontSize={{ lg: 15, sm: 10, base: 12 }}
                textAlign="center"
                mx={4}
                fontWeight={{ base: "bold", sm: "normal", lg: "normal" }}
                whiteSpace={"nowrap"}
              >
                يمكنك تسجيل الدخول باستخدام
              </Text>
              <Divider borderColor="#A067B6" />
            </Flex>
            <HStack
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 3, sm: 4, md: 4, lg: 4 }}
              mt={{ base: "0px", sm: "-10px", md: "-10px", lg: "-10px" }}
              mr={{ base: "0px", sm: "0px", md: "0px", lg: "15px" }}
              //  border="1px solid blue"
            >
              <Button
                backgroundColor="#3566A5"
                color="white"
                h={{ base: "45px", sm: "49px", md: "49px", lg: "49px" }}
                w={{ base: "130px", sm: "155px", md: "155px", lg: "155px" }}
                fontSize={{
                  base: "default",
                  sm: "21px",
                  md: "21px",
                  lg: "21px",
                }}
                onClick={() => handleSocialLogin("facebook")}
                _hover={{ bg: "#2a4d7f" }}
                borderRadius="10px"
                boxShadow="0px 6px 4px -2px rgba(0, 0, 0, 0.3)"
              >
                <HStack spacing={2} alignItems="center">
                  <Text>Facebook</Text>
                  <Box height="49px" width="0.5px" bg="white"></Box>{" "}
                  <Image
                    src="./icons/facebook-f.svg"
                    alt="Facebook Icon"
                    w="18px"
                    h="21px"
                  />
                </HStack>
              </Button>
              <Button
                backgroundColor="#DB4A39"
                color="white"
                h={{ base: "45px", sm: "49px", md: "49px", lg: "49px" }}
                w={{ base: "130px", sm: "155px", md: "155px", lg: "155px" }}
                fontSize={{
                  base: "default",
                  sm: "21px",
                  md: "21px",
                  lg: "21px",
                }}
                pr={-2}
                onClick={() => signIn("google", { callbackUrl: "/" })}
                _hover={{ bg: "#b3362a" }}
                borderRadius="10px"
                boxShadow="0px 6px 4px -2px rgba(0, 0, 0, 0.3)"
              >
                <HStack spacing={2} alignItems="center">
                  <Text ml="8px">Google</Text>
                  <Box height="49px" width="0.5px" bg="white"></Box>{" "}
                  <Image
                    ml={-7}
                    src="./icons/google-plus-g.svg"
                    alt="Google Icon"
                    w="30px"
                    h="19px"
                  />
                </HStack>
              </Button>
            </HStack>
          </VStack>
          <Box h="100%" mr={{ base: "0px", sm: "0px", md: "0px", lg: "20px" }}>
            <Image
              src="/images/login-img.png"
              alt="Login Image"
              w="100%"
              h="full"
            />
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LoginForm;
