
export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 text-center">
      <div className="container flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">Made for Travelers 🌍</p>
        <a 
          href="https://www.buymeacoffee.com" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 hover:scale-105"
        >
          ☕ 請我喝杯咖啡
        </a>
      </div>
    </footer>
  );
}
