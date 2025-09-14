import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json()

    // Здесь вы можете удалить информацию о кошельке из базы данных
    console.log("Wallet disconnected:", address)

    // Пример удаления из базы данных (замените на вашу логику)
    // await removeWalletConnection(address)

    return NextResponse.json({
      success: true,
      message: "Wallet disconnected successfully",
    })
  } catch (error) {
    console.error("Error disconnecting wallet:", error)
    return NextResponse.json({ success: false, error: "Failed to disconnect wallet" }, { status: 500 })
  }
}
