"use client";
import { Grid, Box, GridItem } from "@chakra-ui/react";
import InfoAndPolicy from "./InfoAndPolicy";
import Contact from "./Contact";
import SocialMedia from "./SocialMedia";
import Sources from "./Sources";
import RightsSection from "./RightsSection";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="primary"
      py={20}
      w="100%"
      minW="100%"
      overflowX="hidden"
    >
      <Box
        maxW={{ base: "600px", md: "800px", lg: "1200px" }}
        mx="auto"
        px={{ base: 0, md: 6 }}
        w="100%"
      >
        <Grid
          gap={{ base: 4, md: "20px", lg: 4 }}
          templateColumns={{
            base: "1fr",
            sm: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          templateAreas={{
            base: `
              "info"
              "contact"
              "social"
            `,
            md: `
              "info info"
              "contact social"
            `,
            lg: `
              "info contact social"
            `,
          }}
          justifyContent="center"
          alignItems="start"
          w="100%"
          columnGap={{ md: "20px" }}
          rowGap={{ md: "30px" }}
        >
          <GridItem
            area="info"
            justifySelf={{ md: "center" }}
            mb={{ md: "20px" }}
          >
            <InfoAndPolicy />
          </GridItem>
          <GridItem
            area="contact"
            display="flex"
            justifyContent={{ md: "flex-end" }}
            px={{ md: "10px" }}
          >
            <Contact />
          </GridItem>
          <GridItem
            area="social"
            display="flex"
            justifyContent={{ md: "flex-start" }}
            px={{ md: "10px" }}
          >
            <SocialMedia />
          </GridItem>
        </Grid>

        {/* Sources section */}
        <Sources />

        {/* Rights section */}
        <RightsSection />
      </Box>
    </Box>
  );
}
