import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary" | "inherit";
  className?: string; // To allow extra custom classes like 'w-full'
}

function Button({
  children,
  variant = "contained",
  color = "primary",
  className = "",
  ...props
}: ButtonProps) {
  // Base styles for all buttons
  const baseStyles =
    "cursor-pointer  px-6 py-2.5 rounded-xl font-heading font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";

  // Logic for Variants and Colors
  const styles = {
    contained: {
      primary:
        "bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90",
      secondary:
        "bg-secondary text-white shadow-lg shadow-secondary/20 hover:opacity-90",
      inherit: "bg-foreground text-background hover:opacity-90",
    },
    outlined: {
      primary: "border-2 border-primary text-primary hover:bg-primary/10",
      secondary:
        "border-2 border-secondary text-secondary hover:bg-secondary/10",
      inherit: "border-2 border-border text-foreground hover:bg-foreground/5",
    },
  };

  // Combine the selected styles
  const selectedStyle = styles[variant][color];

  return (
    <button
      className={`${baseStyles} ${selectedStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
