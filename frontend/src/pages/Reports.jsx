import React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Download, FileText } from "lucide-react"

export default function Reports() {
  const reports = [
    { id: 1, name: 'Q1 Liability Exposure Report', date: 'Mar 31, 2026', size: '2.4 MB' },
    { id: 2, name: 'Vendor Compliance Audit', date: 'Feb 15, 2026', size: '1.8 MB' },
    { id: 3, name: 'Annual Indemnification Summary', date: 'Jan 10, 2026', size: '4.1 MB' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Reports</h2>
          <p className="text-sm text-on-surface-variant">Generate and download comprehensive legal risk reports.</p>
        </div>
        <Button>Generate New Report</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Recently generated PDF reports ready for download.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-outline-variant/30">
            {reports.map((report) => (
              <div key={report.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-on-surface-variant" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-on-surface">{report.name}</h4>
                    <p className="text-xs text-on-surface-variant">{report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4 text-outline hover:text-primary transition-colors" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
