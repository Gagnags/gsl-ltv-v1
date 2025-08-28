import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "@/components/MetricCard";
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
  RefreshCw
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
  },
  {
    id: "pred_004",
    name: "iOS Premium Users",
    cohortSize: 5600,
    predictedLTV90d: 8.92,
    confidence: 0.88,
    status: "active",
    lastUpdated: "6 hours ago",
    uplift: "+18.4%",
    topDrivers: ["platform_ios", "premium_purchase_d1", "social_share"]
  },
  {
    id: "pred_005",
    name: "Weekend Warriors",
    cohortSize: 7800,
    predictedLTV90d: 3.24,
    confidence: 0.79,
    status: "active",
    lastUpdated: "8 hours ago",
    uplift: "+5.2%",
    topDrivers: ["weekend_sessions", "long_session_duration", "achievement_unlock"]
  },
  {
    id: "pred_006",
    name: "Tutorial Completers",
    cohortSize: 18900,
    predictedLTV90d: 6.45,
    confidence: 0.85,
    status: "active",
    lastUpdated: "12 hours ago",
    uplift: "+22.1%",
    topDrivers: ["tutorial_complete", "first_level_time", "help_usage"]
  },
  {
    id: "pred_007",
    name: "Social Connectors",
    cohortSize: 4200,
    predictedLTV90d: 11.78,
    confidence: 0.83,
    status: "training",
    lastUpdated: "1 day ago",
    uplift: "+28.9%",
    topDrivers: ["friend_invite", "leaderboard_view", "guild_join"]
  },
  {
    id: "pred_008",
    name: "Android Power Users",
    cohortSize: 9600,
    predictedLTV90d: 7.33,
    confidence: 0.81,
    status: "active",
    lastUpdated: "18 hours ago",
    uplift: "+14.7%",
    topDrivers: ["platform_android", "daily_login_streak", "feature_usage"]
  }
];

export default function LTVPrediction() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">LTV Prediction</h1>
          <p className="text-muted-foreground mt-2">
            Predict player lifetime value to optimize acquisition and retention strategies
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh All
          </Button>
          <Button size="sm">
            <Target className="w-4 h-4 mr-2" />
            New Prediction
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Predictions" 
          value="24"
          change={{ value: "+3", type: "increase", period: "this week" }}
          icon={<Brain className="w-5 h-5" />}
        />
        <MetricCard
          title="Total Cohorts Tracked"
          value="156K"
          change={{ value: "+8.2K", type: "increase", period: "this week" }}
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="Avg Prediction Accuracy"
          value="87.3%"
          change={{ value: "+2.1%", type: "increase", period: "vs last month" }}
          icon={<Target className="w-5 h-5" />}
        />
        <MetricCard
          title="Revenue Impact"
          value="$2.4M"
          change={{ value: "+15.6%", type: "increase", period: "attributed" }}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="builder">Prediction Builder</TabsTrigger>
          <TabsTrigger value="results">Results & Analysis</TabsTrigger>
          <TabsTrigger value="performance">Model Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Active Predictions */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Active LTV Predictions</CardTitle>
                  <CardDescription>Monitor and manage your running prediction models</CardDescription>
                </div>
                <Badge variant="secondary">{samplePredictions.length} Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {samplePredictions.map((prediction) => (
                  <div 
                    key={prediction.id} 
                    className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedPrediction(prediction)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {prediction.status === "active" ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <Clock className="w-4 h-4 text-warning" />
                          )}
                          <div>
                            <h4 className="font-medium text-foreground">{prediction.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {prediction.cohortSize.toLocaleString()} players • Updated {prediction.lastUpdated}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Predicted LTV (90d)</p>
                          <p className="font-bold text-lg text-foreground">${prediction.predictedLTV90d}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={prediction.confidence * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">{Math.round(prediction.confidence * 100)}%</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">vs Baseline</p>
                        <Badge variant={prediction.uplift.startsWith('+') ? 'secondary' : 'destructive'}>
                          {prediction.uplift}
                        </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Pause className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Top Drivers */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Top Value Drivers:</p>
                      <div className="flex gap-2">
                        {prediction.topDrivers.map((driver, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {driver}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Model Summary Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Model Performance Summary
              </CardTitle>
              <CardDescription>Key metrics across all active predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-surface-elevated rounded-lg">
                  <div className="text-2xl font-bold text-foreground">87.3%</div>
                  <div className="text-sm text-muted-foreground">Avg Accuracy</div>
                </div>
                <div className="p-3 bg-surface-elevated rounded-lg">
                  <div className="text-2xl font-bold text-foreground">$5.67</div>
                  <div className="text-sm text-muted-foreground">Mean LTV</div>
                </div>
                <div className="p-3 bg-surface-elevated rounded-lg">
                  <div className="text-2xl font-bold text-foreground">24K</div>
                  <div className="text-sm text-muted-foreground">Players Analyzed</div>
                </div>
                <div className="p-3 bg-surface-elevated rounded-lg">
                  <div className="text-2xl font-bold text-foreground">8.2%</div>
                  <div className="text-sm text-muted-foreground">Prediction Error</div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">High-Value Cohort Performance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tutorial completers with D1 purchases show 3.2x higher predicted LTV. 
                        Current model accuracy: 91% for this segment.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Model Monitoring Alert</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Retention Risk segment showing increased prediction variance. 
                        Consider retraining with recent data.
                      </p>
                    </div>
                  </div>
                </div>
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