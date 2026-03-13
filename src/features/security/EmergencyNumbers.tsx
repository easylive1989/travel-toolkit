import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const EMERGENCY_DATA: Record<string, { police: string, ambulance: string, fire: string }> = {
  'JP': { police: '110', ambulance: '119', fire: '119' },
  'KR': { police: '112', ambulance: '119', fire: '119' },
  'US': { police: '911', ambulance: '911', fire: '911' },
  'UK': { police: '999', ambulance: '999', fire: '999' },
  'EU': { police: '112', ambulance: '112', fire: '112' },
  'TH': { police: '191', ambulance: '1669', fire: '199' },
};

export function EmergencyNumbers() {
  const [country, setCountry] = useState('JP');
  const data = EMERGENCY_DATA[country];

  return (
    <Card className="w-full border-destructive/50 shadow-sm shadow-destructive/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🆘</span>
          <CardTitle className="text-destructive">當地緊急電話</CardTitle>
        </div>
        <CardDescription>報警、救護車、消防單鍵撥號 (請謹慎使用)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={country} onValueChange={(val) => val && setCountry(val)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="JP">日本</SelectItem>
            <SelectItem value="KR">韓國</SelectItem>
            <SelectItem value="TH">泰國</SelectItem>
            <SelectItem value="US">美國</SelectItem>
            <SelectItem value="EU">歐洲</SelectItem>
            <SelectItem value="UK">英國</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid gap-3 mt-4">
          <Button variant="outline" className="h-16 justify-between px-6 border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 group" onClick={() => window.location.href = `tel:${data.police}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{data.police}</div>
                  <div className="text-xs text-muted-foreground">報警 (Police)</div>
                </div>
              </div>
          </Button>

          <Button variant="outline" className="h-16 justify-between px-6 border-red-500/50 hover:bg-red-50 dark:hover:bg-red-950/20 group" onClick={() => window.location.href = `tel:${data.ambulance}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                  <span className="text-lg">🚑</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{data.ambulance}</div>
                  <div className="text-xs text-muted-foreground">救護車 (Ambulance)</div>
                </div>
              </div>
          </Button>

          <Button variant="outline" className="h-16 justify-between px-6 border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-950/20 group" onClick={() => window.location.href = `tel:${data.fire}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                  <span className="text-lg">🚒</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{data.fire}</div>
                  <div className="text-xs text-muted-foreground">消防 (Fire)</div>
                </div>
              </div>
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
