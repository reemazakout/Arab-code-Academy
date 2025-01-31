"use client";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Search from "../public/images/Search.svg";
import { useTheme } from "../hooks/useTheme";

interface SearchBarProps {
  placeholder: string;
  onSearch?: (value: string) => void;
  searchQuery?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  searchQuery,
  sx,
}) => {
  const inputWidth = useBreakpointValue({
    base: "100%",
    md: "100%",
    lg: "50%",
  });

  const { color } = useTheme();
  const { colorMode } = useColorMode();

  const iconColor = colorMode === "dark" ? "transparent" : "black";
  const borderColor = colorMode === "dark" ? "white" : color;

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      width="100%"
      marginTop={{ lg: "160px" }}
      paddingLeft={{ base: "60px", sm: "140px", md: "220px", lg: "175px" }}
      paddingRight={{ base: "70px", sm: "150px", md: "180px", lg: "1px" }}
      sx={sx}
    >
      <InputGroup width={inputWidth} dir="ltr">
        <InputLeftElement height="100%" pointerEvents="none" marginLeft="1rem">
          {colorMode === "light" && ( // عرض هذا الكود فقط في الوضع الفاتح
            <Box
              color={iconColor}
              display="flex"
              alignItems="center"
              height="100%"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
                pr="0.5rem"
              >
                <Image
                  src={Search.src}
                  alt="Search"
                  width={25}
                  height={25}
                  style={{
                    objectFit: "contain",
                    height: "20px",
                    width: "20px",
                  }}
                />
              </Box>

              <Box
                color={iconColor}
                height="4rem"
                width="0.25rem"
                overflow="hidden"
                bg="primary"
                ml="0.5rem"
              />
            </Box>
          )}
        </InputLeftElement>

        <Input
          w={{ sm: "400px", md: "500px", lg: "600px" }}
          height="4rem"
          border="2px"
          borderColor={borderColor}
          rounded="full"
          type="search"
          defaultValue={searchQuery}
          placeholder={placeholder}
          paddingLeft="2.5rem"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (onSearch) {
                onSearch((e.target as HTMLInputElement).value);
              }
            }
          }}
          _focus={{
            borderColor: borderColor,
            boxShadow: `0 0 0 1px ${borderColor}`,
          }}
          _hover={{ borderColor: borderColor }}
          _placeholder={{ color: borderColor }}
          _active={{ borderColor: borderColor }}
          textAlign="right"
          sx={sx}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
