'use client'

import { useState } from 'react'

export default function Home() {
  const [groupId, setGroupId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'ダウンロードに失敗しました')
      }

      const { downloadPath } = await response.json()
      
      // ダウンロードリンクを作成して自動クリック
      const link = document.createElement('a')
      link.href = downloadPath
      link.download = downloadPath.split('/').pop() || 'products.xlsx'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              商品データダウンロード
            </h1>
            <p className="text-gray-600">グループIDを入力してExcelファイルをダウンロード</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <label htmlFor="groupId" className="block text-sm font-semibold text-gray-900 mb-2">
                グループID
              </label>
              <input
                type="text"
                id="groupId"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="例: GROUP1"
              />
              <p className="mt-2 text-sm text-gray-600">
                利用可能なグループ: GROUP1, GROUP2
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={loading || !groupId}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-base font-semibold
                shadow-lg transition-all duration-200 transform hover:scale-[1.02]
                ${loading || !groupId
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
            >
              {loading ? 'ダウンロード中...' : 'Excelをダウンロード'}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
