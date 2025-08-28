import { useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LTVChart } from "@/components/LTVChart";
import { mockLTVData } from "@/mock/ltv";
import { 
  ArrowLeft,
  Download,
  Share,
  Copy,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3
} from "lucide-react";

export default function LTVResults() {
  const [match, params] = useRoute("/ltv/run/:id");
  const runId = params?.id || 'pred_001';
  const [runData, setRunData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading run data
    setTimeout(() => {
      setRunData(mockLTVData.getRunData(runId));
      setLoading(false);
    }, 500);
  }, [runId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!runData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Run not found</p>
        <Button variant="outline" className="mt-4" asChild>
          <a href="/ltv/advanced">Back to Overview</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="ltv-results">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <a href="/ltv/advanced" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              {runData.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Prediction results and performance analysis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Chart-First Layout */}
      <div className="flex gap-6">
        {/* Main Content - Chart */}
        <main className="flex-1">
          <LTVChart 
            showFilters={false}
            showOverlays={true}
            runData={runData}
            data-testid="ltv-results-chart"
          />
        </main>

        {/* Right Sidebar - Drivers & Actions */}
        <aside className="w-80 p-4 border-l border-border space-y-6" data-testid="ltv-results-drivers">
          {/* Key Drivers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Key Drivers
              </CardTitle>
              <CardDescription>
                Top factors influencing LTV prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {runData.drivers.map((driver: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{driver.driver.replace('_', ' ')}</span>
                      {driver.direction === 'positive' ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{driver.description}</p>
                  </div>
                  <Badge variant={driver.direction === 'positive' ? 'default' : 'destructive'}>
                    {driver.impact > 0 ? '+' : ''}{Math.round(driver.impact * 100)}%
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cohort Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Cohort Comparison
              </CardTitle>
              <CardDescription>
                Performance vs reference cohorts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {runData.comparison.map((cohort: any, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="font-medium">{cohort.cohort}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">${cohort.predictedLTV}</p>
                      <p className="text-xs text-muted-foreground">Predicted</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">{cohort.retention}%</p>
                      <p className="text-xs text-muted-foreground">Retention</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Create Cohort from Results
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Configuration
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

    </div>
  );
}