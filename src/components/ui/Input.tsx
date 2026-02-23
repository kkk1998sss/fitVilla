import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-fitvilla-light/90">
          {label}
        </label>
      )}
      <input id={id} className={className} {...props} />
    </div>
  );
}
