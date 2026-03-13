import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TIPS_DATA = [
  { code: 'US', name: '美國', rate: 0.18, desc: '一般給 15%~20%' },
  { code: 'JP', name: '日本', rate: 0, desc: '無小費文化，帳單通常已含服務費' },
  { code: 'EU', name: '歐洲多數', rate: 0.10, desc: '通常給 5%~10% 或湊整數' },
  { code: 'TH', name: '泰國', rate: 0.10, desc: '部分高級餐廳 10%，一般約 20~50泰銖' }
];

export function Tipping() {
  const [countryIdx, setCountryIdx] = useState("0");
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState<{tip: number, total: number} | null>(null);

  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    const country = TIPS_DATA[parseInt(countryIdx)];
    const tip = amt * country.rate;
    setResult({ tip, total: amt + tip });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💁</span>
          <CardTitle>各國小費計算機</CardTitle>
        </div>
        <CardDescription>根據各國標準自動試算小費</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>消費國家</Label>
          <Select value={countryIdx} onValueChange={(val) => val && setCountryIdx(val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TIPS_DATA.map((t, i) => (
                <SelectItem key={i} value={i.toString()}>{t.name} ({t.desc})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>帳單金額</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full">計算</Button>

        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center border">
            <div className="text-sm text-muted-foreground">建議小費</div>
            <div className="text-2xl font-bold text-primary">{result.tip.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground mt-2">總金額</div>
            <div className="text-xl font-bold">{result.total.toFixed(2)}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
