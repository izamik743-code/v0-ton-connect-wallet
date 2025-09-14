"use client"

import { useTonConnectUI, useTonAddress, useTonWallet } from "@tonconnect/ui-react"
import { useEffect } from "react"

export function useTonConnect() {
  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()
  const wallet = useTonWallet()

  useEffect(() => {
    if (address && wallet) {
      // Уведомляем бэкенд о подключении кошелька
      fetch("/api/wallet/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, wallet }),
      }).catch(console.error)
    }
  }, [address, wallet])

  const disconnect = async () => {
    if (address) {
      // Уведомляем бэкенд об отключении кошелька
      await fetch("/api/wallet/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      }).catch(console.error)
    }

    await tonConnectUI.disconnect()
  }

  return {
    tonConnectUI,
    address,
    wallet,
    disconnect,
    isConnected: !!address,
  }
}
