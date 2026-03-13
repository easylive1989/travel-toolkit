import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PLUG_GUIDE: Record<string, { name: string, voltage: string, type: string }> = {
  'JP': { name: '日本', voltage: '100V', type: 'A, B' },
  'US': { name: '美國', voltage: '120V', type: 'A, B' },
  'EU': { name: '歐洲', voltage: '230V', type: 'C, E, F' },
  'KR': { name: '韓國', voltage: '220V', type: 'C, F' },
  'TW': { name: '台灣', voltage: '110V', type: 'A, B' },
  'GB': { name: '英國', voltage: '230V', type: 'G' }
};

export function PlugGuide() {
  const [country, setCountry] = useState('JP');
  const data = PLUG_GUIDE[country];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔌</span>
          <CardTitle>全球插座與電壓</CardTitle>
        </div>
        <CardDescription>查詢各國電壓與插頭規格</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>選擇國家/地區</Label>
          <Select value={country} onValueChange={(val) => val && setCountry(val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(PLUG_GUIDE).map(k => (
                <SelectItem key={k} value={k}>{PLUG_GUIDE[k].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-6 p-6 bg-muted rounded-xl text-center border space-y-4">
          <div className="text-lg font-semibold text-primary">電壓：{data.voltage}</div>
          <div className="text-6xl animate-pulse">🔌</div>
          <div className="text-xl font-bold">插座款式：Type {data.type}</div>
        </div>
      </CardContent>
    </Card>
  );
}
