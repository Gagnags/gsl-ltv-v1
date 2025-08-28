import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LTVCohortBuilder } from "@/components/LTVCohortBuilder";
import { LTVModelConfig } from "@/components/LTVModelConfig";
import { LTVResults } from "@/components/LTVResults";
import { LTVPredictionBuilder } from "@/components/LTVPredictionBuilder";
import { LTVModelPerformance } from "@/components/LTVModelPerformance";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Target,
  Brain,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  RefreshCw,
  ArrowLeft,
  Plus
} from "lucide-react";

const samplePredictions = [
  {
    id: "pred_001",
    name: "US Facebook Cohort",
    cohortSize: 12500,
    predictedLTV90d: 4.87,
    confidence: 0.82,
    status: "active",
    lastUpdated: "2 hours ago",
    uplift: "+12.3%",
    topDrivers: ["tutorial_complete", "first_purchase_d3", "session_count_d7"]
  },
  {
    id: "pred_002", 
    name: "High Spenders D1",
    cohortSize: 3200,
    predictedLTV90d: 15.23,
    confidence: 0.91,
    status: "active",
    lastUpdated: "4 hours ago",
    uplift: "+8.7%",
    topDrivers: ["iap_purchase_d1", "level_progression", "social_connect"]
  },
  {
    id: "pred_003",
    name: "Retention Risk Segment",
    cohortSize: 8900,
    predictedLTV90d: 1.45,
    confidence: 0.76,
    status: "pending",
    lastUpdated: "1 day ago",
    uplift: "-15.2%",
    topDrivers: ["session_gap_d3", "tutorial_skip", "no_purchase_d7"]
  }
];

export default function LTVAdvanced() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <a href="/ltv" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              LTV Snapshot
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              Advanced LTV Prediction
            </h1>
            <p className="text-muted-foreground mt-1">
              Build and manage complex lifetime value models
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Prediction
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cohort-builder">Cohort Builder</TabsTrigger>
          <TabsTrigger value="model-config">Model Config</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Predictions</p>
                    <p className="text-2xl font-bold text-foreground">8</p>
                    <p className="text-xs text-success mt-1">+2 this week</p>
                  </div>
                  <Target className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Model Accuracy</p>
                    <p className="text-2xl font-bold text-foreground">89.2%</p>
                    <p className="text-xs text-success mt-1">+1.3% improved</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Alerts Section - Fixed Design Scheme */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alerts Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  System Alerts
                </CardTitle>
                <CardDescription>
                  Monitor tag performance and data quality issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg border-orange-200/20 bg-orange-950/20">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">Tag Performance Alert</h4>
                      <Badge className="text-xs bg-orange-500/20 text-orange-300 border-orange-500/30">
                        Medium
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      subscription_billed tag has stopped firing for 3 days
                    </p>
                    <div className="text-xs text-muted-foreground">
                      2 hours ago • 1,247 users affected
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg border-red-200/20 bg-red-950/20">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">Data Quality Issue</h4>
                      <Badge className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
                        High
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      iap_purchase_success payload validation failed
                    </p>
                    <div className="text-xs text-muted-foreground">
                      5 hours ago • 892 users affected
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border rounded-lg border-blue-200/20 bg-blue-950/20">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">Model Update Available</h4>
                      <Badge className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                        Low
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      New LTV prediction model v2.1 ready for deployment
                    </p>
                    <div className="text-xs text-muted-foreground">
                      1 day ago • No users affected
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Detailed Model Performance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Check Data Quality
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Predictions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Predictions List */}
          <Card>
            <CardHeader>
              <CardTitle>Active Predictions</CardTitle>
              <CardDescription>Manage your running LTV prediction models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {samplePredictions.map((prediction) => (
                  <div key={prediction.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{prediction.name}</h3>
                          <Badge variant={prediction.status === 'active' ? 'default' : 'secondary'}>
                            {prediction.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {prediction.cohortSize.toLocaleString()} users • {prediction.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold">${prediction.predictedLTV90d}</p>
                        <p className="text-sm text-muted-foreground">90d LTV</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{Math.round(prediction.confidence * 100)}%</p>
                        <p className="text-sm text-muted-foreground">confidence</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/ltv/run/${prediction.id}`}>View Results</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohort-builder" className="space-y-6">
          <LTVCohortBuilder />
        </TabsContent>

        <TabsContent value="model-config" className="space-y-6">
          <LTVModelConfig />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <LTVResults predictions={samplePredictions} />
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Export & Integration</h2>
            <p className="text-muted-foreground">
              Export your LTV predictions and configure automation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Exports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Exports</CardTitle>
                <CardDescription>
                  Export your LTV predictions and cohort data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-sm">Export Cohort Data</h4>
                      <p className="text-xs text-muted-foreground">
                        Download user IDs and features for your cohort
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Export CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-sm">Export LTV Predictions</h4>
                      <p className="text-xs text-muted-foreground">
                        Download aggregated forecasts and confidence intervals
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Export JSON
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling & Automation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scheduling & Automation</CardTitle>
                <CardDescription>
                  Configure automated prediction runs and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-sm">Schedule Prediction for Cohort</h4>
                      <p className="text-xs text-muted-foreground">
                        Set up recurring LTV predictions for your cohort
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-sm">Create Alerts for LTV Predictions</h4>
                      <p className="text-xs text-muted-foreground">
                        Set up notifications for significant LTV changes
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <LTVModelPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
}