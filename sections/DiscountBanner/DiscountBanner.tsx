import { Text, Center } from "@chakra-ui/react";
interface Props {
  startDate: string;
  endDate: string;
  promotionMessage?: string;
}

const DiscountBanner: React.FC<Props> = ({
  startDate,
  endDate,
  promotionMessage,
}) => {
  const isDateInRange = (
    startDate: string,
    endDate: string,
    currentDate: Date = new Date()
  ): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate >= start && currentDate <= end;
  };

  return isDateInRange(startDate, endDate) ? (
    <Center
      bg="#462576"
      color="white"
      py={{ base: "18px", md: "44px", lg: "40px" }}
      height={{ base: "50px", md: "120px", lg: "110px" }}
    >
      <Text fontSize={{ base: "12px", md: "23px", lg: "25px" }}>
        {promotionMessage}
      </Text>
    </Center>
  ) : null;
};

export default DiscountBanner;
