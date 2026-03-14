import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';

const SHOE_SIZES = [
  { eu: '36', us_m: '4.5', us_w: '6', jp: '22.5' },
  { eu: '37', us_m: '5', us_w: '6.5', jp: '23' },
  { eu: '38', us_m: '6', us_w: '7.5', jp: '24' },
  { eu: '39', us_m: '7', us_w: '8.5', jp: '25' },
  { eu: '40', us_m: '7.5', us_w: '9', jp: '25.5' },
  { eu: '41', us_m: '8.5', us_w: '10', jp: '26.5' },
  { eu: '42', us_m: '9', us_w: '10.5', jp: '27' },
];

const CLOTH_SIZES = [
  { intl: 'XS', us: '0-2', eu: '32-34', jp: '5-7' },
  { intl: 'S', us: '4-6', eu: '36-38', jp: '9-11' },
  { intl: 'M', us: '8-10', eu: '40-42', jp: '13-15' },
  { intl: 'L', us: '12-14', eu: '44-46', jp: '17-19' },
  { intl: 'XL', us: '16-18', eu: '48-50', jp: '21-23' },
];

export function SizeGuide() {
  const { t } = useTranslation();
  const [cat, setCat] = useState('shoes');

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">👟</span>
          <CardTitle>{t('size.title')}</CardTitle>
        </div>
        <CardDescription>{t('size.desc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t('size.category')}</Label>
          <Select value={cat} onValueChange={(val) => val && setCat(val)}>
            <SelectTrigger>
              {cat === 'shoes' ? t('size.categories.shoes') : t('size.categories.clothes')}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shoes">{t('size.categories.shoes')}</SelectItem>
              <SelectItem value="clothes">{t('size.categories.clothes')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 border rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              {cat === 'shoes' ? (
                <tr>
                  <th className="p-2 border-b">EU</th>
                  <th className="p-2 border-b">US (M)</th>
                  <th className="p-2 border-b">US (W)</th>
                  <th className="p-2 border-b">JP (cm)</th>
                </tr>
              ) : (
                <tr>
                  <th className="p-2 border-b">INTL</th>
                  <th className="p-2 border-b">US</th>
                  <th className="p-2 border-b">EU</th>
                  <th className="p-2 border-b">JP</th>
                </tr>
              )}
            </thead>
            <tbody>
              {cat === 'shoes' ? 
                SHOE_SIZES.map((s, i) => (
                  <tr key={i} className="text-center hover:bg-muted/30">
                    <td className="p-2 border-b font-bold">{s.eu}</td>
                    <td className="p-2 border-b">{s.us_m}</td>
                    <td className="p-2 border-b">{s.us_w}</td>
                    <td className="p-2 border-b">{s.jp}</td>
                  </tr>
                )) :
                CLOTH_SIZES.map((s, i) => (
                  <tr key={i} className="text-center hover:bg-muted/30">
                    <td className="p-2 border-b font-bold">{s.intl}</td>
                    <td className="p-2 border-b">{s.us}</td>
                    <td className="p-2 border-b">{s.eu}</td>
                    <td className="p-2 border-b">{s.jp}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}