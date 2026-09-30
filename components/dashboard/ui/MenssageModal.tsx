"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type MessageType = "success" | "error" | "warning" | "info";

interface MessageModalProps {
  message: string;
  type?: MessageType;
  duration?: number;
  onClose: () => void;
}

export default function MessageModal({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: MessageModalProps) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [duration, onClose]);

  const styles = {
    success: {
      container: "border-green-200 bg-green-50",
      icon: "text-green-600",
      text: "text-green-900",
      Icon: CheckCircle2,
    },
    error: {
      container: "border-red-200 bg-red-50",
      icon: "text-red-600",
      text: "text-red-900",
      Icon: AlertCircle,
    },
    warning: {
      container: "border-yellow-200 bg-yellow-50",
      icon: "text-yellow-600",
      text: "text-yellow-900",
      Icon: AlertCircle,
    },
    info: {
      container: "border-blue-200 bg-blue-50",
      icon: "text-blue-600",
      text: "text-blue-900",
      Icon: Info,
    },
  };

  const currentStyle = styles[type];
  const Icon = currentStyle.Icon;

  return (
    <div className="fixed inset-x-0 top-6 z-[100] flex justify-center px-4">
      <div
        role="alert"
        className={`flex w-full max-w-md items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${currentStyle.container}`}
      >
        <Icon size={20} className={`shrink-0 ${currentStyle.icon}`} />

        <p className={`flex-1 text-sm font-medium ${currentStyle.text}`}>
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar mensagem"
          className={`shrink-0 rounded-md p-1 transition hover:bg-black/5 ${currentStyle.text}`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
