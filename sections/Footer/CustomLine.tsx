import { Box, BoxProps, ResponsiveValue } from "@chakra-ui/react";

type CustomLineProps = Omit<BoxProps, "width"> & {
  width: ResponsiveValue<string | number>;
  bg: string;
  children?: React.ReactNode;
};

function CustomLine({ width, bg, children, ...rest }: CustomLineProps) {
  return (
    <Box bg={bg} h="1px" w={width} {...rest}>
      {children}
    </Box>
  );
}

export default CustomLine;
