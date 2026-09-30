interface AuthInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
}

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  name,
  required = true,
}: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium text-black/60"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-black/10
          bg-black/[0.04]
          px-4
          text-sm
          text-black
          outline-none
          placeholder:text-black/20
          transition
          focus:border-orange-400/60
          focus:bg-black/[0.06]
          focus:ring-2
          focus:ring-orange-400/10
        "
      />
    </div>
  );
}
