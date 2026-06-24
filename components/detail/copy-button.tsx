"use client";

import { useEffect, useRef, useState } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

// Copier le texte en un clic (FR12/UX-DR33) : `navigator.clipboard`, puis le label passe
// à « Copié ✓ » pendant ~1,8 s. (Le toast viendra avec le composant Toast.)
const REVERT_MS = 1800;

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), REVERT_MS);
    } catch {
      // Presse-papiers indisponible : on n'écrase rien, le texte reste sélectionnable.
    }
  }

  return (
    <Button variant="gold" onClick={handleCopy} aria-live="polite">
      {copied ? (
        <>
          <Check aria-hidden="true" /> Copié ✓
        </>
      ) : (
        <>
          <Copy aria-hidden="true" /> Copier le texte
        </>
      )}
    </Button>
  );
}
