"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Calendar, Flame, Clock } from "lucide-react"
import { useGameStore } from "@/store/game-store"
import { useState, useEffect } from "react"

export function GiftsPanel() {
  const { claimDailyGift, giftStreak, lastGiftClaim } = useGameStore()
  const [timeUntilNextGift, setTimeUntilNextGift] = useState("")
  const [canClaim, setCanClaim] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const oneDayMs = 24 * 60 * 60 * 1000
      const timeSinceLastClaim = now - lastGiftClaim
      const timeUntilNext = oneDayMs - timeSinceLastClaim

      if (timeUntilNext <= 0) {
        setCanClaim(true)
        setTimeUntilNextGift("")
      } else {
        setCanClaim(false)
        const hours = Math.floor(timeUntilNext / (60 * 60 * 1000))
        const minutes = Math.floor((timeUntilNext % (60 * 60 * 1000)) / (60 * 1000))
        setTimeUntilNextGift(`${hours}ч ${minutes}м`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [lastGiftClaim])

  const handleClaimGift = () => {
    const reward = claimDailyGift()
    if (reward > 0) {
      // Show success message or animation
      console.log(`Получен подарок: ${reward} монет!`)
    }
  }

  const getStreakReward = (streak: number) => {
    return 50 + streak * 10
  }

  return (
    <div className="space-y-6">
      {/* Daily Gift */}
      <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Gift className="h-6 w-6 text-yellow-400" />
            Ежедневный подарок
          </CardTitle>
          <CardDescription className="text-yellow-200">Заходи каждый день, чтобы получить бонус!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              <span className="text-white">Серия: {giftStreak} дней</span>
            </div>
            <Badge className="bg-yellow-500 text-black">+{getStreakReward(giftStreak)} монет</Badge>
          </div>

          {canClaim ? (
            <Button
              onClick={handleClaimGift}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
            >
              <Gift className="h-4 w-4 mr-2" />
              Забрать подарок!
            </Button>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-200 mb-2">
                <Clock className="h-4 w-4" />
                <span>Следующий подарок через: {timeUntilNextGift}</span>
              </div>
              <Button disabled className="w-full">
                Подарок уже получен
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Special Offers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">🎁 Стартовый пакет</CardTitle>
            <CardDescription className="text-purple-200">Специальное предложение для новичков</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-white">
              <div>• 1000 монет</div>
              <div>• +5 к силе клика</div>
              <div>• Редкий скин</div>
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500">0.1 TON</Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">⚡ Энергетический пакет</CardTitle>
            <CardDescription className="text-blue-200">Мощные улучшения для продвинутых игроков</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-white">
              <div>• 5000 монет</div>
              <div>• Авто-кликер x10</div>
              <div>• Эпический скин</div>
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500">0.5 TON</Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Rewards */}
      <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-6 w-6 text-green-400" />
            Достижения и награды
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div>
                <div className="text-white font-medium">Первые 1000 кликов</div>
                <div className="text-green-200 text-sm">Сделай 1000 кликов</div>
              </div>
              <Badge className="bg-green-500">+100 монет</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div>
                <div className="text-white font-medium">Коллекционер скинов</div>
                <div className="text-blue-200 text-sm">Собери 3 скина</div>
              </div>
              <Badge className="bg-blue-500">+500 монет</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div>
                <div className="text-white font-medium">Мастер апгрейдов</div>
                <div className="text-purple-200 text-sm">Прокачай все улучшения до 10 уровня</div>
              </div>
              <Badge className="bg-purple-500">+2000 монет</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
