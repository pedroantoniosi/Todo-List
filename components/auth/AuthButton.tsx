interface AuthButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
}

export default function AuthButton({
  children,
  type = "submit",
}: AuthButtonProps) {
  return (
    <button
      type={type}
      className="h-11  w-full  rounded-xl  bg-gradient-to-r  from-orange-400  via-pink-400  to-fuchsia-500  
      text-sm  font-semibold  text-white  shadow-lg  shadow-orange-500/10  transition  
      hover:-translate-y-0.5  hover:shadow-orange-500/20  active:translate-y-0"
    >
      {children}
    </button>
  );
}
