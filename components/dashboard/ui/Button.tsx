import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children?: ReactNode;
}

export default function Button({ variant, children, ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-gray-300 rounded-md",
    secondary: "bg-primary text-white hover:bg-gray-300 rounded-4xl",
  };

  return (
    <button
      className={`px-4 py-2 transition cursor-pointer ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
