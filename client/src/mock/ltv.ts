// Mock LTV data for frontend-only implementation
import { addDays, format } from "date-fns";

export interface LTVSeries {
  name: string;
  points: { t: string; y: number }[];
  ciUpper?: number[];
  ciLower?: number[];
}

export interface LTVSimpleResponse {
  series: LTVSeries[];
  lastUpdated: string;
}

// Generate mock time series data
const generateTimeSeries = (days: number, baseValue: number, trend: number = 0) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(startDate, i);
    const noise = (Math.random() - 0.5) * 0.2;
    const trendValue = trend * (i / days);
    const value = baseValue + trendValue + noise;
    
    return {
      t: format(date, 'MMM dd'),
      y: Math.max(0, value)
    };
  });
};

// Generate confidence bands
const generateConfidenceBands = (points: { t: string; y: number }[], variance: number = 0.15) => {
  const ciUpper = points.map(p => p.y * (1 + variance));
  const ciLower = points.map(p => p.y * (1 - variance));
  return { ciUpper, ciLower };
};

export const mockLTVData = {
  getSimpleSeries: (
    metric: 'overall' | 'payer' = 'overall',
    range: '7d' | '14d' | '30d' | '60d' = '30d',
    platform?: string,
    geo?: string,
    tenure?: string,
    rank?: string,
    overlay: string[] = []
  ): LTVSimpleResponse => {
    const days = parseInt(range);
    const baseValue = metric === 'overall' ? 4.87 : 12.34;
    const trend = metric === 'overall' ? 0.5 : 1.2;
    
    const mainSeries = generateTimeSeries(days, baseValue, trend);
    const confidence = generateConfidenceBands(mainSeries);
    
    const series: LTVSeries[] = [
      {
        name: metric === 'overall' ? 'Overall LTV' : 'Payer LTV',
        points: mainSeries,
        ...confidence
      }
    ];

    // Add overlay series if requested
    if (overlay.includes('dau')) {
      series.push({
        name: 'DAU',
        points: generateTimeSeries(days, 24781, 1000)
      });
    }
    
    if (overlay.includes('arpu')) {
      series.push({
        name: 'ARPU',
        points: generateTimeSeries(days, 0.52, 0.05)
      });
    }
    
    if (overlay.includes('retention')) {
      series.push({
        name: 'D30 Retention',
        points: generateTimeSeries(days, 67.2, 2.1)
      });
    }

    return {
      series,
      lastUpdated: new Date().toISOString()
    };
  },

  getRunData: (runId: string) => ({
    id: runId,
    name: `LTV Prediction ${runId}`,
    cohortSize: 12847,
    predictedLTV90d: 4.87,
    confidence: 0.87,
    status: 'active',
    lastUpdated: '2 hours ago',
    freshness: 'up to date',
    drivers: [
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
      }
    ],
    comparison: [
      { cohort: 'All Users', predictedLTV: 4.12, actualToDate: 2.86, retention: 65.2 },
      { cohort: 'High Spenders', predictedLTV: 15.23, actualToDate: 12.87, retention: 89.4 }
    ],
    chart: {
      series: [
        {
          name: 'Predicted LTV',
          points: generateTimeSeries(30, 4.87, 0.5),
          ...generateConfidenceBands(generateTimeSeries(30, 4.87, 0.5))
        }
      ]
    }
  })
};