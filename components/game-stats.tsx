"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Coins, Zap, Trophy, Star } from "lucide-react"
import { useGameStore } from "@/store/game-store"

export function GameStats() {
  const { coins, level, experience, clickPower, autoClickPower } = useGameStore()

  const expToNextLevel = level * 100
  const currentLevelExp = experience % 100
  const expProgress = (currentLevelExp / 100) * 100

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
        <CardContent className="p-4 text-center">
          <Coins className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
          <div className="text-2xl font-bold text-white">{coins.toLocaleString()}</div>
          <div className="text-xs text-yellow-200">Монеты</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
        <CardContent className="p-4 text-center">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-white">{level}</div>
          <div className="text-xs text-purple-200">Уровень</div>
          <Progress value={expProgress} className="mt-2 h-1" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
        <CardContent className="p-4 text-center">
          <Zap className="h-8 w-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold text-white">{clickPower}</div>
          <div className="text-xs text-blue-200">Сила клика</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
        <CardContent className="p-4 text-center">
          <Star className="h-8 w-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold text-white">{autoClickPower}/сек</div>
          <div className="text-xs text-green-200">Авто-клик</div>
        </CardContent>
      </Card>
    </div>
  )
}
