import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

const PHRASES: Record<string, { label: string, lang: string, list: { zh: string, native: string }[] }> = {
  'JP': {
    label: '日語',
    lang: 'ja-JP',
    list: [
      { zh: '請問廁所在哪裡？', native: 'トイレはどこですか？ (Toire wa doko desu ka?)' },
      { zh: '請給我這個', native: 'これをください (Kore o kudasai)' },
      { zh: '多少錢？', native: 'いくらですか？ (Ikura desu ka?)' },
      { zh: '謝謝', native: 'ありがとうございます (Arigatou gozaimasu)' },
      { zh: '救命！', native: '助けて！ (Tasukete!)' }
    ]
  },
  'KR': {
    label: '韓語',
    lang: 'ko-KR',
    list: [
      { zh: '請問廁所在哪裡？', native: '화장실이 어디예요? (Hwajangsil-i eodiyeyo?)' },
      { zh: '請給我這個', native: '이거 주세요 (Igeo juseyo)' },
      { zh: '多少錢？', native: '얼마예요? (Eolmayeyo?)' },
      { zh: '謝謝', native: '감사합니다 (Gamsahamnida)' },
      { zh: '救命！', native: '사람 살려! (Saram sallyeo!)' }
    ]
  },
  'EN': {
    label: '英語',
    lang: 'en-US',
    list: [
      { zh: '請問廁所在哪裡？', native: 'Where is the restroom?' },
      { zh: '請給我這個', native: 'I would like this, please.' },
      { zh: '多少錢？', native: 'How much is this?' },
      { zh: '謝謝', native: 'Thank you.' },
      { zh: '救命！', native: 'Help!' }
    ]
  }
};

export function SurvivalPhrases() {
  const [lang, setLang] = useState('EN');
  const data = PHRASES[lang];

  const speak = (text: string, language: string) => {
    // Basic text extraction for pronunciation (removing romaji in parenthesis for TTS if possible)
    // For simplicity, we just pass the raw text for now.
    const cleanText = text.replace(/\(.*?\)/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗣️</span>
          <CardTitle>生存外語字卡</CardTitle>
        </div>
        <CardDescription>常用旅遊對話與發音</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={lang} onValueChange={(val) => val && setLang(val)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
             {Object.keys(PHRASES).map(k => (
               <SelectItem key={k} value={k}>{PHRASES[k].label}</SelectItem>
             ))}
          </SelectContent>
        </Select>

        <div className="grid gap-3 mt-4">
          {data.list.map((phrase, i) => (
             <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
               <div className="pr-4">
                 <div className="text-sm font-medium text-muted-foreground mb-1">{phrase.zh}</div>
                 <div className="font-semibold">{phrase.native}</div>
               </div>
               <Button variant="secondary" size="icon" className="rounded-full shrink-0" onClick={() => speak(phrase.native, data.lang)}>
                 <Volume2 className="h-4 w-4" />
               </Button>
             </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
