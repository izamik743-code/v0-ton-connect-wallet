"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, MousePointer, Sparkles, Battery } from "lucide-react"
import { useGameStore } from "@/store/game-store"

export function UpgradeShop() {
  const { coins, upgrades, upgradeClick, upgradeAutoClick, upgradeLuck, upgradeEnergy } = useGameStore()

  const upgradeItems = [
    {
      id: "click",
      title: "Усиление клика",
      description: "Увеличивает силу каждого клика",
      icon: MousePointer,
      level: upgrades.clickMultiplier,
      cost: upgrades.clickMultiplier * 10,
      action: upgradeClick,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "auto",
      title: "Авто-кликер",
      description: "Автоматически генерирует монеты",
      icon: Zap,
      level: upgrades.autoClicker,
      cost: (upgrades.autoClicker + 1) * 50,
      action: upgradeAutoClick,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "luck",
      title: "Удача",
      description: "Шанс получить x5 монет за клик",
      icon: Sparkles,
      level: upgrades.luckyChance,
      cost: (upgrades.luckyChance + 1) * 25,
      action: upgradeLuck,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "energy",
      title: "Энергия",
      description: "Увеличивает эффективность всех улучшений",
      icon: Battery,
      level: upgrades.energyBoost,
      cost: upgrades.energyBoost * 30,
      action: upgradeEnergy,
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {upgradeItems.map((item) => {
        const Icon = item.icon
        const canAfford = coins >= item.cost

        return (
          <Card key={item.id} className="bg-black/20 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{item.title}</CardTitle>
                    <Badge variant="secondary">Уровень {item.level}</Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-purple-200">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 font-bold">💰 {item.cost.toLocaleString()}</div>
                <Button
                  onClick={item.action}
                  disabled={!canAfford}
                  className={`bg-gradient-to-r ${item.color} hover:opacity-90 disabled:opacity-50`}
                >
                  {canAfford ? "Купить" : "Недостаточно монет"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
