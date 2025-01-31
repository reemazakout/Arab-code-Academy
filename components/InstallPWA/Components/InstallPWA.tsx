"use client";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const isInstalled = window.matchMedia("(display-mode: standalone)").matches;
    if (isInstalled) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("تم تثبيت التطبيق");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50" dir="rtl">
      <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">تثبيت التطبيق</h3>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2"
            >
              ×
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            هل تريد تثبيت التطبيق للوصول السريع والاستخدام بدون إنترنت؟
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleInstall}
              className="bg-[#462576] text-white px-6 py-2 rounded-lg  w-full sm:w-auto order-1 sm:order-2"
            >
              تثبيت
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="border border-gray-300 px-6 py-2 text-black rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto order-2 sm:order-1"
            >
              لاحقاً
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
