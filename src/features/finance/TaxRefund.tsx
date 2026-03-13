import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TAX_DATA = [
  { code: 'JP', name: '日本 (10%，免稅門檻5000日圓)' },
  { code: 'KR', name: '韓國 (約5-8%級距，免稅門檻3萬韓元)' },
  { code: 'EU', name: '歐洲平均 (約10-12%)' }
];

export function TaxRefund() {
  const [countryIdx, setCountryIdx] = useState('0');
  const [amount, setAmount] = useState('10000');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    const idx = parseInt(countryIdx);
    let refund = 0;
    
    if (idx === 0) refund = amt >= 5000 ? amt * 0.10 : 0; // JP
    else if (idx === 1) refund = amt >= 30000 ? amt * 0.07 : 0; // KR
    else refund = amt * 0.11; // EU
    
    setResult(refund > 0 ? refund.toFixed(0) : '未達退稅門檻');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧾</span>
          <CardTitle>退稅計算器</CardTitle>
        </div>
        <CardDescription>熱門購物國家退稅預估</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>免稅國家預估</Label>
          <Select value={countryIdx} onValueChange={(val) => val && setCountryIdx(val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TAX_DATA.map((t, i) => (
                <SelectItem key={i} value={i.toString()}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>消費金額 (當地貨幣)</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full">預估退稅</Button>

        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center border">
             <div className="text-sm text-muted-foreground">預估可退還</div>
             <div className="text-2xl font-bold text-primary">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
