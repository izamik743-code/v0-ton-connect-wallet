"use client"

import { TonConnectButton } from "@tonconnect/ui-react"
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Gift, ShoppingBag, Zap, Trophy } from "lucide-react"
import { useEffect } from "react"
import { GameStats } from "@/components/game-stats"
import { UpgradeShop } from "@/components/upgrade-shop"
import { SkinsGallery } from "@/components/skins-gallery"
import { GiftsPanel } from "@/components/gifts-panel"
import { TapGame } from "@/components/tap-game"
import { useGameStore } from "@/store/game-store"

export default function HomePage() {
  const userFriendlyAddress = useTonAddress()
  const wallet = useTonWallet()
  const { coins, level, experience, initializeUser } = useGameStore()

  useEffect(() => {
    if (userFriendlyAddress) {
      initializeUser(userFriendlyAddress)
    }
  }, [userFriendlyAddress, initializeUser])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎮 TON Clicker Game</h1>
          <p className="text-purple-200 mb-4">Кликай, апгрейдься, зарабатывай TON!</p>

          <div className="flex justify-center mb-4">
            <TonConnectButton />
          </div>
        </div>

        {wallet ? (
          <div className="space-y-6">
            {/* Game Stats */}
            <GameStats />

            {/* Main Game Tabs */}
            <Tabs defaultValue="game" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-sm">
                <TabsTrigger value="game" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Игра
                </TabsTrigger>
                <TabsTrigger value="upgrades" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Апгрейды
                </TabsTrigger>
                <TabsTrigger value="skins" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Скины
                </TabsTrigger>
                <TabsTrigger value="gifts" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Подарки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="game" className="mt-6">
                <TapGame />
              </TabsContent>

              <TabsContent value="upgrades" className="mt-6">
                <UpgradeShop />
              </TabsContent>

              <TabsContent value="skins" className="mt-6">
                <SkinsGallery />
              </TabsContent>

              <TabsContent value="gifts" className="mt-6">
                <GiftsPanel />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className="bg-black/20 backdrop-blur-sm border-purple-500/20">
              <CardHeader className="text-center">
                <Wallet className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <CardTitle className="text-white">Подключите кошелек</CardTitle>
                <CardDescription className="text-purple-200">
                  Подключите TON кошелек, чтобы начать играть и зарабатывать
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
