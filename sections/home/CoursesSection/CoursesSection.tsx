import { Suspense } from "react";
import { Flex } from "@chakra-ui/react";
import Loading from "./loading";
import SearchBar from "../../../components/SearchBar";
import Courses from "./courses";
import CoursesText from "../../../components/CoursesText";

interface Trainer {
  first_name: string;
  last_name: string;
  leader: boolean;
}

interface Course {
  id: number;
  title: string;
  price: number;
  imageURL: string;
  total_videos: number;
  total_duration: string;
  trainers: Trainer[];
  original_price: number;
  currency: string;
  status: string;
}

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
export const revalidate = 2 * 24 * 60 * 60;

export async function fetchCoursesData(): Promise<FormattedCourse[]> {
  try {
    const response = await fetch(
      "https://sitev2.arabcodeacademy.com/wp-json/aca/v1/courses"
    );
    const result = await response.json();

    return result.courses.map((course: Course) => ({
      id: course.id,
      name: course.title,
      price: `$${course.price}`,
      image: course.imageURL,
      duration: `${course.total_videos} فيديو، ${course.total_duration}`,
      trainer: course.trainers
        .filter((trainer) => trainer.leader)
        .map((trainer) => `${trainer.first_name} ${trainer.last_name}`)
        .join(", "),
      description: `السعر الأصلي: ${course.original_price} ${course.currency}`,
      level: "غير محدد",
      isComingSoon: course.status === "coming_soon",
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

const CoursesPage = async () => {
  const courses = await fetchCoursesData();

  return (
    <>
      <Flex
        direction={{ base: "column", md: "column", lg: "row-reverse" }}
        align={{ base: "center", md: "center", lg: "flex-end" }}
        wrap="nowrap"
        mt={{ lg: "0px", md: "80px", sm: "80px", base: "40px" }}
        mb={{ lg: "30px" }}
        w={{ lg: "90%" }}
        mr="auto"
      >
        <SearchBar placeholder="..... مقدمة لمحرك الألعاب اليونتي" />
        <CoursesText />
      </Flex>

      <Suspense fallback={<Loading />}>
        <Courses data={courses} />
      </Suspense>
    </>
  );
};

export default CoursesPage;
