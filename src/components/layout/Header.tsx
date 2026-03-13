import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function Header() {
  const handleInstallClick = () => {
    // PWA Install logic placeholder
    console.log("install PWA");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight">🧰 旅遊瑞士刀</span>
        </div>
        <div className="flex items-center">
          {/* We will conditionally show this later based on PWA status */}
          <Button variant="outline" size="sm" onClick={handleInstallClick} className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">安裝到手機</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
