import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Image from "next/image";
import quizImage from "../../../public/images/quiz-section1.png";
import quizImage2 from "../../../public/images/quiz section (2).png";
import InfoSectionComponent from "../../../components/InfoSectionComponent";
import quizIcon1 from "../../../public/icons/Mask group.png";
import quizIcon2 from "../../../public/icons/Mask group (1).png";
import quizIcon3 from "../../../public/icons/Mask group (2).png";
import quizIcon4 from "../../../public/icons/Mask group4.png";
import ButtonAc from "../../../components/ButtonAC";
function Quiz() {
  return (
    <Box bg="linear-gradient(to right, #462576, #783BA2)">
      <Container
        minH="100vh"
        maxW="1200px"
        display="flex"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        alignItems="center"
        gap={10}
        py={10}
      >
        <Box
          h={{ base: 270, md: 700, lg: 544 }}
          w={{ base: 297, md: 771, lg: 600 }}
          position="relative"
        >
          <Box
            w={{ base: 177, md: 460, lg: 358 }}
            h={{ base: 165, md: 436, lg: 326 }}
          >
            <Image src={quizImage2} alt="quiz" />
          </Box>
          <Box
            position="absolute"
            bottom={0}
            left={0}
            w={{ base: 177, md: 460, lg: 358 }}
            h={{ base: 161, md: 436, lg: 339 }}
          >
            <Image src={quizImage} alt="quiz" />
          </Box>
        </Box>
        <Box
          color="white"
          display="flex"
          flexDirection={"column"}
          alignItems={{ base: "center", md: "center", lg: "start" }}
        >
          <InfoSectionComponent
            header="اختبر قدراتك"
            text="تمكنك الأكاديمية العربية للبرمجة من اختبار مهاراتك البرمجية عبر الإنترنت بسهولة ومرونة. من خلال خدمة الامتحان البرمجي الإلكتروني"
            icon={quizIcon3}
          />
          <InfoSectionComponent
            header="قم بالاختيار"
            text="يمكنك اختيار اللغة البرمجية التي تود اختبار معرفتك بها، سواء كانت Python، Java، JavaScript أو أي لغة أخرى من اللغات المتاحة"
            icon={quizIcon2}
          />
          <InfoSectionComponent
            header="اعرف ترتيبك"
            text="تيح لك لوحة الشرف معرفة ترتيبك بين الطلاب الذين اجتازوا الامتحان، مما يمنحك فرصة مميزة للتميز والإشادة بإنجازك أمام المجتمع الأكاديمي وزملائك"
            icon={quizIcon1}
          />
          <ButtonAc
            icon={quizIcon4}
            text="قسم الامتحانات"
            bg="tomato"
            color={"white"}
            size="lg"
            mt={54}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Quiz;
