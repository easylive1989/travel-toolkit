import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'

// Finance
import { ExchangeRate } from '@/features/finance/ExchangeRate'
import { Tipping } from '@/features/finance/Tipping'
import { TaxRefund } from '@/features/finance/TaxRefund'
import { Ledger } from '@/features/finance/Ledger'

// Life
import { UnitConverter } from '@/features/life/UnitConverter'
import { PlugGuide } from '@/features/life/PlugGuide'
import { SizeGuide } from '@/features/life/SizeGuide'

// Time
import { PackingList } from '@/features/time/PackingList'
import { DualClock } from '@/features/time/DualClock'
import { VisaInfo } from '@/features/time/VisaInfo'

// Security
import { EmergencyNumbers } from '@/features/security/EmergencyNumbers'
import { SurvivalPhrases } from '@/features/security/SurvivalPhrases'

const ALL_CARDS = [
  { id: 'exchange-rate', label: '💱 匯率換算', component: <ExchangeRate /> },
  { id: 'ledger', label: '📒 旅遊帳本', component: <Ledger /> },
  { id: 'tipping', label: '🤝 小費計算', component: <Tipping /> },
  { id: 'tax-refund', label: '🧾 退稅試算', component: <TaxRefund /> },
  { id: 'unit-converter', label: '🌡️ 單位換算', component: <UnitConverter /> },
  { id: 'plug-guide', label: '🔌 插頭指南', component: <PlugGuide /> },
  { id: 'size-guide', label: '👟 尺寸對照', component: <SizeGuide /> },
  { id: 'dual-clock', label: '🕒 雙城時鐘', component: <DualClock /> },
  { id: 'packing-list', label: '🧳 行李清單', component: <PackingList /> },
  { id: 'visa-info', label: '🛂 簽證資訊', component: <VisaInfo /> },
  { id: 'emergency-numbers', label: '🆘 緊急電話', component: <EmergencyNumbers /> },
  { id: 'survival-phrases', label: '🗣️ 求生短語', component: <SurvivalPhrases /> },
]

const STORAGE_KEY = 'selected-cards'
const DEFAULT_IDS = ALL_CARDS.map((c) => c.id)

function loadSelected(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return DEFAULT_IDS
}

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(loadSelected)

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const visibleCards = ALL_CARDS.filter((c) => selectedIds.includes(c.id))

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 w-full max-w-md mx-auto p-4 space-y-4">
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger render={
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                自訂工具
              </Button>
            } />
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>選擇要顯示的工具</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                {ALL_CARDS.map((card) => (
                  <label key={card.id} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={selectedIds.includes(card.id)}
                      onCheckedChange={() => toggle(card.id)}
                    />
                    <span>{card.label}</span>
                  </label>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {visibleCards.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            還沒選擇任何工具，點擊「自訂工具」新增
          </div>
        ) : (
          visibleCards.map((card) => (
            <div key={card.id}>{card.component}</div>
          ))
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
