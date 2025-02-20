import ExcelJS from 'exceljs';
import path from 'path';

async function createTemplate() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('商品一覧');

  // ヘッダー行の設定
  worksheet.columns = [
    { header: 'グループID', key: 'groupId', width: 15 },
    { header: '商品コード', key: 'productCode', width: 15 },
    { header: '数量', key: 'quantity', width: 10 },
    { header: 'バージョン', key: 'version', width: 10 }
  ];

  // ヘッダー行のスタイル設定
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  // 保護の設定
  worksheet.protect('password123', {
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
  });

  // すべてのセルをロック
  for (let col = 1; col <= worksheet.columnCount; col++) {
    for (let row = 1; row <= 100; row++) {
      const cell = worksheet.getCell(row, col);
      cell.protection = {
        locked: true
      };
    }
  }

  // 数量列（C列）のみロック解除（入力可能に）
  for (let row = 2; row <= 100; row++) {
    const cell = worksheet.getCell(row, 3); // C列
    cell.protection = {
      locked: false
    };
  }

  // ファイルの保存
  const templatePath = path.join(process.cwd(), 'app/templates/template.xlsx');
  await workbook.xlsx.writeFile(templatePath);
  console.log(templatePath);
}

createTemplate().catch(console.error);
