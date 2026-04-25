import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function CommonInput({ label, error, ...props }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {/* Label using your Foreground color and Body font */}
      <label className="text-sm font-medium text-foreground/90 font-body px-1">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          className={`
            w-full px-4 py-2.5 rounded-xl font-body transition-all duration-200
            /* Background and Border variables */
            bg-background border border-border text-foreground
            placeholder:text-secondary/50
            /* Focus states using Primary color */
            outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            /* Error state logic */
            ${error ? "border-accent focus:ring-accent/20" : "border-border"}
            /* Smooth background for Dark Mode */
            appearance-none
          `}
        />
      </div>

      {/* Error Message using Accent color */}
      {error && (
        <p className="text-xs text-accent font-medium px-1 mt-0.5">{error}</p>
      )}
    </div>
  );
}

export default CommonInput;
