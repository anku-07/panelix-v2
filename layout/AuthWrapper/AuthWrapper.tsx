import React from "react";

interface IAuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

function AuthWrapper({ children, title, subtitle }: IAuthWrapperProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6">
      {/* The Central Card */}
      {/* bg-surface is your lighter navy/grey for depth */}
      <div className="w-full max-w-[420px] bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-8 pb-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-secondary mt-2 text-sm">{subtitle}</p>
          )}
        </div>

        {/* Content Section (Where your forms go) */}
        <div className="px-8 pb-8 font-body">{children}</div>
        

      </div>

    </div>
  );
}

export default AuthWrapper;
