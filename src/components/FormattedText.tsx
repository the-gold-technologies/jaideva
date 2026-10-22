"use client";

import React from "react";
import Link from "next/link";

interface FormattedTextProps {
  text: string;
  className?: string;
  linkClassName?: string;
}

export function FormattedText({
  text,
  className = "",
  linkClassName = "text-[#C86218] hover:underline font-semibold",
}: FormattedTextProps) {
  if (!text || typeof text !== "string") return null;

  const parts: React.ReactNode[] = [];
  // Matches markdown links [label](url) or bold **bold text**
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const [fullMatch, linkText, linkUrl, boldText] = match;

    // Append preceding text
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    // Append link or bold text
    if (linkText !== undefined && linkUrl !== undefined) {
      const trimmedUrl = linkUrl.trim();
      const isInternal = trimmedUrl.startsWith("/") || trimmedUrl.startsWith("#");
      const isAction = trimmedUrl.startsWith("mailto:") || trimmedUrl.startsWith("tel:");

      if (isInternal) {
        parts.push(
          <Link key={`link-${matchIndex}`} href={trimmedUrl} className={linkClassName}>
            {linkText}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={`link-${matchIndex}`}
            href={trimmedUrl}
            target={isAction ? undefined : "_blank"}
            rel={isAction ? undefined : "noopener noreferrer"}
            className={linkClassName}
          >
            {linkText}
          </a>,
        );
      }
    } else if (boldText !== undefined) {
      parts.push(
        <strong key={`bold-${matchIndex}`} className="font-bold text-inherit">
          {boldText}
        </strong>,
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Append remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <span className={`whitespace-pre-line ${className}`.trim()}>
      {parts.length > 0 ? parts : text}
    </span>
  );
}

export const LinkText = FormattedText;
