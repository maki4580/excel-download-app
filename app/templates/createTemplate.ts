import ExcelJS from 'exceljs'
import path from 'path'

async function createTemplate() {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('商品一覧')

  // ヘッダーの設定
  worksheet.columns = [
    { header: 'グループID', key: 'groupId', width: 15 },
    { header: '商品コード', key: 'productCode', width: 15 },
    { header: '数量', key: 'quantity', width: 10 },
    { header: 'バージョン', key: 'version', width: 10 }
  ]

  // ヘッダー行のスタイル設定
  worksheet.getRow(1).font = { bold: true }
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  }

  // シートの保護
  await worksheet.protect('password', {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false,
    insertColumns: false,
    insertRows: false,
    insertHyperlinks: false,
    deleteColumns: false,
    deleteRows: false,
    sort: false,
    autoFilter: false,
    pivotTables: false
  })

  // ファイルの保存
  const templatePath = path.join(process.cwd(), 'app/templates/template.xlsx')
  await workbook.xlsx.writeFile(templatePath)
  console.log('テンプレートファイルが作成されました:', templatePath)
}

createTemplate().catch(console.error)
