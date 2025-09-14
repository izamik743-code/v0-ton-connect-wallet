import type { Wallet } from "@tonconnect/ui-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface WalletInfoProps {
  wallet: Wallet
}

export function WalletInfo({ wallet }: WalletInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {wallet.imageUrl && (
          <img src={wallet.imageUrl || "/placeholder.svg"} alt={wallet.name} className="w-12 h-12 rounded-lg" />
        )}
        <div>
          <h3 className="font-semibold text-lg">{wallet.name}</h3>
          <Badge variant="secondary">{wallet.appName}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Платформа</div>
            <div className="font-medium">{wallet.platform}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Версия</div>
            <div className="font-medium">{wallet.appVersion || "Неизвестно"}</div>
          </CardContent>
        </Card>
      </div>

      {wallet.universalLink && (
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Universal Link</div>
          <Badge variant="outline" className="font-mono text-xs break-all">
            {wallet.universalLink}
          </Badge>
        </div>
      )}
    </div>
  )
}
