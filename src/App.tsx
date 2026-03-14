import { useRef, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, Trash2, Plus, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

// Finance
import { ExchangeRate } from '@/features/finance/ExchangeRate'
import { Ledger } from '@/features/finance/Ledger'

// Time
import { PackingList } from '@/features/time/PackingList'

// Security
import { SurvivalPhrases } from '@/features/security/SurvivalPhrases'

// Life
import { UnitConverter } from '@/features/life/UnitConverter'
import { PlugGuide } from '@/features/life/PlugGuide'
import { SizeGuide } from '@/features/life/SizeGuide'

interface Group {
  id: string
  name: string
  cardIds: string[]
}

const GROUPS_KEY = 'card-groups'

function App() {
  const { t } = useTranslation()

  const ALL_CARDS = [
    { id: 'exchange-rate', category: t('tools.finance'), label: t('tools.exchange_rate'), component: <ExchangeRate /> },
    { id: 'ledger', category: t('tools.finance'), label: t('tools.ledger'), component: <Ledger /> },
    { id: 'packing-list', category: t('tools.plan'), label: t('tools.packing_list'), component: <PackingList /> },
    { id: 'survival-phrases', category: t('tools.security'), label: t('tools.flashcards'), component: <SurvivalPhrases /> },
    { id: 'unit-converter', category: t('tools.life'), label: t('tools.unit_converter'), component: <UnitConverter /> },
    { id: 'plug-guide', category: t('tools.life'), label: t('tools.plug_guide'), component: <PlugGuide /> },
    { id: 'size-guide', category: t('tools.life'), label: t('tools.size_guide'), component: <SizeGuide /> },
  ]

  const CARDS_BY_CATEGORY = ALL_CARDS.reduce((acc, card) => {
    if (!acc[card.category]) acc[card.category] = []
    acc[card.category].push(card)
    return acc
  }, {} as Record<string, typeof ALL_CARDS>)

  const [groups, setGroups] = useState<Group[]>(() => {
    try {
      const stored = localStorage.getItem(GROUPS_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {}
    return [{ 
      id: 'default', 
      name: t('groups.default'), 
      cardIds: ['exchange-rate', 'packing-list', 'ledger', 'unit-converter'] 
    }]
  })

  const [activeGroupId, setActiveGroupId] = useState<string>(groups[0]?.id || 'default')
  const [showNewGroupInput, setShowNewGroupInput] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const newGroupInputRef = useRef<HTMLInputElement>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingName, setEditingName] = useState('')

  const activeGroup = groups.find((g) => g.id === activeGroupId) || groups[0]

  const saveGroups = (next: Group[]) => {
    setGroups(next)
    localStorage.setItem(GROUPS_KEY, JSON.stringify(next))
  }

  const addGroup = () => {
    if (!newGroupName.trim()) return
    const newId = crypto.randomUUID()
    saveGroups([...groups, { id: newId, name: newGroupName.trim(), cardIds: [] }])
    setActiveGroupId(newId)
    setNewGroupName('')
    setShowNewGroupInput(false)
  }

  const deleteGroup = () => {
    if (groups.length <= 1) return
    const nextGroups = groups.filter((g) => g.id !== activeGroup.id)
    saveGroups(nextGroups)
    setActiveGroupId(nextGroups[0].id)
    setIsEditDialogOpen(false)
  }

  const renameGroup = () => {
    if (!editingName.trim()) return
    const updated = groups.map((g) => g.id === activeGroup.id ? { ...g, name: editingName.trim() } : g)
    saveGroups(updated)
    setIsEditDialogOpen(false)
  }

  const toggleCardInGroup = (cardId: string) => {
    const updated = groups.map((g) => {
      if (g.id === activeGroup.id) {
        const isInGroup = g.cardIds.includes(cardId)
        return {
          ...g,
          cardIds: isInGroup ? g.cardIds.filter((id) => id !== cardId) : [...g.cardIds, cardId]
        }
      }
      return g
    })
    saveGroups(updated)
  }

  const activeCards = ALL_CARDS.filter((c) => activeGroup.cardIds.includes(c.id))

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between gap-2 border-b pb-2">
          <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={cn(
                  "flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  activeGroup.id === group.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {group.name}
              </button>
            ))}
            {showNewGroupInput ? (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Input
                  ref={newGroupInputRef}
                  className="h-8 w-24 text-sm px-2"
                  placeholder={t('groups.new_placeholder')}
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addGroup()
                    if (e.key === 'Escape') { setShowNewGroupInput(false); setNewGroupName('') }
                  }}
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => setShowNewGroupInput(true)}
                className="flex-shrink-0 inline-flex items-center gap-1 rounded-full border border-dashed border-muted-foreground/50 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Plus className="h-4 w-4" />
                {t('groups.add')}
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 pl-2">
            <Dialog>
              <DialogTrigger render={
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                  <Settings className="h-5 w-5" />
                </Button>
              } />
              <DialogContent className="max-h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>{t('groups.settings')} - {activeGroup.name}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4">
                  <p className="text-xs text-muted-foreground">{t('groups.settings_desc')}</p>
                  {Object.entries(CARDS_BY_CATEGORY).map(([category, cards]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground border-b pb-1">{category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {cards.map((card) => (
                          <label key={card.id} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-muted/50 transition-colors">
                            <Checkbox
                              checked={activeGroup.cardIds.includes(card.id)}
                              onCheckedChange={() => toggleCardInGroup(card.id)}
                            />
                            <span className="text-sm truncate">{card.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger render={
                <Button 
                  variant="ghost" size="icon" 
                  onClick={() => { setEditingName(activeGroup.name); setIsEditDialogOpen(true); }}
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              } />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('groups.edit')} - {activeGroup.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">{t('groups.rename')}</label>
                    <div className="flex gap-2">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && renameGroup()}
                        placeholder={t('groups.new_placeholder')}
                      />
                      <Button size="sm" onClick={renameGroup} disabled={!editingName.trim() || editingName === activeGroup.name}>
                        {t('common.save')}
                      </Button>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <Button variant="destructive" size="sm" className="w-full gap-2" onClick={deleteGroup} disabled={groups.length <= 1}>
                      <Trash2 className="h-4 w-4" />
                      {groups.length <= 1 ? t('groups.at_least_one') : t('common.delete')}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="space-y-4 pt-2 pb-8">
          {activeCards.length > 0 ? (
            activeCards.map((card) => <div key={card.id}>{card.component}</div>)
          ) : (
            <div className="text-center text-muted-foreground py-16 px-4">
              <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6" />
              </div>
              <p className="text-sm">{t('groups.no_tools')}</p>
              <p className="text-xs mt-1">{t('groups.click_settings')}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
