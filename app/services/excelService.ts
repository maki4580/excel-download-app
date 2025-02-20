import ExcelJS from 'exceljs'
import path from 'path'
import type { Product } from '../types/product'

export class ExcelService {
  private readonly templatePath: string
  private readonly downloadDir: string

  constructor() {
    this.templatePath = path.join(process.cwd(), 'app/templates/template.xlsx')
    this.downloadDir = path.join(process.cwd(), 'public/downloads')
  }

  async generateExcel(products: Product[], groupId: string): Promise<string> {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(this.templatePath)
    
    const worksheet = workbook.getWorksheet(1)
    if (!worksheet) throw new Error('ワークシートが見つかりません')

    // データの書き込み開始行（ヘッダーの次の行から）
    let row = 2
    
    for (const product of products) {
      worksheet.getCell(`A${row}`).value = product.groupId
      worksheet.getCell(`B${row}`).value = product.productCode
      worksheet.getCell(`C${row}`).value = product.quantity
      worksheet.getCell(`D${row}`).value = product.version
      row++
    }

    // ファイル名に日時を含めてユニークにする
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `products_${groupId}_${timestamp}.xlsx`
    const filePath = path.join(this.downloadDir, fileName)

    await workbook.xlsx.writeFile(filePath)
    
    // URLパスを返す（publicディレクトリからの相対パス）
    return `/downloads/${fileName}`
  }
}

export const excelService = new ExcelService()
