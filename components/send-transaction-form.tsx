"use client"

import type React from "react"

import { useState } from "react"
import { useTonConnectUI } from "@tonconnect/ui-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SendTransactionForm() {
  const [tonConnectUI] = useTonConnectUI()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    to: "",
    amount: "",
    comment: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.to || !formData.amount) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 300, // 5 minutes
        messages: [
          {
            address: formData.to,
            amount: (Number.parseFloat(formData.amount) * 1000000000).toString(), // Convert to nanotons
            payload: formData.comment ? btoa(formData.comment) : undefined,
          },
        ],
      }

      const result = await tonConnectUI.sendTransaction(transaction)

      toast({
        title: "Успех!",
        description: "Транзакция отправлена успешно",
      })

      // Reset form
      setFormData({ to: "", amount: "", comment: "" })

      console.log("Transaction result:", result)
    } catch (error) {
      console.error("Transaction error:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось отправить транзакцию",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="to">Адрес получателя *</Label>
        <Input
          id="to"
          type="text"
          placeholder="EQD..."
          value={formData.to}
          onChange={(e) => setFormData((prev) => ({ ...prev, to: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="amount">Сумма (TON) *</Label>
        <Input
          id="amount"
          type="number"
          step="0.001"
          min="0"
          placeholder="0.1"
          value={formData.amount}
          onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="comment">Комментарий (опционально)</Label>
        <Textarea
          id="comment"
          placeholder="Комментарий к транзакции..."
          value={formData.comment}
          onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Отправить транзакцию
          </>
        )}
      </Button>
    </form>
  )
}
