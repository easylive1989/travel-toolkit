import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UNIT_TYPES = [
  { id: 'temp', label: '溫度 (°C ↔ °F)', units: ['°C', '°F'] },
  { id: 'dist', label: '距離 (km ↔ mi)', units: ['km', 'mi'] },
  { id: 'weight', label: '重量 (kg ↔ lb)', units: ['kg', 'lb'] },
];

export function UnitConverter() {
  const [type, setType] = useState('temp');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const activeType = UNIT_TYPES.find(t => t.id === type) || UNIT_TYPES[0];
  const [l1, l2] = activeType.units;

  const handleTypeChange = (val: string) => {
    setType(val);
    setVal1('');
    setVal2('');
  };

  const handleV1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setVal1(v);
    if (!v) { setVal2(''); return; }
    
    const num = parseFloat(v);
    let res = 0;
    if (type === 'temp') res = (num * 9/5) + 32;
    else if (type === 'dist') res = num * 0.621371;
    else if (type === 'weight') res = num * 2.20462;
    setVal2(res.toFixed(2));
  };

  const handleV2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setVal2(v);
    if (!v) { setVal1(''); return; }

    const num = parseFloat(v);
    let res = 0;
    if (type === 'temp') res = (num - 32) * 5/9;
    else if (type === 'dist') res = num / 0.621371;
    else if (type === 'weight') res = num / 2.20462;
    setVal1(res.toFixed(2));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <CardTitle>全方位單位換算</CardTitle>
        </div>
        <CardDescription>溫度、長度、重量一鍵轉換</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>轉換類型</Label>
          <Select value={type} onValueChange={(val) => val && handleTypeChange(val)}>
            <SelectTrigger>
              {activeType.label}
            </SelectTrigger>
            <SelectContent>
              {UNIT_TYPES.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 relative">
            <Input type="number" value={val1} onChange={handleV1Change} className="pr-10" />
            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">{l1}</span>
          </div>
          <span className="text-muted-foreground font-bold">=</span>
          <div className="flex-1 relative">
            <Input type="number" value={val2} onChange={handleV2Change} className="pr-10" />
            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">{l2}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
