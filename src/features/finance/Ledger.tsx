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
  currency: string;
  twdAmount: number;
}

export function Ledger() {
  const [records, setRecords] = useState<Record[]>(() => {
    const saved = localStorage.getItem('trip_ledger');
    return saved ? JSON.parse(saved) : [];
  });
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('JPY');
  const [loading, setLoading] = useState(false);

  const saveRecords = (newRecords: Record[]) => {
    setRecords(newRecords);
    localStorage.setItem('trip_ledger', JSON.stringify(newRecords));
  };

  const addRecord = async () => {
    const amt = parseFloat(amount);
    if (!amt) return;

    setLoading(true);
    let twdAmount = amt;
    
    if (currency !== 'TWD') {
      try {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amt}&from=${currency}&to=TWD`);
        const data = await res.json();
        twdAmount = data.rates['TWD'];
      } catch {
        alert("匯率轉換失敗");
        setLoading(false);
        return;
      }
    }

    const newRecord: Record = {
      id: Date.now(),
      note: note || '未命名',
      amount: amt,
      currency,
      twdAmount
    };

    saveRecords([newRecord, ...records]);
    setNote('');
    setAmount('');
    setLoading(false);
  };

  const deleteRecord = (id: number) => {
    saveRecords(records.filter(r => r.id !== id));
  };

  const totalTWD = records.reduce((sum, r) => sum + r.twdAmount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💸</span>
          <CardTitle>旅遊簡易記帳本</CardTitle>
        </div>
        <CardDescription>外幣消費自動換算台幣加總</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="text-center mb-6">
          <div className="text-sm text-muted-foreground">總花費</div>
          <div className="text-3xl font-bold text-primary">NT$ {Math.round(totalTWD).toLocaleString()}</div>
        </div>

        <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
          <div className="space-y-2">
            <Label>新增消費</Label>
            <Input placeholder="用途 (如：晚餐)" value={note} onChange={e => setNote(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Input type="number" placeholder="金額" value={amount} onChange={e => setAmount(e.target.value)} className="flex-2" />
            <Select value={currency} onValueChange={(val) => val && setCurrency(val)}>
              <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="KRW">KRW</SelectItem>
                <SelectItem value="TWD">TWD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addRecord} disabled={loading || !amount} className="w-full">
            {loading ? "轉換中..." : "新增紀錄"}
          </Button>
        </div>

        <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
          {records.length === 0 ? (
             <p className="text-center text-sm text-muted-foreground py-4">目前沒有消費紀錄</p>
          ) : (
            records.map((r) => (
              <div key={r.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <div className="font-medium text-sm">{r.note}</div>
                  <div className="text-xs text-muted-foreground">{r.amount} {r.currency}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-semibold">NT$ {Math.round(r.twdAmount).toLocaleString()}</div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteRecord(r.id)}>
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
