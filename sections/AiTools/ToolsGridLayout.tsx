import React from "react";
import { Grid } from "@chakra-ui/react";
import { AiToolsCard } from "./AiToolsCard";
import { AiToolsCardProps } from "./types";

interface ToolsGridLayoutProps {
  tools: AiToolsCardProps[];
  favorites: number[];
  onToggleFavorite: (toolId: number) => void;
}

export const ToolsGridLayout: React.FC<ToolsGridLayoutProps> = ({
  tools,
  favorites,
  onToggleFavorite,
}) => (
  <Grid
    mt={12}
    justifyItems="center"
    alignItems="center"
    templateColumns={{
      base: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(2, 1fr)",
      lg: "repeat(4, 1fr)",
    }}
    gap={5}
    paddingBottom={5}
  >
    {tools.map((tool: AiToolsCardProps) => (
      <AiToolsCard
        tool={tool}
        key={tool.tool_id}
        isFavorite={favorites.includes(tool.tool_id ?? 0)}
        onToggleFavorite={() => onToggleFavorite(tool.tool_id ?? 0)}
      />
    ))}
  </Grid>
);
