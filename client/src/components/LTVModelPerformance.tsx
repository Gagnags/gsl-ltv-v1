import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Brain,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

export function LTVModelPerformance() {
  // Mock data based on the notebook analysis
  const modelMetrics = [
    {
      name: "IAP Purchase Model",
      accuracy: 89.4,
      auc: 0.874,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Subscription Model", 
      accuracy: 76.2,
      auc: 0.823,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Ad Impression Model",
      accuracy: 82.1,
      auc: 0.791,
      status: "active", 
      lastUpdated: "2 hours ago"
    },
    {
      name: "Churn Model",
      accuracy: 84.7,
      auc: 0.856,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Daily Retention Model",
      accuracy: 78.9,
      auc: 0.812,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      name: "IAP Spend Model",
      accuracy: 91.2,
      auc: 0.893,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Ad Revenue Model",
      accuracy: 87.6,
      auc: 0.845,
      status: "active",
      lastUpdated: "2 hours ago"
    },
    {
      name: "General Behavior Model",
      accuracy: 81.3,
      auc: 0.798,
      status: "active",
      lastUpdated: "2 hours ago"
    }
  ];

  // Actual features from the notebook
  const predictiveFeatures = [
    { name: "Sessions (7d)", importance: 34, description: "Number of sessions in first week" },
    { name: "Total IAP Revenue", importance: 28, description: "In-app purchase spending" },
    { name: "Level Progression", importance: 19, description: "Levels completed vs time" },
    { name: "Tutorial Completion", importance: 11, description: "Onboarding completion status" },
    { name: "Platform", importance: 8, description: "iOS vs Android performance" }
  ];

  const cohortAccuracy = [
    { name: "High Spenders", accuracy: 94.2, sample: 1240, confidence: "high" },
    { name: "New Players", accuracy: 87.6, sample: 15600, confidence: "high" },
    { name: "Retention Risk", accuracy: 82.3, sample: 3400, confidence: "medium" },
    { name: "Social Players", accuracy: 78.9, sample: 890, confidence: "medium" }
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "low":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Model Performance</h2>
        <p className="text-muted-foreground">
          Accuracy metrics and feature analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Model Quality Metrics</CardTitle>
            <CardDescription>
              Performance indicators for individual models
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modelMetrics.map((model, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{model.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {model.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="ml-2 font-semibold">{model.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">AUC-ROC:</span>
                    <span className="ml-2 font-semibold">{model.auc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {model.lastUpdated}
                </div>
                {index < modelMetrics.length - 1 && <div className="border-t pt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Predictive Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Predictive Features</CardTitle>
            <CardDescription>
              Most important features for LTV prediction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictiveFeatures.map((feature, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <span className="text-sm font-medium">{feature.name}</span>
                  </div>
                  <Badge variant="secondary">{feature.importance}%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
                <Progress value={feature.importance} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Accuracy by Cohort */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Accuracy by Cohort</CardTitle>
          <CardDescription>
            Model performance across different user segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cohortAccuracy.map((cohort, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{cohort.accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{cohort.sample.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Sample</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={cohort.accuracy} className="w-24 h-2" />
                  <Badge className={getConfidenceColor(cohort.confidence)}>
                    {cohort.confidence}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}