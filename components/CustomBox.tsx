import { Box, BoxProps, Text } from "@chakra-ui/react";

interface CustomBoxProps extends BoxProps {
  title: string;
  description: string;

  children?: React.ReactNode;
}

const CustomBox: React.FC<CustomBoxProps> = ({
  children,
  title,
  description,

  ...props
}) => {
  return (
    <Box {...props}>
      <Text
        fontSize="2xl"
        fontWeight="700"
        mb={{ base: "12px", md: "82px", lg: "90px" }}
      >
        {title}
      </Text>
      <Text fontSize="19px" fontWeight="500" lineHeight={"30px"}>
        {description}
      </Text>
      {children}
    </Box>
  );
};

export default CustomBox;
