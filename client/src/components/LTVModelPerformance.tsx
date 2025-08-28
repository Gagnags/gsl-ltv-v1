import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Activity
} from "lucide-react";

const modelMetrics = [
  { name: "Accuracy (MAPE)", value: 8.2, threshold: 10, status: "good", description: "Mean Absolute Percentage Error" },
  { name: "Precision", value: 89.4, threshold: 85, status: "excellent", description: "True positive rate" },
  { name: "Recall", value: 82.1, threshold: 80, status: "good", description: "Coverage of actual positives" },
  { name: "R² Score", value: 91.7, threshold: 85, status: "excellent", description: "Variance explained by model" }
];

const featureImportance = [
  { feature: "Session Count (7d)", importance: 0.34, description: "Number of sessions in first week" },
  { feature: "Total IAP Revenue", importance: 0.28, description: "In-app purchase spending" },
  { feature: "Level Progression", importance: 0.19, description: "Levels completed vs time" },
  { feature: "Tutorial Completion", importance: 0.11, description: "Onboarding completion status" },
  { feature: "Platform", importance: 0.08, description: "iOS vs Android performance" }
];

const cohortAccuracy = [
  { cohort: "High Spenders", accuracy: 94.2, sampleSize: 1240, confidence: "High" },
  { cohort: "New Players", accuracy: 87.6, sampleSize: 15600, confidence: "High" },
  { cohort: "Retention Risk", accuracy: 82.3, sampleSize: 3400, confidence: "Medium" },
  { cohort: "Social Players", accuracy: 78.9, sampleSize: 890, confidence: "Medium" }
];

export const LTVModelPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Model Performance</CardTitle>
            <CardDescription>Accuracy metrics and feature analysis</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Metrics */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Target className="w-4 h-4" />
            Model Quality Metrics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {modelMetrics.map((metric) => (
              <div key={metric.name} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">{metric.name}</div>
                  {metric.status === "excellent" ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : metric.status === "good" ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-warning" />
                  )}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {metric.value}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
                <Progress value={metric.value} className="mt-2 h-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Feature Importance */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Top Predictive Features
          </h4>
          <div className="space-y-3">
            {featureImportance.map((feature, index) => (
              <div key={feature.feature} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate">{feature.feature}</span>
                    <span className="text-sm text-muted-foreground">{Math.round(feature.importance * 100)}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{feature.description}</div>
                  <Progress value={feature.importance * 100} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cohort Performance */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Accuracy by Cohort
          </h4>
          <div className="space-y-3">
            {cohortAccuracy.map((cohort) => (
              <div key={cohort.cohort} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{cohort.cohort}</div>
                  <Badge variant={cohort.confidence === "High" ? "default" : "secondary"}>
                    {cohort.confidence}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Accuracy: </span>
                    <span className="font-semibold">{cohort.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sample: </span>
                    <span className="font-semibold">{cohort.sampleSize.toLocaleString()}</span>
                  </div>
                </div>
                <Progress value={cohort.accuracy} className="mt-2 h-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Model Health Summary */}
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <h4 className="font-medium text-success">Model Health: Excellent</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            All key metrics are within acceptable thresholds. Model is performing well across 
            different player cohorts with high accuracy and reliable predictions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};