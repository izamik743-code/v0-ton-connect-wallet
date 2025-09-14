"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Lock } from "lucide-react"
import { useGameStore } from "@/store/game-store"

export function SkinsGallery() {
  const { coins, currentSkin, ownedSkins, buySkin, setSkin } = useGameStore()

  const skins = [
    {
      id: "default",
      name: "Классический",
      emoji: "💎",
      price: 0,
      description: "Стандартный кристалл",
      rarity: "common",
    },
    {
      id: "golden",
      name: "Золотой",
      emoji: "🏆",
      price: 500,
      description: "Блестящий золотой кристалл",
      rarity: "rare",
    },
    {
      id: "diamond",
      name: "Алмазный",
      emoji: "💠",
      price: 1000,
      description: "Сверкающий алмаз",
      rarity: "epic",
    },
    {
      id: "rainbow",
      name: "Радужный",
      emoji: "🌈",
      price: 2000,
      description: "Переливающийся всеми цветами",
      rarity: "legendary",
    },
    {
      id: "cosmic",
      name: "Космический",
      emoji: "🌟",
      price: 5000,
      description: "Звездная пыль вселенной",
      rarity: "mythic",
    },
  ]

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: "from-gray-500 to-gray-600",
      rare: "from-blue-500 to-blue-600",
      epic: "from-purple-500 to-purple-600",
      legendary: "from-yellow-500 to-orange-500",
      mythic: "from-pink-500 to-red-500",
    }
    return colors[rarity] || colors.common
  }

  const getRarityName = (rarity: string) => {
    const names: Record<string, string> = {
      common: "Обычный",
      rare: "Редкий",
      epic: "Эпический",
      legendary: "Легендарный",
      mythic: "Мифический",
    }
    return names[rarity] || "Обычный"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skins.map((skin) => {
        const isOwned = ownedSkins.includes(skin.id)
        const isActive = currentSkin === skin.id
        const canAfford = coins >= skin.price

        return (
          <Card
            key={skin.id}
            className={`bg-black/20 backdrop-blur-sm border-purple-500/20 ${isActive ? "ring-2 ring-yellow-400" : ""}`}
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-2">{skin.emoji}</div>
              <CardTitle className="text-white">{skin.name}</CardTitle>
              <Badge className={`bg-gradient-to-r ${getRarityColor(skin.rarity)} text-white`}>
                {getRarityName(skin.rarity)}
              </Badge>
              <CardDescription className="text-purple-200">{skin.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {skin.price > 0 && (
                  <div className="text-center text-yellow-400 font-bold">💰 {skin.price.toLocaleString()}</div>
                )}

                {isActive ? (
                  <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                    <Check className="h-4 w-4 mr-2" />
                    Активен
                  </Button>
                ) : isOwned ? (
                  <Button onClick={() => setSkin(skin.id)} className="w-full bg-blue-600 hover:bg-blue-700">
                    Выбрать
                  </Button>
                ) : skin.price === 0 ? (
                  <Button onClick={() => setSkin(skin.id)} className="w-full bg-gray-600 hover:bg-gray-700">
                    Выбрать
                  </Button>
                ) : (
                  <Button
                    onClick={() => buySkin(skin.id)}
                    disabled={!canAfford}
                    className={`w-full bg-gradient-to-r ${getRarityColor(skin.rarity)} hover:opacity-90 disabled:opacity-50`}
                  >
                    {canAfford ? (
                      "Купить"
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Недостаточно монет
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
