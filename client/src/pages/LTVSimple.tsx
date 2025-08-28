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
  Target,
  Users
} from "lucide-react";

export default function LTVSimple() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("overall");
  const [selectedRange, setSelectedRange] = useState("30d");
  const [showConfidenceBand, setShowConfidenceBand] = useState(true);

  // Mock data for total users (changes based on toggles)
  const getTotalUsers = () => {
    if (selectedMetric === "overall") return 124567;
    if (selectedMetric === "payer") return 45678;
    return 124567;
  };

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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">LTV Trends</CardTitle>
              <CardDescription>
                Actual vs Predicted LTV with confidence intervals
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Confidence Band</span>
                <Button
                  variant={showConfidenceBand ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowConfidenceBand(!showConfidenceBand)}
                >
                  {showConfidenceBand ? "On" : "Off"}
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                Total Users: {getTotalUsers().toLocaleString()}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metric and Range Selection */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Metric:</span>
              <div className="flex border rounded-lg">
                <Button
                  variant={selectedMetric === "overall" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedMetric("overall")}
                  className="rounded-r-none"
                >
                  Overall LTV
                </Button>
                <Button
                  variant={selectedMetric === "payer" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedMetric("payer")}
                  className="rounded-l-none"
                >
                  Payer LTV
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Range:</span>
              <div className="flex border rounded-lg">
                <Button
                  variant={selectedRange === "14d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedRange("14d")}
                  className="rounded-r-none"
                >
                  14d
                </Button>
                <Button
                  variant={selectedRange === "30d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedRange("30d")}
                  className="rounded-l-none"
                >
                  30d
                </Button>
                <Button
                  variant={selectedRange === "60d" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedRange("60d")}
                  className="rounded-l-none"
                >
                  60d
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">Platform</label>
              <select className="w-full mt-1 border rounded px-3 py-2 bg-background text-sm">
                <option>All Platforms</option>
                <option>iOS</option>
                <option>Android</option>
                <option>Web</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Region</label>
              <select className="w-full mt-1 border rounded px-3 py-2 bg-background text-sm">
                <option>All Regions</option>
                <option>North America</option>
                <option>Europe</option>
                <option>Asia Pacific</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">User Type</label>
              <select className="w-full mt-1 border rounded px-3 py-2 bg-background text-sm">
                <option>All Users</option>
                <option>New Users</option>
                <option>Returning Users</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Rank</label>
              <select className="w-full mt-1 border rounded px-3 py-2 bg-background text-sm">
                <option>All Ranks</option>
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
              </select>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Actual LTV</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded border-2 border-dashed"></div>
              <span>Predicted LTV</span>
            </div>
            {showConfidenceBand && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-200 rounded opacity-60"></div>
                <span>95% Confidence Interval</span>
              </div>
            )}
          </div>

          {/* LTV Chart Component */}
          <LTVChart 
            showFilters={false}
            showOverlays={showConfidenceBand}
            data-testid="ltv-simple-chart"
            combinedChart={true}
            selectedMetric={selectedMetric}
            selectedRange={selectedRange}
          />
        </CardContent>
      </Card>

      {/* Model Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Overall LTV (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$4.87</div>
            <p className="text-sm text-muted-foreground mt-1">
              +12.3% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Payer LTV (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$12.34</div>
            <p className="text-sm text-muted-foreground mt-1">
              +8.7% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Model Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Average Model Accuracy</div>
              <div className="text-2xl font-bold text-foreground">77.4%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average AUC-ROC Score</div>
              <div className="text-2xl font-bold text-foreground">84.5%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced LTV Builder - Collapsed by Default */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Advanced LTV Configuration</span>
            {isAdvancedOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Definition</CardTitle>
              <CardDescription>
                Define user segments for LTV prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">User Type</label>
                  <select className="w-full mt-1 border rounded px-3 py-2 bg-background">
                    <option>All Users</option>
                    <option>New Users</option>
                    <option>Returning Users</option>
                    <option>High Value Users</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Platform</label>
                  <select className="w-full mt-1 border rounded px-3 py-2 bg-background">
                    <option>All Platforms</option>
                    <option>iOS</option>
                    <option>Android</option>
                    <option>Web</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Horizon</CardTitle>
              <CardDescription>
                Set the time period for LTV forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Days to Predict</label>
                  <input
                    type="number"
                    className="w-full mt-1 border rounded px-3 py-2 bg-background"
                    placeholder="30"
                    min="1"
                    max="365"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Confidence Level</label>
                  <select className="w-full mt-1 border rounded px-3 py-2 bg-background">
                    <option>95%</option>
                    <option>90%</option>
                    <option>80%</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}