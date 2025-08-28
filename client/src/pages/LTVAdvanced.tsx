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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue Impact</p>
                    <p className="text-2xl font-bold text-foreground">$2.8M</p>
                    <p className="text-xs text-success mt-1">LTV-driven</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Predictions at Risk</p>
                    <p className="text-2xl font-bold text-foreground">2</p>
                    <p className="text-xs text-warning mt-1">Needs attention</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-warning" />
                </div>
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

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LTVCohortBuilder />
            <LTVPredictionBuilder />
          </div>
          <LTVModelConfig />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <LTVResults predictions={samplePredictions} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <LTVModelPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
}