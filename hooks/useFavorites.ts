import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { AiToolsCardProps } from "../sections/AiTools/types";
import { useSession } from "next-auth/react"; // Import useSession from next-auth

export const useFavorites = () => {
  const { data: session } = useSession(); // Get session data, including the user's email
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isShowingFavorites, setIsShowingFavorites] = useState(false);

  // Ref to prevent multiple initializations during development and hydration
  const initialized = useRef(false);
  // Ref for managing toast debouncing
  const toastDebounceRef = useRef<NodeJS.Timeout>();

  /**
   * Loads user favorites from the database (API)
   * Directly fetching from the server to ensure it's always up-to-date.
   */
  const loadUserFavorites = async () => {
    if (!session?.user?.email) {
      console.error("No email found in session.");
      return;
    }

    try {
      const response = await fetch(
        `/api/userFavorites?email=${session.user.email}`
      );
      const data = await response.json();

      if (data.success) {
        setFavorites(data.favorites || []);
      } else {
        console.error("Failed to load favorites.");
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    }
  };

  /**
   * Initialize favorites on component mount
   * Checks for session to prevent SSR issues
   */
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !initialized.current &&
      session?.user?.email
    ) {
      initialized.current = true;
      loadUserFavorites();
    }
  }, [session?.user?.email]);

  const showToast = (message: string, type: "success" | "warning") => {
    // Clear any existing pending toast
    if (toastDebounceRef.current) {
      clearTimeout(toastDebounceRef.current);
    }

    // Debounce new toast to prevent multiple renders
    toastDebounceRef.current = setTimeout(() => {
      const toastFn = type === "success" ? toast.success : toast.warn;
      toastFn(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        style: {
          color: "#462576",
          fontWeight: "bold",
          direction: "rtl",
        },
      });
    }, 100);
  };

  const toggleFavorite = async (toolId: number) => {
    if (!session?.user?.email) {
      console.error("No email found in session.");
      return;
    }

    setFavorites((prev) => {
      // Check if adding or removing from favorites
      const isAdding = !prev.includes(toolId);
      const newFavorites = isAdding
        ? [...prev, toolId]
        : prev.filter((id) => id !== toolId);

      if (isAdding) {
        showToast(" !تمت الإضافة إلى المفضلة", "success");
      } else {
        showToast("!تمت الإزالة من المفضلة", "warning");
      }

      fetch(`/api/userFavorites?email=${session?.user?.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: newFavorites }),
      });

      return newFavorites;
    });
  };

  const getFavoriteTools = (aiTools: AiToolsCardProps[]) => {
    return aiTools.filter((tool) => favorites.includes(tool.tool_id ?? 0));
  };

  return {
    favorites,
    setFavorites,
    getFavoriteTools,
    toggleFavorite,
    isShowingFavorites,
    setIsShowingFavorites,
  };
};
