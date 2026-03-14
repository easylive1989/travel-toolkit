import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface Item {
  id: string;
  text: string;
  checked: boolean;
  category: string;
}

const STORAGE_KEY = 'travel-toolkit-packing';

export function PackingList() {
  const { t } = useTranslation();

  const DEFAULT_ITEMS: Item[] = [
    { id: '1', text: '護照 (Passport)', checked: false, category: 'essential' },
    { id: '2', text: '手機 & 充電線', checked: false, category: 'electronics' },
    { id: '3', text: '萬國轉接頭', checked: false, category: 'electronics' },
    { id: '4', text: '換洗衣物', checked: false, category: 'clothing' },
    { id: '5', text: '牙刷 & 沐浴用品', checked: false, category: 'toiletries' },
  ];

  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
  });
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newItem.trim()) return;
    const item: Item = {
      id: crypto.randomUUID(),
      text: newItem.trim(),
      checked: false,
      category: 'other'
    };
    setItems([...items, item]);
    setNewItem('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(it => it.id !== id));
  };

  const clearChecked = () => {
    setItems(items.filter(it => !it.checked));
  };

  const resetAll = () => {
    if (window.confirm(t('ledger.reset_confirm'))) {
      setItems(DEFAULT_ITEMS);
    }
  };

  const categories = ['essential', 'electronics', 'clothing', 'toiletries', 'other'];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧳</span>
            <CardTitle>{t('packing.title')}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon-xs" onClick={resetAll} title={t('packing.clear_all')}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon-xs" onClick={clearChecked} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>{t('packing.desc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder={t('packing.add_item')} 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && addItem()}
          />
          <Button size="icon" onClick={addItem}><Plus className="h-4 w-4" /></Button>
        </div>

        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
          {categories.map(cat => {
            const catItems = items.filter(it => it.category === cat);
            if (catItems.length === 0) return null;
            return (
              <div key={cat} className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-0.5 rounded w-fit">
                  {t(`packing.categories.${cat}`)}
                </h4>
                <div className="space-y-1">
                  {catItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-lg group transition-colors">
                      <Checkbox checked={item.checked} onCheckedChange={() => toggleItem(item.id)} />
                      <span className={`text-sm flex-1 ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                        {item.text}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon-xs" 
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}