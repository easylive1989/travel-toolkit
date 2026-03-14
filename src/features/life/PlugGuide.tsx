import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';

export function PlugGuide() {
  const { t } = useTranslation();
  const [country, setCountry] = useState('JP');

  const PLUG_GUIDE: Record<string, { name: string, voltage: string, type: string }> = {
    'JP': { name: t('plugs.countries.JP'), voltage: '100V', type: 'A, B' },
    'US': { name: t('plugs.countries.US'), voltage: '120V', type: 'A, B' },
    'EU': { name: t('plugs.countries.EU'), voltage: '230V', type: 'C, E, F' },
    'KR': { name: t('plugs.countries.KR'), voltage: '220V', type: 'C, F' },
    'TW': { name: t('plugs.countries.TW'), voltage: '110V', type: 'A, B' },
    'GB': { name: t('plugs.countries.GB'), voltage: '230V', type: 'G' }
  };

  const data = PLUG_GUIDE[country];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔌</span>
          <CardTitle>{t('plugs.title')}</CardTitle>
        </div>
        <CardDescription>{t('plugs.desc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t('plugs.select_country')}</Label>
          <Select value={country} onValueChange={(val) => val && setCountry(val)}>
            <SelectTrigger>
              {PLUG_GUIDE[country].name}
            </SelectTrigger>
            <SelectContent>
              {Object.keys(PLUG_GUIDE).map(k => (
                <SelectItem key={k} value={k}>{PLUG_GUIDE[k].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-6 p-6 bg-muted rounded-xl text-center border space-y-4">
          <div className="text-lg font-semibold text-primary">{t('plugs.voltage')}：{data.voltage}</div>
          <div className="text-6xl animate-pulse">🔌</div>
          <div className="text-xl font-bold">{t('plugs.socket_type')}：Type {data.type}</div>
        </div>
      </CardContent>
    </Card>
  );
}