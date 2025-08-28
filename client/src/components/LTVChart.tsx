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
  initialRange?: '14d' | '30d' | '60d';
  runData?: any;
  className?: string;
}

export const LTVChart = ({ 
  showFilters = true, 
  showOverlays = true,
  initialMetric = 'overall',
  initialRange = '30d',
  runData,
  className = ""
}: LTVChartProps) => {
  const [metric, setMetric] = useState<'overall' | 'payer'>(initialMetric);
  const [range, setRange] = useState<'14d' | '30d' | '60d'>(initialRange);
  const [platform, setPlatform] = useState<string>('all');
  const [geo, setGeo] = useState<string>('all');
  const [tenure, setTenure] = useState<string>('all');
  const [rank, setRank] = useState<string>('all');
  const [overlays, setOverlays] = useState<string[]>([]);
  const [showConfidence, setShowConfidence] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

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

  // Fetch data when parameters change
  useEffect(() => {
    setLoading(true);
    
    // Use run data if provided, otherwise fetch simple series
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
    setLoading(false);
  }, [metric, range, platform, geo, tenure, rank, overlays, showConfidence, runData]);

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
      case 'Predicted LTV':
        return 'hsl(var(--primary))';
      case 'Payer LTV':
        return 'hsl(var(--accent-cyan))';
      case 'DAU':
        return 'hsl(var(--success))';
      case 'ARPU':
        return 'hsl(var(--warning))';
      case 'D30 Retention':
        return 'hsl(var(--accent-purple))';
      default:
        return 'hsl(var(--muted-foreground))';
    }
  };

  const primarySeries = runData ? 'Predicted LTV' : (metric === 'overall' ? 'Overall LTV' : 'Payer LTV');

  return (
    <Card className={className}>
      {/* Controls */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">LTV Trends</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Metric Toggle */}
          {!runData && (
            <div className="flex items-center gap-2">
              <Label className="text-sm">Metric:</Label>
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={metric === 'overall' ? 'default' : 'ghost'}
                  size="sm"
                  className="h-7"
                  onClick={() => setMetric('overall')}
                >
                  Overall LTV
                </Button>
                <Button
                  variant={metric === 'payer' ? 'default' : 'ghost'}
                  size="sm" 
                  className="h-7"
                  onClick={() => setMetric('payer')}
                >
                  Payer LTV
                </Button>
              </div>
            </div>
          )}

          {/* Range Toggle */}
          <div className="flex items-center gap-2">
            <Label className="text-sm">Range:</Label>
            <div className="flex bg-muted rounded-lg p-1">
              {['14d', '30d', '60d'].map((r) => (
                <Button
                  key={r}
                  variant={range === r ? 'default' : 'ghost'}
                  size="sm"
                  className="h-7"
                  onClick={() => setRange(r as any)}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          {/* Confidence Band Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              checked={showConfidence}
              onCheckedChange={setShowConfidence}
              id="confidence"
            />
            <Label htmlFor="confidence" className="text-sm">Confidence Band</Label>
          </div>

          {/* Overlay Controls */}
          {showOverlays && (
            <div className="flex items-center gap-2">
              <Label className="text-sm">Combine with:</Label>
              <div className="flex gap-2">
                {['dau', 'arpu', 'retention'].map((overlay) => (
                  <Button
                    key={overlay}
                    variant={overlays.includes(overlay) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleOverlayToggle(overlay)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {overlay.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        {showFilters && !runData && (
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="android">Android</SelectItem>
              </SelectContent>
            </Select>

            <Select value={geo} onValueChange={setGeo}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tenure} onValueChange={setTenure}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Tenure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="new">New (&lt;7d)</SelectItem>
                <SelectItem value="medium">7-30d</SelectItem>
                <SelectItem value="veteran">Veteran (&gt;30d)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={rank} onValueChange={setRank}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Game Rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranks</SelectItem>
                <SelectItem value="top10">Top 10%</SelectItem>
                <SelectItem value="mid">10-50%</SelectItem>
                <SelectItem value="bottom">50%+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="p-4">
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              
              {/* Confidence Band */}
              {showConfidence && data[0]?.ciUpper && (
                <Area
                  dataKey="ciUpper"
                  stroke="none"
                  fill={getSeriesColor(primarySeries)}
                  fillOpacity={0.1}
                />
              )}

              {/* Main LTV Line */}
              <Line
                type="monotone"
                dataKey={primarySeries}
                stroke={getSeriesColor(primarySeries)}
                strokeWidth={2}
                dot={false}
              />

              {/* Overlay Lines */}
              {overlays.map((overlay) => {
                const name = overlay === 'dau' ? 'DAU' : overlay === 'arpu' ? 'ARPU' : 'D30 Retention';
                return (
                  <Line
                    key={overlay}
                    type="monotone"
                    dataKey={name}
                    stroke={getSeriesColor(name)}
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                );
              })}
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {/* Chart Footer */}
        {runData && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
            <Badge variant="secondary">
              Cohort Size: {runData.cohortSize.toLocaleString()}
            </Badge>
            <Badge variant="outline">
              {runData.freshness}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};