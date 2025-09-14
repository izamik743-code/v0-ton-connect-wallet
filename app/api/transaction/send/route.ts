import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { from, to, amount, hash, comment } = await request.json()

    // Здесь вы можете сохранить информацию о транзакции в базу данных
    console.log("Transaction sent:", { from, to, amount, hash, comment })

    // Пример сохранения транзакции (замените на вашу логику)
    // await saveTransaction({ from, to, amount, hash, comment, timestamp: new Date() })

    return NextResponse.json({
      success: true,
      message: "Transaction recorded successfully",
    })
  } catch (error) {
    console.error("Error recording transaction:", error)
    return NextResponse.json({ success: false, error: "Failed to record transaction" }, { status: 500 })
  }
}
