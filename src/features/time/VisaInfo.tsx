import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

// Simplified mockup data
const VISA_DATA: Record<string, { status: string, duration: string, note?: string }> = {
  'JP': { status: '免簽證', duration: '90天' },
  'KR': { status: '免簽證', duration: '90天', note: '需申請K-ETA (可暫免)' },
  'EU': { status: '免簽證', duration: '90天/180天內', note: '未來需申請ETIAS' },
  'US': { status: 'ESTA電子簽證', duration: '90天', note: '需事先上網申請' },
  'TH': { status: '免簽證 (暫時)', duration: '30天' }
};

export function VisaInfo() {
  const [country, setCountry] = useState('JP');
  const data = VISA_DATA[country];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛂</span>
          <CardTitle>簽證與免簽資訊</CardTitle>
        </div>
        <CardDescription>台灣護照旅遊熱門國家簽證規定 (僅供參考)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>選擇目的地</Label>
          <Select value={country} onValueChange={(val) => val && setCountry(val)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="JP">日本</SelectItem>
              <SelectItem value="KR">韓國</SelectItem>
              <SelectItem value="TH">泰國</SelectItem>
              <SelectItem value="EU">歐洲申根區</SelectItem>
              <SelectItem value="US">美國</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 p-4 rounded-xl border bg-card">
           <div className="grid grid-cols-2 gap-4">
             <div>
               <div className="text-xs text-muted-foreground mb-1">簽證要求</div>
               <div className={`font-semibold ${data.status.includes('免簽證') ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                 {data.status}
               </div>
             </div>
             <div>
               <div className="text-xs text-muted-foreground mb-1">停留期限</div>
               <div className="font-semibold">{data.duration}</div>
             </div>
           </div>
           
           {data.note && (
             <div className="mt-4 pt-3 border-t flex gap-2 items-start text-sm text-muted-foreground">
               <Info className="w-4 h-4 mt-0.5 shrink-0" />
               <p>{data.note}</p>
             </div>
           )}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          規定可能隨時變動，出發前請務必至外交部領事事務局確認最新規定。
        </p>
      </CardContent>
    </Card>
  );
}
