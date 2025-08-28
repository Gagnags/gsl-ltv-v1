import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Download,
  Share2,
  Eye,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface PredictionResult {
  id: string;
  name: string;
  cohortSize: number;
  predictedLTV: number;
  confidence: number;
  lastUpdated: string;
  status: "completed" | "running" | "failed";
}

// Mock data for the 4 charts based on the notebook
const generateChartData = (days: number) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    data.push({
      day: i + 1,
      cumulativeLTV: 2.5 + (i * 0.8) + (Math.random() * 0.3),
      ciUpper: 2.5 + (i * 0.8) + (Math.random() * 0.3) + (0.5 + i * 0.1),
      ciLower: 2.5 + (i * 0.8) + (Math.random() * 0.3) - (0.5 + i * 0.1),
      survivalProb: Math.max(0.1, 1 - (i * 0.02) - (Math.random() * 0.05)),
      dailyRevenue: 0.8 + (Math.random() * 0.4),
      incrementalLTV: 0.8 + (Math.random() * 0.3)
    });
  }
  return data;
};

const samplePredictions: PredictionResult[] = [
  {
    id: "1",
    name: "US Facebook High-Value Prospects",
    cohortSize: 12500,
    predictedLTV: 4.87,
    confidence: 0.82,
    lastUpdated: "2 hours ago",
    status: "completed"
  },
  {
    id: "2", 
    name: "Tutorial Completers Cohort",
    cohortSize: 8900,
    predictedLTV: 3.24,
    confidence: 0.78,
    lastUpdated: "4 hours ago",
    status: "completed"
  },
  {
    id: "3",
    name: "Level 12 Stuck Players",
    cohortSize: 3400,
    predictedLTV: 2.15,
    confidence: 0.71,
    lastUpdated: "6 hours ago",
    status: "completed"
  }
];

export function LTVResults({ predictions = samplePredictions }: { predictions?: PredictionResult[] }) {
  const [selectedPrediction, setSelectedPrediction] = useState<string>("1");
  const [chartRange, setChartRange] = useState<string>("7");
  
  const selectedPred = predictions.find(p => p.id === selectedPrediction);
  const chartData = generateChartData(parseInt(chartRange));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "running":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "failed":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Results Dashboard</h2>
        <p className="text-muted-foreground">
          View LTV prediction results and forecasts for your cohorts
        </p>
      </div>

      {/* Prediction Selection & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedPrediction} onValueChange={setSelectedPrediction}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Select prediction to view" />
            </SelectTrigger>
            <SelectContent>
              {predictions.map((pred) => (
                <SelectItem key={pred.id} value={pred.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{pred.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {pred.cohortSize.toLocaleString()} users • {pred.lastUpdated}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chartRange} onValueChange={setChartRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Selected Prediction Summary */}
      {selectedPred && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{selectedPred.name}</CardTitle>
                <CardDescription>
                  LTV prediction results and analysis
                </CardDescription>
              </div>
              <Badge className={getStatusColor(selectedPred.status)}>
                {selectedPred.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {selectedPred.cohortSize.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Cohort Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${selectedPred.predictedLTV}
                </div>
                <div className="text-sm text-muted-foreground">Predicted LTV</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(selectedPred.confidence * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {chartRange}
                </div>
                <div className="text-sm text-muted-foreground">Day Range</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4-Chart Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Cumulative LTV Forecast */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Cumulative LTV Forecast
            </CardTitle>
            <CardDescription>
              Predicted cumulative LTV over time with confidence intervals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'LTV ($)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'LTV']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="ciUpper"
                  stackId="1"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.1}
                  strokeWidth={0}
                />
                <Area
                  type="monotone"
                  dataKey="ciLower"
                  stackId="1"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.1}
                  strokeWidth={0}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeLTV"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Survival Probability */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Survival Probability
            </CardTitle>
            <CardDescription>
              Probability of user retention over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 1]} />
                <Tooltip 
                  formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Survival']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="survivalProb"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 3: Daily Expected Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Daily Expected Revenue
            </CardTitle>
            <CardDescription>
              Expected daily revenue per user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="dailyRevenue"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 4: Daily Incremental LTV */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Daily Incremental LTV
            </CardTitle>
            <CardDescription>
              Daily contribution to total LTV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Incremental']}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="incrementalLTV"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Insights</CardTitle>
          <CardDescription>
            Summary of prediction results and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Positive Indicators</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High survival probability in first week</li>
                <li>• Consistent daily revenue patterns</li>
                <li>• Strong cohort engagement metrics</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-orange-600">Areas of Concern</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Revenue decline after day 14</li>
                <li>• Lower confidence in long-term predictions</li>
                <li>• Seasonal variation in engagement</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Recommendations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Focus on week 2 retention campaigns</li>
                <li>• Optimize monetization for days 15-30</li>
                <li>• A/B test engagement features</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}