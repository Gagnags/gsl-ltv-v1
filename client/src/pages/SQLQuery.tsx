import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Database, 
  Play, 
  Download, 
  Save, 
  History, 
  Table, 
  BarChart3,
  LineChart,
  FileText
} from "lucide-react";

// Mock schema data
const mockSchemas = [
  {
    table: "player_events",
    columns: [
      { name: "player_id", type: "VARCHAR", description: "Unique player identifier" },
      { name: "event_name", type: "VARCHAR", description: "Event type (login, purchase, etc.)" },
      { name: "event_time", type: "TIMESTAMP", description: "When the event occurred" },
      { name: "session_id", type: "VARCHAR", description: "Session identifier" },
      { name: "platform", type: "VARCHAR", description: "iOS, Android, Web" },
      { name: "properties", type: "JSON", description: "Event-specific properties" }
    ]
  },
  {
    table: "player_profiles",
    columns: [
      { name: "player_id", type: "VARCHAR", description: "Unique player identifier" },
      { name: "created_at", type: "TIMESTAMP", description: "Account creation date" },
      { name: "country", type: "VARCHAR", description: "Player's country" },
      { name: "xp_level", type: "INTEGER", description: "Current XP level" },
      { name: "total_sessions", type: "INTEGER", description: "Total session count" },
      { name: "total_revenue", type: "DECIMAL", description: "Total IAP revenue" }
    ]
  },
  {
    table: "sessions",
    columns: [
      { name: "session_id", type: "VARCHAR", description: "Unique session identifier" },
      { name: "player_id", type: "VARCHAR", description: "Player who owned the session" },
      { name: "start_time", type: "TIMESTAMP", description: "Session start time" },
      { name: "end_time", type: "TIMESTAMP", description: "Session end time" },
      { name: "duration_seconds", type: "INTEGER", description: "Session length in seconds" }
    ]
  }
];

const mockResults = [
  { player_id: "p_001", session_count: 12, total_revenue: 24.99, country: "US" },
  { player_id: "p_002", session_count: 8, total_revenue: 0.00, country: "CA" },
  { player_id: "p_003", session_count: 24, total_revenue: 89.97, country: "UK" },
  { player_id: "p_004", session_count: 3, total_revenue: 4.99, country: "DE" },
  { player_id: "p_005", session_count: 16, total_revenue: 39.98, country: "FR" }
];

const sampleQueries = [
  {
    name: "Top Spenders Last 30 Days",
    query: `SELECT 
  player_id,
  SUM(CAST(properties->>'amount' AS DECIMAL)) as total_spent,
  COUNT(*) as purchase_count
FROM player_events 
WHERE event_name = 'purchase' 
  AND event_time >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY player_id
ORDER BY total_spent DESC
LIMIT 10;`
  },
  {
    name: "Daily Active Users Trend",
    query: `SELECT 
  DATE(event_time) as date,
  COUNT(DISTINCT player_id) as dau
FROM player_events
WHERE event_name = 'session_start'
  AND event_time >= CURRENT_DATE - INTERVAL '14 days'
GROUP BY DATE(event_time)
ORDER BY date;`
  },
  {
    name: "Retention Analysis",
    query: `WITH first_sessions AS (
  SELECT player_id, MIN(DATE(event_time)) as first_date
  FROM player_events 
  WHERE event_name = 'session_start'
  GROUP BY player_id
)
SELECT 
  fs.first_date,
  COUNT(DISTINCT fs.player_id) as new_players,
  COUNT(DISTINCT CASE WHEN DATE(pe.event_time) = fs.first_date + 1 THEN fs.player_id END) as d1_retained
FROM first_sessions fs
LEFT JOIN player_events pe ON fs.player_id = pe.player_id AND pe.event_name = 'session_start'
GROUP BY fs.first_date
ORDER BY fs.first_date DESC;`
  }
];

export default function SQLQuery() {
  const [query, setQuery] = useState("SELECT * FROM player_events LIMIT 10;");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultView, setResultView] = useState<"table" | "chart">("table");

  const runQuery = async () => {
    setLoading(true);
    
    // Mock query execution
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  };

  const exportResults = (format: "csv" | "json") => {
    const dataStr = format === "csv" 
      ? results.map(row => Object.values(row).join(',')).join('\n')
      : JSON.stringify(results, null, 2);
    
    const blob = new Blob([dataStr], { type: format === "csv" ? "text/csv" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query_results.${format}`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Custom SQL Query</h1>
            <p className="text-muted-foreground">Execute custom queries against your game data</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            Query History
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Query
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Schema Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Table className="w-5 h-5" />
                Database Schema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSchemas.map((schema) => (
                <div key={schema.table} className="space-y-2">
                  <h4 className="font-medium text-primary cursor-pointer hover:underline">
                    {schema.table}
                  </h4>
                  <div className="space-y-1 ml-2">
                    {schema.columns.slice(0, 3).map((col) => (
                      <div key={col.name} className="text-sm">
                        <span className="font-mono text-foreground">{col.name}</span>
                        <span className="text-muted-foreground ml-2">({col.type})</span>
                      </div>
                    ))}
                    {schema.columns.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{schema.columns.length - 3} more columns
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sample Queries */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Sample Queries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sampleQueries.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setQuery(sample.query)}
                >
                  <div>
                    <div className="font-medium text-sm">{sample.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Click to load query
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Query Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Query Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">SQL Editor</CardTitle>
                <Button onClick={runQuery} disabled={loading}>
                  <Play className="w-4 h-4 mr-2" />
                  {loading ? "Running..." : "Run Query"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-48 p-4 border border-border rounded-lg bg-muted/30 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your SQL query here..."
              />
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Use ↑/↓ arrows for query history
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {query.trim().split('\n').length} lines
                  </Badge>
                  <Badge variant="outline">
                    {query.length} characters
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Query Results</CardTitle>
                <div className="flex items-center gap-2">
                  <Tabs value={resultView} onValueChange={(v) => setResultView(v as any)}>
                    <TabsList>
                      <TabsTrigger value="table">
                        <Table className="w-4 h-4 mr-1" />
                        Table
                      </TabsTrigger>
                      <TabsTrigger value="chart">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Chart
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {results.length > 0 && (
                    <>
                      <Separator orientation="vertical" className="h-6" />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => exportResults("csv")}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        CSV
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => exportResults("json")}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        JSON
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="default">
                      {results.length} rows returned
                    </Badge>
                    <Badge variant="outline">
                      Query executed in 0.23s
                    </Badge>
                  </div>
                  
                  {resultView === "table" ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border">
                        <thead>
                          <tr className="bg-muted/50">
                            {Object.keys(results[0]).map((key) => (
                              <th key={key} className="border border-border p-2 text-left font-medium">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((row, index) => (
                            <tr key={index} className="hover:bg-muted/30">
                              {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} className="border border-border p-2 font-mono text-sm">
                                  {String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center border border-border rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Chart visualization coming soon</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <Database className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Run a query to see results</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}