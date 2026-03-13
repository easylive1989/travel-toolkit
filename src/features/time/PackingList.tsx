import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

interface Item {
  id: number;
  text: string;
  checked: boolean;
}

const DEFAULT_ITEMS = [
  "護照與簽證",
  "現金與信用卡",
  "網卡 / Wi-Fi 分享器",
  "手機與充電器",
  "萬用轉接頭",
  "換洗衣物"
];

export function PackingList() {
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('trip_packing');
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS.map((text, i) => ({ id: i, text, checked: false }));
  });
  const [newItem, setNewItem] = useState('');

  const saveItems = (newItems: Item[]) => {
    setItems(newItems);
    localStorage.setItem('trip_packing', JSON.stringify(newItems));
  };

  const toggleItem = (id: number) => {
    saveItems(items.map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    saveItems([...items, { id: Date.now(), text: newItem, checked: false }]);
    setNewItem('');
  };

  const deleteItem = (id: number) => {
    saveItems(items.filter(it => it.id !== id));
  };
  
  const resetList = () => {
    if(confirm('確定要清空並重置清單嗎？')) {
       saveItems(DEFAULT_ITEMS.map((text, i) => ({ id: i, text, checked: false })));
    }
  };

  const progress = items.length ? Math.round((items.filter(i => i.checked).length / items.length) * 100) : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎒</span>
          <CardTitle>動態行李清單</CardTitle>
        </div>
        <CardDescription>出發前最後確認，支援進度儲存</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">準備進度：{progress}%</span>
            <Button variant="outline" size="sm" onClick={resetList}>重置</Button>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex gap-2 mt-4">
          <Input 
            placeholder="新增自訂物品..." 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && addItem()}
          />
          <Button onClick={addItem} size="icon"><Plus className="w-4 h-4" /></Button>
        </div>

        <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg group">
              <div className="flex items-center space-x-2">
                <Checkbox id={`item-${item.id}`} checked={item.checked} onCheckedChange={() => toggleItem(item.id)} />
                <label 
                  htmlFor={`item-${item.id}`} 
                  className={`text-sm font-medium leading-none cursor-pointer ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                >
                  {item.text}
                </label>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive" onClick={() => deleteItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
