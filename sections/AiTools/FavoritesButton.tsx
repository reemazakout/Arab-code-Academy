import Image from "next/image";
import heartLogo from "../../public/images/emp-heart.png";
import ButtonAC from "../../components/ButtonAC";

interface FavoritesButtonProps {
  isShowingFavorites: boolean;
  onClick: () => void;
}

export const FavoritesButton: React.FC<FavoritesButtonProps> = ({
  isShowingFavorites,
  onClick,
}) => (
  <ButtonAC
    onClick={onClick}
    pr="10px"
    pl="0px"
    size="lg"
    color={isShowingFavorites ? "white" : "#783BA2"}
    bg={isShowingFavorites ? "#783BA2" : "white"}
    text="المفضلة"
    fontSize={{ lg: 17, sm: 10 }}
    icon={
      <Image
        src={heartLogo}
        alt="Favorite Icon"
        style={{ width: "100", height: "20" }}
      />
    }
    sx={{
      width: "140px",
      height: "44px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
      flexDirection: "row-reverse",
      gap: "7px",
    }}
    ml={{ lg: 2 }}
    mr={{ lg: "100px" }}
    order={{ lg: 1 }}
  />
);
