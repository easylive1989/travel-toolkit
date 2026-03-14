import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Plus, Trash2, Languages } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from 'react-i18next';

interface Flashcard {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
}

const STORAGE_KEY = 'travel-toolkit-flashcards';

const SUPPORTED_LANGS = [
  { label: '中文', value: 'zh-TW' },
  { label: '日文', value: 'ja-JP' },
  { label: '韓文', value: 'ko-KR' },
  { label: '英文', value: 'en-US' },
  { label: '法文', value: 'fr-FR' },
  { label: '德文', value: 'de-DE' },
  { label: '義大利文', value: 'it-IT' },
  { label: '泰文', value: 'th-TH' },
  { label: '越南文', value: 'vi-VN' },
];

const CORE_PHRASE_KEYS = ['hello', 'thanks', 'price', 'restroom'];

const CORE_TRANSLATIONS: Record<string, Record<string, string>> = {
  'hello': {
    'zh-TW': '你好',
    'ja-JP': 'こんにちは (Konnichiwa)',
    'ko-KR': '안녕하세요 (Annyeonghaseyo)',
    'en-US': 'Hello',
    'fr-FR': 'Bonjour',
    'de-DE': 'Guten Tag',
    'it-IT': 'Buongiorno',
    'th-TH': 'สวัสดี (Sawasdee)',
    'vi-VN': 'Xin chào',
  },
  'thanks': {
    'zh-TW': '謝謝',
    'ja-JP': 'ありがとうございます (Arigatou gozaimasu)',
    'ko-KR': '감사합니다 (Gamsahamnida)',
    'en-US': 'Thank you',
    'fr-FR': 'Merci',
    'de-DE': 'Danke',
    'it-IT': 'Grazie',
    'th-TH': 'ขอบคุณ (Khob khun)',
    'vi-VN': 'Cảm ơn',
  },
  'price': {
    'zh-TW': '這個多少錢？',
    'ja-JP': 'いくらですか？ (Ikura desu ka?)',
    'ko-KR': '얼마예요? (Eolmayeyo?)',
    'en-US': 'How much is this?',
    'fr-FR': "C'est combien ?",
    'de-DE': 'Was kostet das?',
    'it-IT': 'Quanto costa?',
    'th-TH': 'ราคาเท่าไหร่ (Raka thao rai)',
    'vi-VN': 'Cái này bao nhiêu tiền?',
  },
  'restroom': {
    'zh-TW': '請問廁所在哪裡？',
    'ja-JP': 'トイレはどこですか？ (Toire wa doko desu ka?)',
    'ko-KR': '화장실이 어디예요? (Hwajangsil-i eodiyeyo?)',
    'en-US': 'Where is the restroom?',
    'fr-FR': 'Où sont les toilettes ?',
    'de-DE': 'Wo ist die Toilette?',
    'it-IT': "Dov'è il bagno?",
    'th-TH': 'ห้องน้ำอยู่ที่ไหน (Hong nam yu thi nai)',
    'vi-VN': 'Nhà vệ sinh ở đâu?',
  }
};

export function SurvivalPhrases() {
  const { t } = useTranslation();

  const generateDefaultCards = (): Flashcard[] => {
    const defaults: Flashcard[] = [];
    const langValues = SUPPORTED_LANGS.map(l => l.value);

    langValues.forEach(source => {
      langValues.forEach(target => {
        if (source === target) return;
        CORE_PHRASE_KEYS.forEach(key => {
          defaults.push({
            id: `def-${source}-${target}-${key}`,
            sourceText: CORE_TRANSLATIONS[key][source],
            targetText: CORE_TRANSLATIONS[key][target],
            sourceLang: source,
            targetLang: target,
          });
        });
      });
    });
    return defaults;
  };

  const [cards, setCards] = useState<Flashcard[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const existing: Flashcard[] = stored ? JSON.parse(stored) : [];
    const allDefaults = generateDefaultCards();
    const merged = [...existing];
    allDefaults.forEach(def => {
      if (!merged.some(c => c.id === def.id)) merged.push(def);
    });
    return merged;
  });

  const [activeSourceLang, setActiveSourceLang] = useState('zh-TW');
  const [activeTargetLang, setActiveTargetLang] = useState('ja-JP');
  const [newSource, setNewSource] = useState('');
  const [newTarget, setNewTarget] = useState('');
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
      sourceLang: activeSourceLang,
      targetLang: activeTargetLang,
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

  const getLangLabel = (val: string) => {
    return SUPPORTED_LANGS.find(l => l.value === val)?.label || val;
  };

  const filteredCards = cards.filter(
    c => c.sourceLang === activeSourceLang && c.targetLang === activeTargetLang
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            <CardTitle>{t('flashcards.title')}</CardTitle>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger render={
              <Button size="icon-sm" variant="outline" className="rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            } />
            <DialogContent className="max-w-[90vw] sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>{t('flashcards.add_card')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="text-xs bg-muted p-2 rounded text-muted-foreground font-medium">
                  {t('groups.add')} ➜ {getLangLabel(activeSourceLang)} ➜ {getLangLabel(activeTargetLang)}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">{t('flashcards.source_label')} ({getLangLabel(activeSourceLang)})</label>
                  <Input value={newSource} onChange={e => setNewSource(e.target.value)} placeholder="..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">{t('flashcards.target_label')} ({getLangLabel(activeTargetLang)})</label>
                  <Input value={newTarget} onChange={e => setNewTarget(e.target.value)} placeholder="..." />
                </div>
                <Button className="w-full font-bold" onClick={addCard} disabled={!newSource.trim() || !newTarget.trim()}>
                  {t('flashcards.add_to_list')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <Select value={activeSourceLang} onValueChange={setActiveSourceLang}>
            <SelectTrigger className="h-8 text-xs min-w-[80px]">
              {getLangLabel(activeSourceLang)}
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGS.map(l => (
                <SelectItem key={l.value} value={l.value}>{getLangLabel(l.value)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-muted-foreground">➜</div>
          <Select value={activeTargetLang} onValueChange={setActiveTargetLang}>
            <SelectTrigger className="h-8 text-xs min-w-[80px]">
              {getLangLabel(activeTargetLang)}
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGS.map(l => (
                <SelectItem key={l.value} value={l.value}>{getLangLabel(l.value)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-3 pb-4">
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 no-scrollbar">
          {filteredCards.map((card) => (
            <div key={card.id} className="group relative flex justify-between items-center p-3 bg-muted/30 border rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <div className="text-sm font-medium mb-0.5">{card.sourceText}</div>
                <div className="font-bold text-primary truncate">{card.targetText}</div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon-xs" className="rounded-full text-muted-foreground hover:text-foreground" onClick={() => speak(card.targetText, card.targetLang)}>
                  <Volume2 className="h-4 w-4" />
                </Button>
                {!card.id.startsWith('def-') && (
                  <Button variant="ghost" size="icon-xs" className="rounded-full text-muted-foreground hover:text-destructive transition-colors" onClick={() => deleteCard(card.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {filteredCards.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">{t('flashcards.empty')}</p>
              <p className="text-xs mt-1">{t('flashcards.click_plus')}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}