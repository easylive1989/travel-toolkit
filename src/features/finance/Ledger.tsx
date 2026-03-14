import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Record {
  id: number;
  note: string;
  amount: number;
}

export function Ledger() {
  const [records, setRecords] = useState<Record[]>(() => {
    const saved = localStorage.getItem('trip_ledger');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 相容舊資料，過濾掉不需要的欄位
        return parsed.map((r: any) => ({
          id: r.id || Date.now() + Math.random(),
          note: r.note || '未命名',
          amount: r.amount || 0
        }));
      } catch {
        return [];
      }
    }
    return [];
  });
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  const saveRecords = (newRecords: Record[]) => {
    setRecords(newRecords);
    localStorage.setItem('trip_ledger', JSON.stringify(newRecords));
  };

  const addRecord = () => {
    const amt = parseFloat(amount);
    if (!amt) return;

    const newRecord: Record = {
      id: Date.now(),
      note: note.trim() || '日常支出',
      amount: amt,
    };

    saveRecords([newRecord, ...records]);
    setNote('');
    setAmount('');
  };

  const deleteRecord = (id: number) => {
    saveRecords(records.filter(r => r.id !== id));
  };

  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💸</span>
          <CardTitle>旅遊簡易記帳本</CardTitle>
        </div>
        <CardDescription>記錄每一筆消費，輕鬆管理預算</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="bg-primary/5 rounded-2xl p-6 text-center border border-primary/10">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">累計支出總額</div>
          <div className="text-4xl font-black text-primary tracking-tighter">
            {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs ml-1">用途說明</Label>
              <Input 
                placeholder="例如：拉麵、交通費" 
                value={note} 
                onChange={e => setNote(e.target.value)}
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs ml-1">金額</Label>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                className="bg-muted/30 font-mono"
              />
            </div>
          </div>
          <Button onClick={addRecord} disabled={!amount} className="w-full font-bold shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            新增一筆紀錄
          </Button>
        </div>

        <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">消費清單</span>
            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">共 {records.length} 筆</span>
          </div>
          {records.length === 0 ? (
             <div className="text-center py-10 border-2 border-dashed rounded-xl">
               <p className="text-sm text-muted-foreground">目前還沒有任何紀錄</p>
             </div>
          ) : (
            records.map((r) => (
              <div key={r.id} className="group flex justify-between items-center p-3 bg-card border rounded-xl hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{r.note}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {new Date(r.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="font-black text-primary text-right">
                    {r.amount.toLocaleString()}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon-xs" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" 
                    onClick={() => deleteRecord(r.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

      </CardContent>
    </Card>
  );
}
