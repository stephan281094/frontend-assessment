import { cx } from "~/utils/cx";

interface Props
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      className={cx(
        "p-4 py-2 hover:opacity-75",
        variant === "primary" && "bg-black text-white",
        variant === "secondary" &&
          "border-2 border-black bg-transparent text-black"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
