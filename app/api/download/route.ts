import { NextResponse } from 'next/server'
import { productRepository } from '@/app/repositories/productRepository'
import { excelService } from '@/app/services/excelService'

export async function POST(request: Request) {
  try {
    const { groupId } = await request.json()

    if (!groupId) {
      return NextResponse.json(
        { error: 'グループIDは必須です' },
        { status: 400 }
      )
    }

    // 指定されたグループIDの商品データを取得
    const products = await productRepository.findByGroupId(groupId)

    // Excelファイルを生成
    const downloadPath = await excelService.generateExcel(products, groupId)

    return NextResponse.json({ downloadPath })
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
