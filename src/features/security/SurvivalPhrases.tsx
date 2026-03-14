import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Plus, Trash2, Languages } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Flashcard {
  id: string;
  sourceText: string;
  targetText: string;
  targetLang: string;
}

const STORAGE_KEY = 'travel-toolkit-flashcards';

const DEFAULT_CARDS: Flashcard[] = [
  // 日語
  { id: '1', sourceText: '你好', targetText: 'こんにちは (Konnichiwa)', targetLang: 'ja-JP' },
  { id: '2', sourceText: '請問廁所在哪裡？', targetText: 'トイレはどこですか？', targetLang: 'ja-JP' },
  { id: '3', sourceText: '謝謝', targetText: 'ありがとうございます', targetLang: 'ja-JP' },
  // 韓語
  { id: '4', sourceText: '你好', targetText: '안녕하세요 (Annyeonghaseyo)', targetLang: 'ko-KR' },
  { id: '5', sourceText: '多少錢？', targetText: '얼마예요? (Eolmayeyo?)', targetLang: 'ko-KR' },
  // 英語
  { id: '6', sourceText: '你好', targetText: 'Hello', targetLang: 'en-US' },
  { id: '7', sourceText: '請給我這個', targetText: 'I would like this, please.', targetLang: 'en-US' },
];

const SUPPORTED_LANGS = [
  { label: '日語', value: 'ja-JP' },
  { label: '韓語', value: 'ko-KR' },
  { label: '英語', value: 'en-US' },
  { label: '法語', value: 'fr-FR' },
  { label: '德語', value: 'de-DE' },
  { label: '義大利語', value: 'it-IT' },
  { label: '泰語', value: 'th-TH' },
  { label: '越南語', value: 'vi-VN' },
];

export function SurvivalPhrases() {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_CARDS;
  });

  const [newSource, setNewSource] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newLang, setNewLang] = useState('ja-JP');
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!newSource.trim() || !newTarget.trim()) return;
    const newCard: Flashcard = {
      id: crypto.randomUUID(),
      sourceText: newSource,
      targetText: newTarget,
      targetLang: newLang,
    };
    setCards([newCard, ...cards]);
    setNewSource('');
    setNewTarget('');
    setIsAddOpen(false);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const speak = (text: string, language: string) => {
    const cleanText = text.replace(/\(.*?\)/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            <CardTitle>旅遊字卡</CardTitle>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger render={
              <Button size="icon-sm" variant="outline" className="rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            } />
            <DialogContent className="max-w-[90vw] sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>新增字卡</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium">來源語言內容 (例如：中文)</label>
                  <Input 
                    value={newSource} 
                    onChange={e => setNewSource(e.target.value)} 
                    placeholder="例如：謝謝" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">目標語言內容</label>
                  <Input 
                    value={newTarget} 
                    onChange={e => setNewTarget(e.target.value)} 
                    placeholder="例如：ありがとうございます" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">發音語言</label>
                  <Select value={newLang} onValueChange={setNewLang}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_LANGS.map(l => (
                        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={addCard} disabled={!newSource.trim() || !newTarget.trim()}>
                  加入清單
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>自定義個人旅遊常用短語與發音</CardDescription>
      </CardHeader>
      <CardContent className="px-3 pb-4">
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {cards.map((card) => (
            <div key={card.id} className="group relative flex justify-between items-center p-3 bg-muted/30 border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                  {SUPPORTED_LANGS.find(l => l.value === card.targetLang)?.label}
                </div>
                <div className="text-sm font-medium mb-0.5">{card.sourceText}</div>
                <div className="font-bold text-primary truncate">{card.targetText}</div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button 
                  variant="ghost" 
                  size="icon-xs" 
                  className="rounded-full text-muted-foreground hover:text-foreground"
                  onClick={() => speak(card.targetText, card.targetLang)}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon-xs" 
                  className="rounded-full text-muted-foreground hover:text-destructive transition-colors"
                  onClick={() => deleteCard(card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {cards.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">尚未新增任何字卡</p>
              <p className="text-xs mt-1">點擊右上角 + 開始建立個人單字庫</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
