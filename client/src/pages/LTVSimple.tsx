import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LTVChart } from "@/components/LTVChart";
import { 
  TrendingUp, 
  RefreshCw, 
  ChevronDown, 
  ChevronRight,
  ExternalLink,
  Settings,
  Target
} from "lucide-react";

export default function LTVSimple() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="p-6 space-y-6" data-testid="ltv-simple-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            LTV Prediction
          </h1>
          <p className="text-muted-foreground mt-1">
            Interactive lifetime value trends and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="default" size="sm" asChild>
            <a href="/ltv/advanced">
              <ExternalLink className="w-4 h-4 mr-2" />
              Go to Advanced
            </a>
          </Button>
        </div>
      </div>

      {/* LTV Trends Chart */}
      <LTVChart 
        showFilters={true}
        showOverlays={true}
        data-testid="ltv-simple-chart"
      />

      {/* Advanced LTV Builder - Collapsed by Default */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <Card data-testid="ltv-advanced-card">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Build Custom LTV Prediction (Advanced)</CardTitle>
                    <CardDescription>
                      Define cohorts, horizons, and inputs. Full results and performance views.
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAdvancedOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Advanced Features Available
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                      <span>Custom cohort building with complex rules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                      <span>Multiple prediction horizons (30d, 90d, 180d, 1y)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                      <span>Advanced model configuration</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                      <span>Feature importance analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                      <span>Model performance metrics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-2 h-2 rounded-full p-0"></Badge>
                      <span>Backtesting and drift monitoring</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button asChild>
                  <a href="/ltv/advanced">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Advanced
                  </a>
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall LTV (30d)</p>
                <p className="text-2xl font-bold">$4.87</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payer LTV (30d)</p>
                <p className="text-2xl font-bold">$12.34</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Model Confidence</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Badge variant="outline" className="text-success border-success">High</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Predictions</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Badge variant="secondary">Running</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}