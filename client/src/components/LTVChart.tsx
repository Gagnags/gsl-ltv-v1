import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area } from "recharts";
import { RefreshCw, Plus } from "lucide-react";
import { mockLTVData, type LTVSeries } from "@/mock/ltv";

interface LTVChartProps {
  showFilters?: boolean;
  showOverlays?: boolean;
  initialMetric?: 'overall' | 'payer';
  initialRange?: '7d' | '14d' | '30d' | '60d';
  runData?: any;
  className?: string;
  combinedChart?: boolean;
  selectedMetric?: string;
  selectedRange?: string;
}

export const LTVChart = ({ 
  showFilters = true, 
  showOverlays = true,
  initialMetric = 'overall',
  initialRange = '30d',
  runData,
  className = "",
  combinedChart = false,
  selectedMetric,
  selectedRange
}: LTVChartProps) => {
  const [metric, setMetric] = useState<'overall' | 'payer'>(selectedMetric as 'overall' | 'payer' || initialMetric);
  const [range, setRange] = useState<'7d' | '14d' | '30d' | '60d'>(selectedRange as '7d' | '14d' | '30d' | '60d' || initialRange);
  const [platform, setPlatform] = useState<string>('all');
  const [geo, setGeo] = useState<string>('all');
  const [tenure, setTenure] = useState<string>('all');
  const [rank, setRank] = useState<string>('all');
  const [overlays, setOverlays] = useState<string[]>([]);
  const [showConfidence, setShowConfidence] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // Update metric and range when props change
  useEffect(() => {
    if (selectedMetric) setMetric(selectedMetric as 'overall' | 'payer');
    if (selectedRange) setRange(selectedRange as '7d' | '14d' | '30d' | '60d');
  }, [selectedMetric, selectedRange]);

  // Load user preferences from localStorage
  useEffect(() => {
    const prefs = localStorage.getItem('ltv.simple.prefs');
    if (prefs) {
      const parsed = JSON.parse(prefs);
      setMetric(parsed.metric || 'overall');
      setRange(parsed.range || '30d');
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('ltv.simple.prefs', JSON.stringify({ metric, range }));
  }, [metric, range]);

  // Generate combined chart data (actual + predicted)
  const generateCombinedData = () => {
    const days = range === '7d' ? 7 : range === '14d' ? 14 : range === '30d' ? 30 : 60;
    const actualDays = Math.floor(days * 0.7); // 70% actual, 30% predicted
    const predictedDays = days - actualDays;
    
    const data = [];
    
    // Generate actual LTV data (always increasing)
    let currentLTV = 2.5;
    for (let i = 0; i < actualDays; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (actualDays - i));
      data.push({
        time: date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }),
        actualLTV: currentLTV,
        type: 'actual'
      });
      currentLTV += (Math.random() * 0.3) + 0.1; // Always increase
    }
    
    // Generate predicted LTV data with confidence bands
    let predictedLTV = currentLTV;
    for (let i = 1; i <= predictedDays; i++) {
      const confidenceWidth = i * 0.15; // Confidence bands diverge over time
      const upperBound = predictedLTV + confidenceWidth + (Math.random() * 0.2);
      const lowerBound = Math.max(0, predictedLTV - confidenceWidth - (Math.random() * 0.2)); // Ensure lower bound doesn't go below 0
      
      data.push({
        time: `${i}`,
        predictedLTV: predictedLTV,
        ciUpper: upperBound,
        ciLower: lowerBound,
        type: 'predicted'
      });
      
      predictedLTV += (Math.random() * 0.4) + 0.2; // Always increase
    }
    
    return data;
  };

  // Fetch data when parameters change
  useEffect(() => {
    setLoading(true);
    
    if (combinedChart) {
      // Use combined chart data
      const combinedData = generateCombinedData();
      setData(combinedData);
    } else {
      // Use original logic
      const seriesData = runData ? runData.chart.series : mockLTVData.getSimpleSeries(
        metric, range, platform, geo, tenure, rank, overlays
      ).series;

      // Transform data for recharts
      const transformedData = seriesData[0].points.map((point: any, index: number) => {
        const dataPoint: any = {
          time: point.t,
          [seriesData[0].name]: point.y
        };

        // Add confidence bands if available and enabled
        if (showConfidence && seriesData[0].ciUpper && seriesData[0].ciLower) {
          dataPoint.ciUpper = seriesData[0].ciUpper[index];
          dataPoint.ciLower = seriesData[0].ciLower[index];
        }

        // Add overlay series
        seriesData.slice(1).forEach((series: LTVSeries) => {
          if (series.points[index]) {
            dataPoint[series.name] = series.points[index].y;
          }
        });

        return dataPoint;
      });

      setData(transformedData);
    }
    
    setLoading(false);
  }, [metric, range, platform, geo, tenure, rank, overlays, showConfidence, runData, combinedChart]);

  const handleOverlayToggle = (overlay: string) => {
    setOverlays(prev => 
      prev.includes(overlay) 
        ? prev.filter(o => o !== overlay)
        : [...prev, overlay]
    );
  };

  const getSeriesColor = (name: string) => {
    switch (name) {
      case 'Overall LTV':
      case 'actualLTV':
        return '#3b82f6'; // Blue for actual
      case 'Payer LTV':
      case 'predictedLTV':
        return '#f97316'; // Orange for predicted
      case 'ciUpper':
      case 'ciLower':
        return '#f97316'; // Orange for confidence bands
      default:
        return '#6b7280';
    }
  };

  // Render combined chart
  if (combinedChart) {
    return (
      <div className={`w-full ${className}`}>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#4b5563' }}
              axisLine={{ stroke: '#4b5563' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#4b5563' }}
              axisLine={{ stroke: '#4b5563' }}
              label={{ value: 'LTV ($)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#f9fafb'
              }}
            />
            
            {/* Confidence Interval Area - Both Upper and Lower */}
            {showConfidence && (
              <>
                <Area
                  dataKey="ciUpper"
                  stroke="none"
                  fill="#f97316"
                  fillOpacity={0.1}
                  strokeWidth={0}
                />
                <Area
                  dataKey="ciLower"
                  stroke="none"
                  fill="#f97316"
                  fillOpacity={0.1}
                  strokeWidth={0}
                />
              </>
            )}
            
            {/* Actual LTV Line */}
            <Line
              type="monotone"
              dataKey="actualLTV"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              connectNulls={false}
            />
            
            {/* Predicted LTV Line - Connected to Actual */}
            <Line
              type="monotone"
              dataKey="predictedLTV"
              stroke="#f97316"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Original chart rendering logic
  return (
    <div className={`w-full ${className}`}>
      {showFilters && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="metric">Metric:</Label>
              <Select value={metric} onValueChange={(value: 'overall' | 'payer') => setMetric(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall LTV</SelectItem>
                  <SelectItem value="payer">Payer LTV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="range">Range:</Label>
              <Select value={range} onValueChange={(value: '7d' | '14d' | '30d' | '60d') => setRange(value)}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7d</SelectItem>
                  <SelectItem value="14d">14d</SelectItem>
                  <SelectItem value="30d">30d</SelectItem>
                  <SelectItem value="60d">60d</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="platform">Platform:</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="geo">Region:</Label>
              <Select value={geo} onValueChange={setGeo}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="na">North America</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="ap">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="tenure">Tenure:</Label>
              <Select value={tenure} onValueChange={setTenure}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="returning">Returning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="rank">Rank:</Label>
              <Select value={rank} onValueChange={setRank}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="confidence"
                checked={showConfidence}
                onCheckedChange={setShowConfidence}
              />
              <Label htmlFor="confidence">Show Confidence Bands</Label>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOverlays([])}
                disabled={overlays.length === 0}
              >
                Clear Overlays
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Overlays:</span>
            {['Cohort Comparison', 'Seasonal Trends', 'External Events'].map((overlay) => (
              <Button
                key={overlay}
                variant={overlays.includes(overlay) ? "default" : "outline"}
                size="sm"
                onClick={() => handleOverlayToggle(overlay)}
              >
                {overlay}
              </Button>
            ))}
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
            label={{ value: 'LTV ($)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f9fafb'
            }}
          />
          
          {/* Confidence bands */}
          {showConfidence && data[0]?.ciUpper && data[0]?.ciLower && (
            <>
              <Line
                type="monotone"
                dataKey="ciUpper"
                stroke="#f97316"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="ciLower"
                stroke="#f97316"
                strokeWidth={1}
                strokeDasharray="3 3"
                dot={false}
                connectNulls={false}
              />
            </>
          )}
          
          {/* Main LTV line */}
          <Line
            type="monotone"
            dataKey={data[0] ? Object.keys(data[0]).find(key => key !== 'time' && key !== 'ciUpper' && key !== 'ciLower') : 'value'}
            stroke={getSeriesColor('Overall LTV')}
            strokeWidth={3}
            dot={{ fill: getSeriesColor('Overall LTV'), strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: getSeriesColor('Overall LTV'), strokeWidth: 2 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading chart data...</span>
        </div>
      )}
    </div>
  );
};