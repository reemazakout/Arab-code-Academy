import React from "react";
import Image, { StaticImageData } from "next/image";

interface IconWrapperProps {
  icon: React.ReactNode | string | StaticImageData;
  size?: "sm" | "md" | "lg";
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, size = "md" }) => {
  if (!icon) return null;

  // Adjust icon size based on button size
  const iconSize = size === "sm" ? "16px" : size === "lg" ? "32px" : "24px";
  const marginLeft = size === "sm" ? "8px" : "12px";

  const iconContainerStyle = {
    position: "relative" as const,
    width: iconSize,
    height: iconSize,
    marginLeft: marginLeft,
    display: "flex",
    alignItems: "center",
  };

  // Handle StaticImageData (imported images)
  if (typeof icon === "object" && "src" in icon) {
    return (
      <div style={iconContainerStyle}>
        <Image
          src={icon}
          alt="button icon"
          fill
          sizes={iconSize}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  // Handle URL strings as paths
  if (typeof icon === "string") {
    return (
      <div style={iconContainerStyle}>
        <Image
          src={icon}
          alt="button icon"
          fill
          sizes={iconSize}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  // If the icon is a React component
  return (
    <span
      style={{ marginLeft: marginLeft, display: "flex", alignItems: "center" }}
    >
      {icon}
    </span>
  );
};

export default IconWrapper;
