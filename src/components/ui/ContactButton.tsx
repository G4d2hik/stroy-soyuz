"use client";

import React from "react";

interface ContactButtonProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export default function ContactButton({ className, children = "Связаться с нами", id }: ContactButtonProps) {
  return (
    <button
      id={id}
      onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
      className={className}
    >
      {children}
    </button>
  );
}
