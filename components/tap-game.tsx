"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useGameStore } from "@/store/game-store"

export function TapGame() {
  const { tap, autoClickPower, addCoins, currentSkin } = useGameStore()
  const [tapEffect, setTapEffect] = useState<{ id: number; x: number; y: number; reward: number }[]>([])
  const [tapCount, setTapCount] = useState(0)

  // Auto-clicker effect
  useEffect(() => {
    if (autoClickPower > 0) {
      const interval = setInterval(() => {
        addCoins(autoClickPower)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [autoClickPower, addCoins])

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reward = tap()
    setTapCount((prev) => prev + 1)

    // Create tap effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      reward,
    }

    setTapEffect((prev) => [...prev, newEffect])

    // Remove effect after animation
    setTimeout(() => {
      setTapEffect((prev) => prev.filter((effect) => effect.id !== newEffect.id))
    }, 1000)
  }

  const getSkinEmoji = (skin: string) => {
    const skins: Record<string, string> = {
      default: "💎",
      golden: "🏆",
      diamond: "💠",
      rainbow: "🌈",
      cosmic: "🌟",
    }
    return skins[skin] || "💎"
  }

  return (
    <div className="text-center space-y-6">
      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20">
        <CardContent className="p-8">
          <div className="relative inline-block">
            <Button
              onClick={handleTap}
              className="w-48 h-48 rounded-full text-8xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-4 border-white/20 shadow-2xl transform transition-all duration-150 hover:scale-105 active:scale-95"
              style={{
                boxShadow: "0 0 50px rgba(168, 85, 247, 0.5)",
              }}
            >
              {getSkinEmoji(currentSkin)}
            </Button>

            {/* Tap effects */}
            {tapEffect.map((effect) => (
              <div
                key={effect.id}
                className="absolute pointer-events-none text-yellow-400 font-bold text-xl animate-bounce"
                style={{
                  left: effect.x,
                  top: effect.y,
                  animation: "float-up 1s ease-out forwards",
                }}
              >
                +{effect.reward}
              </div>
            ))}
          </div>

          <div className="mt-6 text-white">
            <div className="text-lg">
              Всего кликов: <span className="font-bold text-yellow-400">{tapCount.toLocaleString()}</span>
            </div>
            <div className="text-sm text-purple-200 mt-2">Кликай по кристаллу, чтобы заработать монеты!</div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px);
          }
        }
      `}</style>
    </div>
  )
}
