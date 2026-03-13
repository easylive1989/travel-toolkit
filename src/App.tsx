
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Finance
import { ExchangeRate } from '@/features/finance/ExchangeRate'
import { Tipping } from '@/features/finance/Tipping'
import { TaxRefund } from '@/features/finance/TaxRefund'
import { Ledger } from '@/features/finance/Ledger'

// Life
import { UnitConverter } from '@/features/life/UnitConverter'
import { PlugGuide } from '@/features/life/PlugGuide'
import { SizeGuide } from '@/features/life/SizeGuide'

// Time
import { PackingList } from '@/features/time/PackingList'
import { DualClock } from '@/features/time/DualClock'
import { VisaInfo } from '@/features/time/VisaInfo'

// Security
import { EmergencyNumbers } from '@/features/security/EmergencyNumbers'
import { SurvivalPhrases } from '@/features/security/SurvivalPhrases'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col">
        <Tabs defaultValue="finance" className="w-full flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-4 sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="finance" className="text-xs">💰 財務</TabsTrigger>
            <TabsTrigger value="life" className="text-xs">🌡️ 生活</TabsTrigger>
            <TabsTrigger value="time" className="text-xs">🕒 行程</TabsTrigger>
            <TabsTrigger value="security" className="text-xs">🆘 求助</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 pb-20"> {/* Add padding bottom to avoid footer overlap if needed */}
            <TabsContent value="finance" className="space-y-4 mt-0 outline-none">
              <ExchangeRate />
              <Ledger />
              <Tipping />
              <TaxRefund />
            </TabsContent>
            
            <TabsContent value="life" className="space-y-4 mt-0 outline-none">
              <UnitConverter />
              <PlugGuide />
              <SizeGuide />
            </TabsContent>
            
            <TabsContent value="time" className="space-y-4 mt-0 outline-none">
              <DualClock />
              <PackingList />
              <VisaInfo />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 mt-0 outline-none">
              <EmergencyNumbers />
              <SurvivalPhrases />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

export default App
