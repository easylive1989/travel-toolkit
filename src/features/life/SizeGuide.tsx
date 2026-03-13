// Removed React import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SizeGuide() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-2xl">👕</span>
          <CardTitle>服飾尺寸對照表</CardTitle>
        </div>
        <CardDescription>美規、歐規、亞洲尺寸換算 (女裝為例)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm text-center">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 font-semibold border-b">亞洲 / 台灣</th>
                <th className="p-3 font-semibold border-b border-l">US (美規)</th>
                <th className="p-3 font-semibold border-b border-l">EU (歐規)</th>
                <th className="p-3 font-semibold border-b border-l">UK (英規)</th>
              </tr>
            </thead>
            <tbody className="divide-y">
               <tr>
                <td className="p-3 font-medium">XS</td>
                <td className="p-3 border-l text-muted-foreground">0-2</td>
                <td className="p-3 border-l text-muted-foreground">32-34</td>
                <td className="p-3 border-l text-muted-foreground">4-6</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">S</td>
                <td className="p-3 border-l text-muted-foreground">4-6</td>
                <td className="p-3 border-l text-muted-foreground">36-38</td>
                <td className="p-3 border-l text-muted-foreground">8-10</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">M</td>
                <td className="p-3 border-l text-muted-foreground">8-10</td>
                <td className="p-3 border-l text-muted-foreground">40-42</td>
                <td className="p-3 border-l text-muted-foreground">12-14</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">L</td>
                <td className="p-3 border-l text-muted-foreground">12-14</td>
                <td className="p-3 border-l text-muted-foreground">44-46</td>
                <td className="p-3 border-l text-muted-foreground">16-18</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">XL</td>
                <td className="p-3 border-l text-muted-foreground">16</td>
                <td className="p-3 border-l text-muted-foreground">48</td>
                <td className="p-3 border-l text-muted-foreground">20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">此為概略對照，各品牌可能有差異</p>
      </CardContent>
    </Card>
  );
}
