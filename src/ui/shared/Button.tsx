import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../shared/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: "default" | "danger";
}

export function Button({
  children,
  active,
  variant = "default",
  className,
  disabled,
  ...buttonProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        "inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-40",
        variant === "danger" && "border-rose-200 bg-rose-50 font-semibold text-rose-700 hover:bg-rose-100",
        variant === "default" &&
          (active
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"),
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
