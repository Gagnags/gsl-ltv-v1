import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Target, 
  Clock, 
  Brain,
  TrendingUp,
  Play,
  Save
} from "lucide-react";

export function LTVModelConfig() {
  const [featureWindow, setFeatureWindow] = useState("7");
  const [targetWindow, setTargetWindow] = useState("7");
  const [predictionHorizon, setPredictionHorizon] = useState("7");
  const [confidenceLevel, setConfidenceLevel] = useState("95");
  const [autoRetrain, setAutoRetrain] = useState(true);

  const featureWindowOptions = [
    { value: "7", label: "7 days", description: "Short-term behavior patterns" },
    { value: "14", label: "14 days", description: "Medium-term engagement trends" },
    { value: "30", label: "30 days", description: "Monthly behavior cycles" },
    { value: "60", label: "60 days", description: "Long-term user patterns" }
  ];

  const targetWindowOptions = [
    { value: "7", label: "7 days", description: "Weekly LTV prediction" },
    { value: "14", label: "14 days", description: "Bi-weekly LTV prediction" },
    { value: "30", label: "30 days", description: "Monthly LTV prediction" }
  ];

  const predictionHorizonOptions = [
    { value: "7", label: "7 days", description: "Short-term forecast" },
    { value: "14", label: "14 days", description: "Medium-term forecast" },
    { value: "30", label: "30 days", description: "Long-term forecast" }
  ];

  const confidenceLevelOptions = [
    { value: "80", label: "80%", description: "Lower confidence, wider intervals" },
    { value: "90", label: "90%", description: "Standard confidence level" },
    { value: "95", label: "95%", description: "High confidence, narrow intervals" },
    { value: "99", label: "99%", description: "Very high confidence" }
  ];

  const handleSaveConfig = () => {
    // Mock save functionality
    console.log("Saving model configuration:", {
      featureWindow,
      targetWindow,
      predictionHorizon,
      confidenceLevel,
      autoRetrain
    });
  };

  const handleRunTraining = () => {
    // Mock training functionality
    console.log("Starting model training with config:", {
      featureWindow,
      targetWindow,
      predictionHorizon,
      confidenceLevel
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Model Configuration & Training</h2>
        <p className="text-muted-foreground">
          Configure model parameters and prediction settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Configuration */}
        <div className="space-y-6">
          {/* Feature Window Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Feature Window Settings
              </CardTitle>
              <CardDescription>
                Configure the time period for feature engineering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="feature-window">Feature Window</Label>
                <Select value={featureWindow} onValueChange={setFeatureWindow}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select feature window" />
                  </SelectTrigger>
                  <SelectContent>
                    {featureWindowOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Time period used to generate user features for prediction
                </p>
              </div>

              <div>
                <Label htmlFor="target-window">Target Window</Label>
                <Select value={targetWindow} onValueChange={setTargetWindow}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select target window" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetWindowOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Time period for which to predict LTV
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Prediction Settings
              </CardTitle>
              <CardDescription>
                Configure prediction horizon and confidence levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prediction-horizon">Prediction Horizon</Label>
                <Select value={predictionHorizon} onValueChange={setPredictionHorizon}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select prediction horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    {predictionHorizonOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  How far into the future to predict LTV
                </p>
              </div>

              <div>
                <Label htmlFor="confidence-level">Confidence Level</Label>
                <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select confidence level" />
                  </SelectTrigger>
                  <SelectContent>
                    {confidenceLevelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Statistical confidence for prediction intervals
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Training Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Training Settings
              </CardTitle>
              <CardDescription>
                Configure model training and automation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-retrain">Auto-retrain Models</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically retrain models when new data is available
                  </p>
                </div>
                <Switch
                  id="auto-retrain"
                  checked={autoRetrain}
                  onCheckedChange={setAutoRetrain}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview & Actions */}
        <div className="space-y-6">
          {/* Configuration Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration Summary</CardTitle>
              <CardDescription>
                Review your current model configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Feature Window</Label>
                  <Badge variant="secondary" className="w-full justify-center">
                    {featureWindowOptions.find(opt => opt.value === featureWindow)?.label}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Target Window</Label>
                  <Badge variant="secondary" className="w-full justify-center">
                    {targetWindowOptions.find(opt => opt.value === targetWindow)?.label}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Prediction Horizon</Label>
                  <Badge variant="secondary" className="w-full justify-center">
                    {predictionHorizonOptions.find(opt => opt.value === predictionHorizon)?.label}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Confidence Level</Label>
                  <Badge variant="secondary" className="w-full justify-center">
                    {confidenceLevelOptions.find(opt => opt.value === confidenceLevel)?.label}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Information</CardTitle>
              <CardDescription>
                Details about the current model suite
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total Models</span>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Last Training</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Training Status</span>
                <Badge variant="default" className="bg-green-500">Ready</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Data Freshness</span>
                <span className="text-muted-foreground">Up to date</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleSaveConfig} className="w-full" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
            <Button onClick={handleRunTraining} className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Run Model Training
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}