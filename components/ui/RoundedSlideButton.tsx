"use client";

import Link from "next/link";
import { type ReactNode } from "react";

interface RoundedSlideButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  defaultBg?: string;
  defaultText?: string;
  hoverBg?: string;
  hoverText?: string;
  borderColor?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export default function RoundedSlideButton({
  children,
  href,
  onClick,
  icon,
  defaultBg = "var(--blue-600)",
  defaultText = "#ffffff",
  hoverBg = "#ffffff",
  hoverText = "var(--blue-600)",
  borderColor,
  className = "",
  target,
  rel,
}: RoundedSlideButtonProps) {
  const style = {
    "--btn-bg": defaultBg,
    "--btn-text": defaultText,
    "--btn-hover-bg": hoverBg,
    "--btn-hover-text": hoverText,
    "--btn-border": borderColor || defaultBg,
  } as React.CSSProperties;

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`btn-slide ${className}`} style={style} target={target} rel={rel}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`btn-slide ${className}`} style={style}>
      {content}
    </button>
  );
}
