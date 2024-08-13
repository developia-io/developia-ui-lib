import React, { useEffect, useState } from "react";
import clsx from "clsx";

type NotificationType = "success" | "error" | "info" | "warning";
type NotificationStyle = "filled" | "outlined" | "transparent";

export interface NotificationProps {
  id: string;
  message: string;
  type: NotificationType;
  customColor?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number; // Duration before auto-close (in milliseconds)
  showCloseButton?: boolean; // Option to show or hide the close button
  styleType?: NotificationStyle; // Style type: filled, outlined, transparent
}

const Notification: React.FC<NotificationProps> = ({
  id,
  message,
  type,
  customColor,
  position = "top-right",
  duration = 5000,
  showCloseButton = false, // Default to show the close button
  styleType = "filled", // Default style type
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const colors: Record<
    NotificationType,
    { bg: string; border: string; text: string }
  > = {
    success: {
      bg: "bg-green-500",
      border: "border-green-500",
      text: "text-green-500",
    },
    error: { bg: "bg-red-500", border: "border-red-500", text: "text-red-500" },
    info: {
      bg: "bg-blue-500",
      border: "border-blue-500",
      text: "text-blue-500",
    },
    warning: {
      bg: "bg-yellow-500",
      border: "border-yellow-500",
      text: "text-yellow-500",
    },
  };

  const positionClasses: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const backgroundColor = customColor || colors[type].bg;
  const borderColor = colors[type].border;
  const textColor = colors[type].text;

  const styleClasses = clsx({
    [backgroundColor]: styleType === "filled",
    "bg-transparent": styleType === "transparent",
    "bg-white": styleType === "outlined",
    [borderColor]: styleType === "outlined",
    border: styleType === "outlined",
    [textColor]: styleType === "outlined" || styleType === "transparent",
  });

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "fixed  p-4 rounded shadow-lg flex justify-between items-center",
        styleClasses,
        positionClasses[position]
      )}
    >
      <span>{message}</span>
      {showCloseButton && (
        <button onClick={() => setIsVisible(false)} className={clsx("ml-4")}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Notification;
