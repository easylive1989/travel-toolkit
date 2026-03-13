import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Settings, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react'

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
  const [newGroupName, setNewGroupName] = useState('')
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null)

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
  }

  const deleteGroup = (id: string) => {
    saveGroups(groups.filter((g) => g.id !== id))
    if (expandedGroupId === id) setExpandedGroupId(null)
  }

  const toggleCardInGroup = (groupId: string, cardId: string) => {
    const targetGroup = groups.find((g) => g.id === groupId)!
    const isInGroup = targetGroup.cardIds.includes(cardId)
    saveGroups(
      groups.map((g) => {
        if (g.id === groupId) {
          return isInGroup
            ? { ...g, cardIds: g.cardIds.filter((c) => c !== cardId) }
            : { ...g, cardIds: [...g.cardIds, cardId] }
        }
        // 加入新群組時，從其他群組移除（一張卡只屬於一個群組）
        if (!isInGroup) {
          return { ...g, cardIds: g.cardIds.filter((c) => c !== cardId) }
        }
        return g
      })
    )
  }

  const groupedCardIds = new Set(groups.flatMap((g) => g.cardIds))
  const ungrouped = ALL_CARDS.filter((c) => selectedIds.includes(c.id) && !groupedCardIds.has(c.id))

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
                <DialogTitle>管理工具</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="tools">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="tools">工具</TabsTrigger>
                  <TabsTrigger value="groups">群組</TabsTrigger>
                </TabsList>

                <TabsContent value="tools" className="space-y-3 pt-3">
                  {ALL_CARDS.map((card) => (
                    <label key={card.id} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={selectedIds.includes(card.id)}
                        onCheckedChange={() => toggleSelected(card.id)}
                      />
                      <span>{card.label}</span>
                    </label>
                  ))}
                </TabsContent>

                <TabsContent value="groups" className="space-y-3 pt-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="新群組名稱"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addGroup()}
                    />
                    <Button size="icon-sm" onClick={addGroup} disabled={!newGroupName.trim()}>
                      <Plus />
                    </Button>
                  </div>

                  {groups.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">尚未建立任何群組</p>
                  ) : (
                    groups.map((group) => (
                      <div key={group.id} className="border rounded-lg">
                        <div className="flex items-center gap-2 p-3">
                          <button
                            className="flex-1 flex items-center gap-1.5 text-left font-medium text-sm"
                            onClick={() => setExpandedGroupId(expandedGroupId === group.id ? null : group.id)}
                          >
                            {expandedGroupId === group.id
                              ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            }
                            {group.name}
                            <span className="text-muted-foreground font-normal">({group.cardIds.filter(id => selectedIds.includes(id)).length})</span>
                          </button>
                          <Button variant="ghost" size="icon-sm" onClick={() => deleteGroup(group.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {expandedGroupId === group.id && (
                          <div className="border-t px-3 pb-3 pt-2 space-y-2">
                            {selectedIds.length === 0 ? (
                              <p className="text-xs text-muted-foreground">先在「工具」頁選擇要顯示的工具</p>
                            ) : (
                              ALL_CARDS.filter((c) => selectedIds.includes(c.id)).map((card) => (
                                <label key={card.id} className="flex items-center gap-3 cursor-pointer text-sm">
                                  <Checkbox
                                    checked={group.cardIds.includes(card.id)}
                                    onCheckedChange={() => toggleCardInGroup(group.id, card.id)}
                                  />
                                  <span>{card.label}</span>
                                </label>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

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
            還沒選擇任何工具，點擊「自訂工具」新增
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
