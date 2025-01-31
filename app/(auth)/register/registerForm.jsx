"use client";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Select,
  Checkbox,
  Button,
  Box,
  Heading,
  HStack,
  Stack,
  Image,
  ChakraProvider,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.emailError = "الايميل غير صالح";
    }

    if (!passwordRegex.test(password)) {
      newErrors.passwordError =
        "كلمة المرور يجب أن تحتوي على حرف كبير، رقم، وطول 6 أحرف على الأقل";
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirmError = "لا يوجد تطابق في كلمة السر";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNextAction = async () => {
    if (step === 1) {
      if (validate()) {
        setStep(2);
      }
    } else if (step === 2) {
      const newErrors = {};
      if (!firstName) newErrors.firstName = "يرجى إدخال اسمك الأول";
      if (!lastName) newErrors.lastName = "يرجى إدخال اسم العائلة";
      if (!username) newErrors.username = "يرجى إدخال اسم المستخدم";
      if (!country) newErrors.country = "يرجى اختيار بلد الإقامة";
      if (!privacyAccepted)
        newErrors.privacyAccepted = "يرجى الموافقة على سياسة الخصوصية";

      if (Object.keys(newErrors).length === 0) {
        setLoading(true);

        const checkResponse = await fetch("/api/userExist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const checkData = await checkResponse.json();

        if (checkData.exists) {
          setErrors({
            ...errors,
            emailError:
              "عنوان البريد الإلكترونى هذا مسجل بالفعل. حاول تسجيل الدخول باستخدام بريدًا إلكترونيًا مختلفًا",
          });

          reset();
          setLoading(false);
          return;
        } else {
          const userData = {
            email,
            password,
            firstName,
            lastName,
            username,
            country,
          };

          const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
          if (response.ok) {
            toast({
              title: "تمت العملية بنجاح",
              description: "تمت عمليات التسجيل بنجاح!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });

            const response = await signIn("signIn", {
              email,
              password,
              redirect: false,
            });
            if (response.ok) {
              router.push("/");
            }
            reset();
          } else {
            toast({
              title: "خطأ في التسجيل",
              description: "حدث خطئ اثناء عمليات الارسال",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      }

      setErrors(newErrors);
      setLoading(false);
    }
  };

  const reset = () => {
    setPrivacyAccepted(false);
    setStep(1);
  };

  function handleSocialLogin() {
    throw new Error("Function not implemented.");
  }

  return (
    <ChakraProvider>
      <Box
        bg="#fff"
        w="full"
        width={{ base: "300px", sm: "600px", md: "650px", lg: "800px" }}
        height={{ base: "860px", sm: "875px", md: "900px", lg: "900px" }}
        mx="auto"
        mb={225}
        p={5}
        borderRadius="lg"
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.35)"
        mt={{ base: 10, sm: 20, md: 20, lg: 290 }}
      >
        <VStack
          spacing={{ base: 0, sm: 10, md: 10, lg: 10 }}
          w="full"
          align="right"
          mt={{ base: 0, sm: "35px", md: "35px", lg: "35px" }}
        >
          <Heading
            fontSize={{ base: "18px", sm: "23px", md: "23px", lg: "23px" }}
            fontWeight="bold"
            color="#783BA2"
            textAlign="right"
            mr={{ base: 0, sm: 8, md: 8, lg: 8 }}
          >
            {step === 1 ? (
              <Box textAlign="right">قم بإنشاء حسابك على الأكاديمية!</Box>
            ) : (
              <VStack spacing={3} align="stretch">
                <Box textAlign="right">
                  أنت على بعد خطوة واحدة فقط من الانضمام إلينا!
                </Box>
                <Box textAlign="right">أنشئ ملف التعريف الخاص بك</Box>
              </VStack>
            )}
          </Heading>

          <VStack
            color="#783BA2"
            mt={9}
            spacing="10px"
            width={{ base: "100%", sm: "88%", md: "88%", lg: "88%" }}
            mr={{ base: 0, sm: 8, md: 8, lg: 8 }}
          >
            {step === 1 ? (
              <>
                <FormControl isInvalid={errors.emailError}>
                  <FormLabel
                    fontSize={{
                      base: "14px",
                      sm: "18px",
                      md: "18px",
                      lg: "18px",
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
                        mr={{ base: "45px", sm: 2, md: 2, lg: 2 }}
                        ml={{ base: 0, sm: 2, md: 2, lg: 2 }}
                      />
                      عنوان البريد الإلكتروني
                    </Box>
                  </FormLabel>
                  <Input
                    fontSize={{
                      base: "12px",
                      sm: "16px",
                      md: "16px",
                      lg: "16px",
                    }}
                    type="email"
                    placeholder="لن نشارك بريدك الإلكتروني أبدًا مع أي شخص"
                    rounded="md"
                    height="54px"
                    variant="outline"
                    borderColor={errors.emailError ? "#DB4A39" : "#A64DC7"}
                    focusBorderColor="#A067B6"
                    errorBorderColor="#DB4A39"
                    borderWidth={errors.emailError ? "0.0px" : "1px"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    color="#A067B6"
                    _placeholder={{ color: "#A067B6" }}
                  />
                  <Box minHeight="20px" mt="4px">
                    {errors.emailError && (
                      <FormErrorMessage color="#DB4A39" m={0} p={0}>
                        {errors.emailError}
                      </FormErrorMessage>
                    )}
                    {!errors.emailError && (
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

                <FormControl isInvalid={errors.passwordError}>
                  <FormLabel
                    fontSize={{
                      base: "14px",
                      sm: "18px",
                      md: "18px",
                      lg: "18px",
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
                        mr={{ base: "75px", sm: 2, md: 2, lg: 2 }}
                        ml={{ base: 0, sm: 2, md: 2, lg: 2 }}
                      />
                      كلمة المرور
                    </Box>
                  </FormLabel>
                  <Input
                    fontSize={{
                      base: "12px",
                      sm: "16px",
                      md: "16px",
                      lg: "16px",
                    }}
                    type="password"
                    height="54px"
                    placeholder="قم بإنشاء كلمة مرور قوية"
                    rounded="md"
                    variant="outline"
                    borderColor={errors.passwordError ? "#DB4A39" : "#A64DC7"}
                    focusBorderColor="#A067B6"
                    errorBorderColor="#DB4A39"
                    borderWidth={errors.passwordError ? "0.0px" : "1px"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    color="#A067B6"
                    _placeholder={{ color: "#A067B6" }}
                  />
                  <Box minHeight="20px" mt="4px">
                    {errors.passwordError && (
                      <FormErrorMessage color="#DB4A39" m={0} p={0}>
                        {errors.passwordError}
                      </FormErrorMessage>
                    )}
                    {!errors.passwordError && (
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

                <FormControl isInvalid={errors.passwordConfirmError}>
                  <FormLabel
                    fontSize={{
                      base: "14px",
                      sm: "18px",
                      md: "18px",
                      lg: "18px",
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
                        mr={{ base: "57px", sm: 2, md: 2, lg: 2 }}
                        ml={{ base: 0, sm: 2, md: 2, lg: 2 }}
                      />
                      تأكيد كلمة المرور
                    </Box>
                  </FormLabel>
                  <Input
                    fontSize={{
                      base: "12px",
                      sm: "16px",
                      md: "16px",
                      lg: "16px",
                    }}
                    type="password"
                    height="54px"
                    placeholder="أعد إدخال كلمة المرور الخاصة بك للتأكد من مطابقتها"
                    rounded="md"
                    variant="outline"
                    borderColor={
                      errors.passwordConfirmError ? "#DB4A39" : "#A64DC7"
                    }
                    focusBorderColor="#A067B6"
                    errorBorderColor="#DB4A39"
                    borderWidth={errors.passwordConfirmError ? "0.0px" : "1px"}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    color="#A067B6"
                    _placeholder={{ color: "#A067B6" }}
                  />

                  <Box minHeight="20px" mt="4px">
                    {errors.passwordConfirmError && (
                      <FormErrorMessage color="#DB4A39" m={0} p={0}>
                        {errors.passwordConfirmError}
                      </FormErrorMessage>
                    )}
                    {!errors.passwordConfirmError && (
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
              </>
            ) : (
              <>
                <HStack width="100%" spacing={4} mt={-4}>
                  <FormControl isInvalid={errors.firstName}>
                    <FormLabel
                      fontSize={{
                        base: "14px",
                        sm: "18px",
                        md: "18px",
                        lg: "18px",
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <Image
                          src="./icons/user-check.svg"
                          alt="First Name Icon"
                          h="16px"
                          w="20.75px"
                          mr={2}
                          ml={2}
                        />
                        الاسم الأول
                      </Box>
                    </FormLabel>
                    <Input
                      fontSize={{
                        base: "12px",
                        sm: "16px",
                        md: "16px",
                        lg: "16px",
                      }}
                      height="54px"
                      type="text"
                      placeholder="ادخل اسمك الأول"
                      rounded="md"
                      variant="outline"
                      borderColor={errors.firstName ? "#DB4A39" : "#A64DC7"}
                      focusBorderColor="#A067B6"
                      errorBorderColor="#DB4A39"
                      borderWidth={errors.firstName ? "0.0px" : "1px"}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      color="#A067B6"
                      _placeholder={{ color: "#A067B6" }}
                    />

                    <Box minHeight="20px" mt="4px">
                      {errors.firstName && (
                        <FormErrorMessage color="#DB4A39" m={0} p={0}>
                          {errors.firstName}
                        </FormErrorMessage>
                      )}
                      {!errors.firstName && (
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

                  <FormControl isInvalid={errors.lastName}>
                    <FormLabel
                      fontSize={{
                        base: "14px",
                        sm: "18px",
                        md: "18px",
                        lg: "18px",
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <Image
                          src="./icons/user-check.svg"
                          alt="Last Name Icon"
                          h="16px"
                          w="20.75px"
                          mr={2}
                          ml={2}
                        />
                        الاسم الثاني
                      </Box>
                    </FormLabel>
                    <Input
                      fontSize={{
                        base: "12px",
                        sm: "16px",
                        md: "16px",
                        lg: "16px",
                      }}
                      height="54px"
                      type="text"
                      placeholder="ادخل اسمك الأخير"
                      rounded="md"
                      variant="outline"
                      borderColor={errors.lastName ? "#DB4A39" : "#A64DC7"}
                      focusBorderColor="#A067B6"
                      errorBorderColor="#DB4A39"
                      borderWidth={errors.lastName ? "0.0px" : "1px"}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      color="#A067B6"
                      _placeholder={{ color: "#A067B6" }}
                    />

                    <Box minHeight="20px" mt="4px">
                      {errors.lastName && (
                        <FormErrorMessage color="#DB4A39" m={0} p={0}>
                          {errors.lastName}
                        </FormErrorMessage>
                      )}
                      {!errors.lastName && (
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
                </HStack>
                <FormControl isInvalid={errors.username}>
                  <FormLabel
                    fontSize={{
                      base: "14px",
                      sm: "18px",
                      md: "18px",
                      lg: "18px",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Image
                        src="./icons/user-alt.svg"
                        alt="Name Icon"
                        h="16.39px"
                        w="17px"
                        mr={2}
                        ml={2}
                      />
                      اسم المستخدم
                    </Box>
                  </FormLabel>

                  <Input
                    fontSize={{
                      base: "12px",
                      sm: "16px",
                      md: "16px",
                      lg: "16px",
                    }}
                    height="54px"
                    type="text"
                    placeholder="اختر اسم مستخدم فريداً"
                    rounded="md"
                    variant="outline"
                    borderColor={errors.username ? "#DB4A39" : "#A64DC7"}
                    focusBorderColor="#A067B6"
                    errorBorderColor="#DB4A39"
                    borderWidth={errors.username ? "0.0px" : "1px"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    color="#A067B6"
                    _placeholder={{ color: "#A067B6" }}
                  />

                  <Box minHeight="20px" mt="4px">
                    {errors.username && (
                      <FormErrorMessage color="#DB4A39" m={0} p={0}>
                        {errors.username}
                      </FormErrorMessage>
                    )}
                    {!errors.username && (
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

                <FormControl isInvalid={errors.country}>
                  <FormLabel
                    fontSize={{
                      base: "14px",
                      sm: "18px",
                      md: "18px",
                      lg: "18px",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Image
                        src="./icons/map-marker-alt.svg"
                        alt="Map Icon"
                        h="21.12px"
                        w="16.6px"
                        mr={2}
                        ml={2}
                      />
                      بلد الإقامة
                    </Box>
                  </FormLabel>
                  <Box position="relative">
                    <Select
                      fontSize="16px"
                      rounded="md"
                      variant="outline"
                      borderColor={errors.country ? "#DB4A39" : "#A64DC7"}
                      focusBorderColor="#A067B6"
                      errorBorderColor="#DB4A39"
                      borderWidth={errors.country ? "0.0px" : "1px"}
                      color="#A067B6"
                      height="54px"
                      placeholder="اختر بلدك"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      _placeholder={{ color: "#A067B6" }}
                      sx={{
                        appearance: "none",
                        backgroundImage: `url('./icons/rotated_arrow_270deg.png')`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "left 10px center",
                        paddingLeft: "30px",
                        pr: "25px",
                      }}
                    >
                      <option value="السعودية">السعودية</option>
                      <option value="مصر">مصر</option>
                      <option value="الإمارات">الإمارات</option>
                      <option value="الكويت">الكويت</option>
                      <option value="قطر">قطر</option>
                      <option value="فلسطين">فلسطين</option>
                      <option value="لبنان">لبنان</option>
                      <option value="سوريا">سوريا</option>
                      <option value="الأردن">الأردن</option>
                      <option value="البحرين">البحرين</option>
                      <option value="عُمان">عُمان</option>
                      <option value="العراق">العراق</option>
                      <option value="اليمن">اليمن</option>
                      <option value="ليبيا">ليبيا</option>
                      <option value="تونس">تونس</option>
                      <option value="الجزائر">الجزائر</option>
                      <option value="المغرب">المغرب</option>
                      <option value="السودان">السودان</option>
                    </Select>
                    <Box
                      position="absolute"
                      right="1"
                      top="1"
                      h="80%"
                      w="21px"
                      bg="white"
                    ></Box>
                  </Box>

                  <Box minHeight="20px" mt="4px">
                    {errors.country && (
                      <FormErrorMessage color="#DB4A39" m={0} p={0}>
                        {errors.countryr}
                      </FormErrorMessage>
                    )}
                    {!errors.country && (
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

                <FormControl isRequired={errors.privacyAccepted}>
                  <Checkbox
                    iconColor="#783BA2"
                    mr={{ base: "0", sm: "100px", md: "100px", lg: "100px" }}
                    isChecked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    sx={{
                      ".chakra-checkbox__control": {
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
                        border: "0.1px solid #783BA2",
                      },
                      ".chakra-checkbox__label": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    يرجى تأكيد موافقتك على سياسة الخصوصية الخاصة بنا
                  </Checkbox>
                  {errors.privacyAccepted && (
                    <Text fontSize="xs" color="#DB4A39" mt={1}>
                      {errors.privacyAccepted}
                    </Text>
                  )}
                </FormControl>
              </>
            )}
          </VStack>

          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            pr={2}
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            {step === 2 && (
              <Button
                bg="#FF6542"
                color="white"
                w={{ base: "55%", sm: "24%", md: "24%", lg: "24%" }}
                h="55px"
                mt={2}
                leftIcon={
                  <Image
                    src="./icons/left.svg"
                    alt="Arrow"
                    boxSize="25px"
                    style={{ transform: "rotate(180deg)" }}
                  />
                }
                onClick={() => setStep(1)}
              >
                رجوع
              </Button>
            )}

            <Button
              bg="#00BE98"
              color="white"
              fontSize={{ base: "14px", sm: "16px", md: "16px", lg: "16px" }}
              w={{ base: "55%", sm: "24%", md: "24%", lg: "24%" }}
              mt={2}
              h="55px"
              borderRadius="10px"
              onClick={handleNextAction}
              isLoading={loading}
              loadingText="تحميل..."
              _loading={{
                bg: "#34A853",
                color: "#2C8B2D",
              }}
              position="relative"
            >
              <Flex justifyContent="space-between" w="100%" alignItems="center">
                <Box flex="1" textAlign="center">
                  {step === 1 ? "التالي" : "إنشاء حسابي"}
                </Box>
                <Image
                  src={
                    step === 2
                      ? "./images/profile_circled.png"
                      : "./icons/left.svg"
                  }
                  alt="Arrow"
                  boxSize="25px"
                />
              </Flex>
            </Button>
          </Stack>
          <VStack
            fontSize={{ base: "14px", sm: "18px", md: "18px", lg: "18px" }}
            spacing={5}
            mt={{ base: "19px", sm: "-19px", md: "-19px", lg: "-19px" }}
            w="full"
            align="center"
          >
            <Text
              color="#713488"
              textAlign="center"
              borderBottom="2px solid #713488"
            >
              لديك حساب مسبقاً
            </Text>
            <Flex width={"full"} alignItems={"center"}>
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
              spacing={{ base: 3, sm: 4, md: 4, lg: 4 }}
              mt={{ base: "0px", sm: "-10px", md: "-10px", lg: "-10px" }}
              mr={{ base: "0px", sm: "15px", md: "15px", lg: "15px" }}
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
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default RegisterForm;
