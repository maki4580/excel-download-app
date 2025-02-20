# スクリプトの使用方法

## Excelテンプレートの作成 (createTemplate.js)

このスクリプトは商品一覧用のExcelテンプレートを作成します。

```bash
node scripts/createTemplate.js
```

### 機能
- 商品一覧シートを作成
- 以下のカラムを設定：
  - グループID
  - 商品コード
  - 数量
  - バージョン
- セキュリティ設定：
  - シートの保護（パスワード設定）
  - 数量（C列）以外のセルをロック
  - 入力は数量（C列）のみ可能

作成されたテンプレートは `app/templates/template.xlsx` に保存されます。

## テストデータの投入 (seed.ts)

このスクリプトはデータベースにテストデータを投入します。

```bash
npx ts-node scripts/seed.ts
```

### 投入されるテストデータ
```typescript
[
  {
    groupId: 'GROUP1',
    productCode: 'PROD001',
    quantity: 100,
    version: 1,
  },
  {
    groupId: 'GROUP1',
    productCode: 'PROD002',
    quantity: 150,
    version: 1,
  },
  {
    groupId: 'GROUP2',
    productCode: 'PROD003',
    quantity: 200,
    version: 1,
  }
]
```

### 前提条件
- Prismaの設定が完了していること
- データベースが起動していること

### 注意事項
- スクリプト実行前にデータベースの接続情報が正しく設定されていることを確認してください
- 既存のデータがある場合は、重複に注意してください
