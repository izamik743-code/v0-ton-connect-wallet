import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { address, wallet } = await request.json()

    // Здесь вы можете сохранить информацию о подключенном кошельке в базу данных
    // Например, связать адрес кошелька с пользователем Telegram

    console.log("Wallet connected:", { address, wallet })

    // Пример сохранения в базу данных (замените на вашу логику)
    // await saveWalletConnection(telegramUserId, address, wallet)

    return NextResponse.json({
      success: true,
      message: "Wallet connected successfully",
    })
  } catch (error) {
    console.error("Error connecting wallet:", error)
    return NextResponse.json({ success: false, error: "Failed to connect wallet" }, { status: 500 })
  }
}
