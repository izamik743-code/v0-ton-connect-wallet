import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GameState {
  // User data
  userAddress: string | null

  // Game stats
  coins: number
  level: number
  experience: number
  clickPower: number
  autoClickPower: number

  // Upgrades
  upgrades: {
    clickMultiplier: number
    autoClicker: number
    luckyChance: number
    energyBoost: number
  }

  // Skins
  currentSkin: string
  ownedSkins: string[]

  // Gifts
  dailyGiftClaimed: boolean
  lastGiftClaim: number
  giftStreak: number

  // Actions
  initializeUser: (address: string) => void
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  addExperience: (amount: number) => void
  upgradeClick: () => void
  upgradeAutoClick: () => void
  upgradeLuck: () => void
  upgradeEnergy: () => void
  buySkin: (skinId: string) => boolean
  setSkin: (skinId: string) => void
  claimDailyGift: () => number
  tap: () => number
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      userAddress: null,
      coins: 0,
      level: 1,
      experience: 0,
      clickPower: 1,
      autoClickPower: 0,

      upgrades: {
        clickMultiplier: 1,
        autoClicker: 0,
        luckyChance: 0,
        energyBoost: 1,
      },

      currentSkin: "default",
      ownedSkins: ["default"],

      dailyGiftClaimed: false,
      lastGiftClaim: 0,
      giftStreak: 0,

      // Actions
      initializeUser: (address: string) => {
        set({ userAddress: address })
      },

      addCoins: (amount: number) => {
        set((state) => ({ coins: state.coins + amount }))
      },

      spendCoins: (amount: number) => {
        const state = get()
        if (state.coins >= amount) {
          set({ coins: state.coins - amount })
          return true
        }
        return false
      },

      addExperience: (amount: number) => {
        set((state) => {
          const newExp = state.experience + amount
          const newLevel = Math.floor(newExp / 100) + 1
          return {
            experience: newExp,
            level: newLevel > state.level ? newLevel : state.level,
          }
        })
      },

      upgradeClick: () => {
        const state = get()
        const cost = state.upgrades.clickMultiplier * 10
        if (state.spendCoins(cost)) {
          set((state) => ({
            upgrades: {
              ...state.upgrades,
              clickMultiplier: state.upgrades.clickMultiplier + 1,
            },
            clickPower: state.clickPower + 1,
          }))
        }
      },

      upgradeAutoClick: () => {
        const state = get()
        const cost = (state.upgrades.autoClicker + 1) * 50
        if (state.spendCoins(cost)) {
          set((state) => ({
            upgrades: {
              ...state.upgrades,
              autoClicker: state.upgrades.autoClicker + 1,
            },
            autoClickPower: state.autoClickPower + 1,
          }))
        }
      },

      upgradeLuck: () => {
        const state = get()
        const cost = (state.upgrades.luckyChance + 1) * 25
        if (state.spendCoins(cost)) {
          set((state) => ({
            upgrades: {
              ...state.upgrades,
              luckyChance: state.upgrades.luckyChance + 1,
            },
          }))
        }
      },

      upgradeEnergy: () => {
        const state = get()
        const cost = state.upgrades.energyBoost * 30
        if (state.spendCoins(cost)) {
          set((state) => ({
            upgrades: {
              ...state.upgrades,
              energyBoost: state.upgrades.energyBoost + 1,
            },
          }))
        }
      },

      buySkin: (skinId: string) => {
        const state = get()
        const skinPrices: Record<string, number> = {
          golden: 500,
          diamond: 1000,
          rainbow: 2000,
          cosmic: 5000,
        }

        const cost = skinPrices[skinId] || 0
        if (cost > 0 && state.spendCoins(cost)) {
          set((state) => ({
            ownedSkins: [...state.ownedSkins, skinId],
          }))
          return true
        }
        return false
      },

      setSkin: (skinId: string) => {
        const state = get()
        if (state.ownedSkins.includes(skinId)) {
          set({ currentSkin: skinId })
        }
      },

      claimDailyGift: () => {
        const now = Date.now()
        const state = get()
        const oneDayMs = 24 * 60 * 60 * 1000

        if (now - state.lastGiftClaim >= oneDayMs) {
          const baseReward = 50
          const streakBonus = state.giftStreak * 10
          const reward = baseReward + streakBonus

          set((state) => ({
            coins: state.coins + reward,
            dailyGiftClaimed: true,
            lastGiftClaim: now,
            giftStreak: state.giftStreak + 1,
          }))

          return reward
        }
        return 0
      },

      tap: () => {
        const state = get()
        let reward = state.clickPower

        // Lucky chance
        if (Math.random() < state.upgrades.luckyChance * 0.01) {
          reward *= 5 // Lucky multiplier
        }

        state.addCoins(reward)
        state.addExperience(1)

        return reward
      },
    }),
    {
      name: "ton-game-storage",
    },
  ),
)
