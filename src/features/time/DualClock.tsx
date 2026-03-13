import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CITIES = [
  { id: 'Asia/Taipei', name: '台北 (出發地)' },
  { id: 'Asia/Tokyo', name: '東京' },
  { id: 'Asia/Seoul', name: '首爾' },
  { id: 'Europe/London', name: '倫敦' },
  { id: 'Europe/Paris', name: '巴黎' },
  { id: 'America/New_York', name: '紐約' },
  { id: 'America/Los_Angeles', name: '洛杉磯' }
];

export function DualClock() {
  const [localZone, setLocalZone] = useState('Asia/Tokyo');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, tz: string) => {
    return new Intl.DateTimeFormat('zh-TW', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  const formatDate = (date: Date, tz: string) => {
    return new Intl.DateTimeFormat('zh-TW', {
      timeZone: tz,
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    }).format(date);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕒</span>
          <CardTitle>雙時區時鐘</CardTitle>
        </div>
        <CardDescription>台灣時間與目的地時間對照</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Home Time */}
        <div className="p-4 bg-muted/30 border rounded-xl flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">台灣時間 (家鄉)</div>
            <div className="text-sm">{formatDate(time, 'Asia/Taipei')}</div>
          </div>
          <div className="text-3xl font-bold font-mono tracking-tighter">
            {formatTime(time, 'Asia/Taipei')}
          </div>
        </div>

        {/* Local Time */}
        <div className="p-4 bg-primary/5 border-primary/20 border rounded-xl">
           <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-primary">當地時間 (目的地)</div>
              <Select value={localZone} onValueChange={(val) => val && setLocalZone(val)}>
                <SelectTrigger className="w-[120px] h-8 text-xs bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CITIES.filter(c => c.id !== 'Asia/Taipei').map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
           </div>
           
           <div className="flex justify-between items-end">
             <div className="text-sm">{formatDate(time, localZone)}</div>
             <div className="text-4xl font-bold font-mono tracking-tighter text-primary">
              {formatTime(time, localZone)}
             </div>
           </div>
        </div>

      </CardContent>
    </Card>
  );
}
