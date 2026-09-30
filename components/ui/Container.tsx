import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={twMerge(" w-full max-w-350 mx-auto py-4 px-2", className)}>
      {children}
    </div>
  );
}
