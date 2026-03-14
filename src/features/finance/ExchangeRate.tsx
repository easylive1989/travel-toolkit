import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';

const CURRENCIES = [
  { value: 'TWD', label: 'TWD - 台幣' },
  { value: 'JPY', label: 'JPY - 日圓' },
  { value: 'KRW', label: 'KRW - 韓元' },
  { value: 'USD', label: 'USD - 美金' },
  { value: 'EUR', label: 'EUR - 歐元' },
  { value: 'THB', label: 'THB - 泰銖' },
  { value: 'VND', label: 'VND - 越南盾' },
];

export function ExchangeRate() {
  const { t } = useTranslation();
  const [base, setBase] = useState('TWD');
  const [target, setTarget] = useState('JPY');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('4.65'); // 預設一個常用匯率

  const converted = (amount && rate) 
    ? (parseFloat(amount) * parseFloat(rate)).toFixed(2) 
    : '0.00';

  const getCurrencyLabel = (val: string) => {
    const item = CURRENCIES.find(c => c.value === val);
    if (!item) return val;
    return item.label.split(' - ')[1];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💱</span>
          <CardTitle>{t('exchange.title')}</CardTitle>
        </div>
        <CardDescription>{t('exchange.desc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">{t('exchange.base')}</Label>
            <Select value={base} onValueChange={(val) => val && setBase(val)}>
              <SelectTrigger className="text-xs">
                {getCurrencyLabel(base)}
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">{t('exchange.target')}</Label>
            <Select value={target} onValueChange={(val) => val && setTarget(val)}>
              <SelectTrigger className="text-xs">
                {getCurrencyLabel(target)}
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-primary">{t('exchange.set_rate')}：1 {base} = ? {target}</Label>
          <div className="relative">
            <Input 
              type="number" 
              value={rate} 
              onChange={(e) => setRate(e.target.value)} 
              placeholder={t('exchange.set_rate')}
              className="pl-8 font-mono"
            />
            <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">×</span>
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">{t('exchange.input_amount')} ({base})</Label>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="0.00"
              className="text-lg font-bold"
            />
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
            <div className="text-xs text-muted-foreground mb-1">{t('exchange.result')} ({target})</div>
            <div className="text-3xl font-black text-primary tracking-tight">
              {converted} <span className="text-sm font-normal ml-1">{target}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}