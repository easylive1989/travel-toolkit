import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ExchangeRate() {
  const [base, setBase] = useState('TWD');
  const [target, setTarget] = useState('JPY');
  const [amount, setAmount] = useState('1000');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const calculate = async () => {
    if (!amount || base === target) {
      setResult(`${amount} ${target}`);
      return;
    }

    setLoading(true);
    setResult("載入中...");
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${base}&to=${target}`);
      const data = await res.json();
      if (data.rates && data.rates[target]) {
        setResult(`${data.rates[target].toFixed(2)} ${target}`);
      } else {
        setResult("換算失敗");
      }
    } catch {
      setResult("網路錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💱</span>
          <CardTitle>即時匯率換算</CardTitle>
        </div>
        <CardDescription>支援多國貨幣即時轉換</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>基礎貨幣</Label>
          <Select value={base} onValueChange={(val) => val && setBase(val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="TWD">TWD - 台幣</SelectItem>
              <SelectItem value="USD">USD - 美金</SelectItem>
              <SelectItem value="EUR">EUR - 歐元</SelectItem>
              <SelectItem value="JPY">JPY - 日圓</SelectItem>
              <SelectItem value="KRW">KRW - 韓元</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>目標貨幣</Label>
          <Select value={target} onValueChange={(val) => val && setTarget(val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="JPY">JPY - 日圓</SelectItem>
              <SelectItem value="USD">USD - 美金</SelectItem>
              <SelectItem value="EUR">EUR - 歐元</SelectItem>
              <SelectItem value="KRW">KRW - 韓元</SelectItem>
              <SelectItem value="TWD">TWD - 台幣</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>金額</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <Button onClick={calculate} disabled={loading} className="w-full">
          換算
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-center border">
            <div className="text-2xl font-bold text-primary">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
