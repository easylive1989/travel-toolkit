import { useRef, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, Trash2, Plus, Pencil } from 'lucide-react'

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

interface Group {
  id: string
  name: string
  cardIds: string[]
}

const SELECTED_KEY = 'selected-cards'
const GROUPS_KEY = 'card-groups'
const DEFAULT_IDS = ALL_CARDS.map((c) => c.id)

function loadSelected(): string[] {
  try {
    const stored = localStorage.getItem(SELECTED_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return DEFAULT_IDS
}

function loadGroups(): Group[] {
  try {
    const stored = localStorage.getItem(GROUPS_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return []
}

function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>(loadSelected)
  const [groups, setGroups] = useState<Group[]>(loadGroups)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [editingName, setEditingName] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [showNewGroupInput, setShowNewGroupInput] = useState(false)
  const newGroupInputRef = useRef<HTMLInputElement>(null)

  const saveGroups = (next: Group[]) => {
    setGroups(next)
    localStorage.setItem(GROUPS_KEY, JSON.stringify(next))
  }

  const toggleSelected = (id: string) => {
    const isSelected = selectedIds.includes(id)
    const next = isSelected ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
    setSelectedIds(next)
    localStorage.setItem(SELECTED_KEY, JSON.stringify(next))
    if (isSelected) {
      saveGroups(groups.map((g) => ({ ...g, cardIds: g.cardIds.filter((c) => c !== id) })))
    }
  }

  const addGroup = () => {
    if (!newGroupName.trim()) return
    saveGroups([...groups, { id: crypto.randomUUID(), name: newGroupName.trim(), cardIds: [] }])
    setNewGroupName('')
    setShowNewGroupInput(false)
  }

  const deleteGroup = (id: string) => {
    saveGroups(groups.filter((g) => g.id !== id))
    setEditingGroup(null)
  }

  const renameGroup = () => {
    if (!editingGroup || !editingName.trim()) return
    saveGroups(groups.map((g) => g.id === editingGroup.id ? { ...g, name: editingName.trim() } : g))
    setEditingGroup((prev) => prev ? { ...prev, name: editingName.trim() } : null)
  }

  const toggleCardInGroup = (groupId: string, cardId: string) => {
    const targetGroup = groups.find((g) => g.id === groupId)!
    const isInGroup = targetGroup.cardIds.includes(cardId)
    const updated = groups.map((g) => {
      if (g.id === groupId) {
        return isInGroup
          ? { ...g, cardIds: g.cardIds.filter((c) => c !== cardId) }
          : { ...g, cardIds: [...g.cardIds, cardId] }
      }
      if (!isInGroup) {
        return { ...g, cardIds: g.cardIds.filter((c) => c !== cardId) }
      }
      return g
    })
    saveGroups(updated)
    setEditingGroup(updated.find((g) => g.id === groupId) ?? null)
  }

  const groupedCardIds = new Set(groups.flatMap((g) => g.cardIds))
  const ungrouped = ALL_CARDS.filter((c) => selectedIds.includes(c.id) && !groupedCardIds.has(c.id))

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 w-full max-w-md mx-auto p-4 space-y-4">

        {/* 工具列：群組 chips + 新增群組 + 自訂工具 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-0.5">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => { setEditingGroup(group); setEditingName(group.name) }}
                className="flex-shrink-0 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted transition-colors"
              >
                <Pencil className="h-3 w-3 text-muted-foreground" />
                {group.name}
              </button>
            ))}

            {showNewGroupInput ? (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Input
                  ref={newGroupInputRef}
                  className="h-7 w-28 text-xs"
                  placeholder="群組名稱"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addGroup()
                    if (e.key === 'Escape') { setShowNewGroupInput(false); setNewGroupName('') }
                  }}
                  autoFocus
                />
                <Button size="icon-xs" onClick={addGroup} disabled={!newGroupName.trim()}>
                  <Plus />
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setShowNewGroupInput(true)}
                className="flex-shrink-0 inline-flex items-center gap-1 rounded-full border border-dashed px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Plus className="h-3 w-3" />
                新增群組
              </button>
            )}
          </div>

          <Dialog>
            <DialogTrigger render={
              <Button variant="outline" size="icon-sm" className="flex-shrink-0">
                <Settings className="h-4 w-4" />
              </Button>
            } />
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>自訂工具</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                {ALL_CARDS.map((card) => (
                  <label key={card.id} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={selectedIds.includes(card.id)}
                      onCheckedChange={() => toggleSelected(card.id)}
                    />
                    <span>{card.label}</span>
                  </label>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 群組編輯 Dialog */}
        <Dialog open={!!editingGroup} onOpenChange={(open) => !open && setEditingGroup(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>編輯群組</DialogTitle>
            </DialogHeader>
            {editingGroup && (
              <div className="space-y-4 pt-2">
                <div className="flex gap-2">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && renameGroup()}
                    placeholder="群組名稱"
                  />
                  <Button size="sm" onClick={renameGroup} disabled={!editingName.trim()}>
                    更名
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">選擇此群組包含的工具：</p>
                  {ALL_CARDS.filter((c) => selectedIds.includes(c.id)).map((card) => (
                    <label key={card.id} className="flex items-center gap-3 cursor-pointer text-sm">
                      <Checkbox
                        checked={editingGroup.cardIds.includes(card.id)}
                        onCheckedChange={() => toggleCardInGroup(editingGroup.id, card.id)}
                      />
                      <span>{card.label}</span>
                    </label>
                  ))}
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => deleteGroup(editingGroup.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  刪除群組
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* 群組區塊 */}
        {groups.map((group) => {
          const cards = ALL_CARDS.filter((c) => group.cardIds.includes(c.id) && selectedIds.includes(c.id))
          if (cards.length === 0) return null
          return (
            <div key={group.id} className="space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground px-1">{group.name}</h2>
              {cards.map((card) => <div key={card.id}>{card.component}</div>)}
            </div>
          )
        })}

        {/* 未分組工具 */}
        {ungrouped.length > 0 && (
          <div className="space-y-4">
            {groups.length > 0 && (
              <h2 className="text-sm font-semibold text-muted-foreground px-1">其他</h2>
            )}
            {ungrouped.map((card) => <div key={card.id}>{card.component}</div>)}
          </div>
        )}

        {selectedIds.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            還沒選擇任何工具，點擊右上角 <Settings className="inline h-4 w-4" /> 新增
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
