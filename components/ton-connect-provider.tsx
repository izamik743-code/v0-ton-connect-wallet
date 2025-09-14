"use client"

import type React from "react"

import { TonConnectUIProvider } from "@tonconnect/ui-react"

const manifestUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-domain.vercel.app/tonconnect-manifest.json"
    : "http://localhost:3000/tonconnect-manifest.json"

export function TonConnectProvider({ children }: { children: React.ReactNode }) {
  return <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>
}
