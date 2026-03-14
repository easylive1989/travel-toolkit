import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Download } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface Record {
  id: number;
  note: string;
  amount: number;
  currency: string;
}

const CURRENCIES = ['TWD', 'JPY', 'KRW', 'USD', 'EUR', 'THB', 'VND'];

export function Ledger() {
  const { t } = useTranslation();
  const [records, setRecords] = useState<Record[]>(() => {
    const saved = localStorage.getItem('trip_ledger');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((r: any) => ({
          id: r.id || Date.now() + Math.random(),
          note: r.note || '未命名',
          amount: r.amount || 0,
          currency: r.currency || 'TWD'
        }));
      } catch {
        return [];
      }
    }
    return [];
  });
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('TWD');

  const saveRecords = (newRecords: Record[]) => {
    setRecords(newRecords);
    localStorage.setItem('trip_ledger', JSON.stringify(newRecords));
  };

  const addRecord = () => {
    const amt = parseFloat(amount);
    if (!amt) return;

    const newRecord: Record = {
      id: Date.now(),
      note: note.trim() || t('ledger.note_placeholder'),
      amount: amt,
      currency,
    };

    saveRecords([newRecord, ...records]);
    setNote('');
    setAmount('');
  };

  const deleteRecord = (id: number) => {
    saveRecords(records.filter(r => r.id !== id));
  };

  const exportToCSV = () => {
    if (records.length === 0) return;
    
    const headers = [t('ledger.date') || 'Date', t('ledger.time') || 'Time', t('ledger.note'), t('ledger.amount'), t('ledger.currency')];
    const rows = records.map(r => {
      const date = new Date(r.id);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        `"${r.note}"`, // Note: This is intentional for CSV quoting
        r.amount,
        r.currency
      ].join(',');
    });
    
    const csvContent = "\ufeff" + [headers.join(','), ...rows].join('\n'); // 加上 BOM 防止 Excel 開啟中文亂碼
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${t('ledger.title')}_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetRecords = () => {
    if (window.confirm(t('ledger.reset_confirm'))) {
      saveRecords([]);
    }
  };

  const totalAmount = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💸</span>
            <CardTitle>{t('ledger.title')}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToCSV}
              disabled={records.length === 0}
              className="h-8 text-xs gap-1"
            >
              <Download className="h-3 w-3" />
              {t('common.export')}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetRecords}
              disabled={records.length === 0}
              className="h-8 text-xs gap-1 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
            >
              <Trash2 className="h-3 w-3" />
              {t('common.reset')}
            </Button>
          </div>
        </div>
        <CardDescription>{t('ledger.desc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="bg-primary/5 rounded-2xl p-6 text-center border border-primary/10">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">{t('ledger.total')}</div>
          <div className="text-4xl font-black text-primary tracking-tighter">
            {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs ml-1">{t('ledger.note')}</Label>
            <Input 
              placeholder={t('ledger.note_placeholder')} 
              value={note} 
              onChange={e => setNote(e.target.value)}
              className="bg-muted/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs ml-1">{t('ledger.amount')}</Label>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                className="bg-muted/30 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs ml-1">{t('ledger.currency')}</Label>
              <Select value={currency} onValueChange={(val) => val && setCurrency(val)}>
                <SelectTrigger className="bg-muted/30 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addRecord} disabled={!amount} className="w-full font-bold shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            {t('ledger.add_record')}
          </Button>
        </div>

        <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">{t('ledger.list_title')}</span>
            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{t('ledger.count', { count: records.length })}</span>
          </div>
          {records.length === 0 ? (
             <div className="text-center py-10 border-2 border-dashed rounded-xl">
               <p className="text-sm text-muted-foreground">{t('ledger.empty')}</p>
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
                  <div className="flex flex-col items-end">
                    <div className="font-black text-primary leading-tight">
                      {r.amount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bold">{r.currency}</div>
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