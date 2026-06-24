"use client";

import * as React from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Drawer latéral basé sur Radix Dialog — sert de sidebar mobile (< 860px) dans le shell.
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "bg-bg-2 border-glass-line fixed inset-y-0 left-0 z-50 h-full w-3/4 max-w-xs border-r shadow-[0_18px_50px_-22px_rgba(0,0,0,.85)] focus:outline-none",
          className,
        )}
        {...props}
      >
        {/* Titre requis par Radix pour l'accessibilité (lecteurs d'écran). */}
        <DialogPrimitive.Title className="sr-only">
          Menu de navigation
        </DialogPrimitive.Title>
        {children}
        <DialogPrimitive.Close
          aria-label="Fermer le menu"
          className="text-muted-foreground hover:text-foreground absolute top-3 right-3 rounded-sm p-1"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
