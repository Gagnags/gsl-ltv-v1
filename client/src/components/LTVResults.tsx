import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Target,
  BarChart3,
  LineChart,
  Download,
  Share,
  Zap
} from "lucide-react";

interface LTVPrediction {
  id: string;
  name: string;
  cohortSize: number;
  predictedLTV90d: number;
  confidence: number;
  status: string;
  lastUpdated: string;
  uplift: string;
  topDrivers: string[];
}

interface LTVResultsProps {
  predictions: LTVPrediction[];
}

const performanceMetrics = {
  totalRevenue: 2847650,
  avgLTV: 4.87,
  topPerformingChannel: "Facebook Ads",
  riskCohorts: 3,
  confidenceScore: 0.87
};

const driverAnalysis = [
  {
    driver: "tutorial_complete",
    impact: 0.34,
    direction: "positive",
    description: "Players completing tutorial show +34% higher LTV"
  },
  {
    driver: "first_purchase_d3", 
    impact: 0.67,
    direction: "positive",
    description: "First purchase within 3 days increases LTV by +67%"
  },
  {
    driver: "session_gap_d7",
    impact: -0.23,
    direction: "negative", 
    description: "Session gaps over 7 days reduce LTV by -23%"
  },
  {
    driver: "social_connect",
    impact: 0.19,
    direction: "positive",
    description: "Social connection increases LTV by +19%"
  },
  {
    driver: "support_ticket_d1",
    impact: -0.41,
    direction: "negative",
    description: "Support tickets on Day 1 reduce LTV by -41%"
  }
];

export const LTVResults = ({ predictions }: LTVResultsProps) => {
  const [selectedPrediction, setSelectedPrediction] = useState<LTVPrediction | null>(
    predictions[0] || null
  );

  const getUpliftColor = (uplift: string) => {
    if (uplift.startsWith('+')) return 'text-green-600';
    if (uplift.startsWith('-')) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getUpliftVariant = (uplift: string) => {
    if (uplift.startsWith('+')) return 'secondary';
    if (uplift.startsWith('-')) return 'destructive';
    return 'outline';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predicted Revenue</p>
                <p className="text-lg font-bold">${(performanceMetrics.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg LTV</p>
                <p className="text-lg font-bold">${performanceMetrics.avgLTV}</p>
              </div>
              <Target className="w-5 h-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Channel</p>
                <p className="text-lg font-bold text-green-600">Facebook</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Cohorts</p>
                <p className="text-lg font-bold text-red-600">{performanceMetrics.riskCohorts}</p>
              </div>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confidence</p>
                <p className="text-lg font-bold">{Math.round(performanceMetrics.confidenceScore * 100)}%</p>
              </div>
              <Zap className="w-5 h-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="drivers">Value Drivers</TabsTrigger>
          <TabsTrigger value="comparison">Cohort Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          {/* Predictions Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>LTV Predictions Results</CardTitle>
                  <CardDescription>Performance summary for all active predictions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div 
                    key={prediction.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPrediction?.id === prediction.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedPrediction(prediction)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-medium text-foreground">{prediction.name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {prediction.cohortSize.toLocaleString()} players
                            </div>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{prediction.lastUpdated}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Predicted LTV</p>
                          <p className="text-lg font-bold text-foreground">${prediction.predictedLTV90d}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={prediction.confidence * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">{Math.round(prediction.confidence * 100)}%</span>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">vs Baseline</p>
                          <Badge variant={getUpliftVariant(prediction.uplift)}>
                            {prediction.uplift}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedPrediction?.id === prediction.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Top Value Drivers</p>
                            <div className="space-y-1">
                              {prediction.topDrivers.slice(0, 3).map((driver, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                  <span className="text-sm text-muted-foreground">{driver}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-2">Revenue Impact</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Total Predicted Revenue:</span>
                                <span className="font-medium">${(prediction.predictedLTV90d * prediction.cohortSize).toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Revenue per Player:</span>
                                <span className="font-medium">${prediction.predictedLTV90d}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Value Drivers Analysis</CardTitle>
              <CardDescription>Key factors influencing LTV predictions across all cohorts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driverAnalysis.map((driver, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          driver.direction === 'positive' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <h4 className="font-medium text-foreground">{driver.driver}</h4>
                        <Badge variant="outline" className="text-xs">
                          {driver.direction === 'positive' ? '+' : ''}{Math.round(driver.impact * 100)}%
                        </Badge>
                      </div>
                      {driver.direction === 'positive' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{driver.description}</p>
                    <div className="mt-2">
                      <Progress 
                        value={Math.abs(driver.impact) * 100} 
                        className={`h-2 ${driver.direction === 'positive' ? '[&>div]:bg-green-500' : '[&>div]:bg-red-500'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Comparison</CardTitle>
              <CardDescription>Compare LTV predictions across different player segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Comparison Chart Coming Soon</h3>
                <p className="text-muted-foreground">
                  Interactive cohort comparison visualization will be available here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};