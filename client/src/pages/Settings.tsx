import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings as SettingsIcon,
  Users,
  Shield,
  Database,
  Key,
  Activity,
  Bell,
  Mail,
  Slack,
  Webhook,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Copy
} from "lucide-react";

export default function Settings() {
  const [showApiKey, setShowApiKey] = useState(false);

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@gamestate.com",
      role: "Admin",
      status: "active",
      lastSeen: "2 hours ago"
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike@gamestate.com", 
      role: "Analyst",
      status: "active",
      lastSeen: "30 minutes ago"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa@gamestate.com",
      role: "PM",
      status: "active", 
      lastSeen: "1 day ago"
    },
    {
      id: 4,
      name: "Tom Wilson",
      email: "tom@gamestate.com",
      role: "LiveOps",
      status: "inactive",
      lastSeen: "1 week ago"
    }
  ];

  // Mock data sources
  const dataSources = [
    {
      id: 1,
      name: "Game Events API",
      type: "REST API",
      status: "connected",
      lastSync: "2 minutes ago",
      health: "healthy"
    },
    {
      id: 2,
      name: "User Attributes DB",
      type: "PostgreSQL",
      status: "connected", 
      lastSync: "5 minutes ago",
      health: "healthy"
    },
    {
      id: 3,
      name: "Purchase Events",
      type: "Webhook",
      status: "connected",
      lastSync: "1 minute ago", 
      health: "healthy"
    },
    {
      id: 4,
      name: "Legacy Analytics",
      type: "CSV Import",
      status: "disconnected",
      lastSync: "2 days ago",
      health: "error"
    }
  ];

  // Mock audit logs
  const auditLogs = [
    {
      id: 1,
      action: "User login",
      user: "sarah@gamestate.com",
      timestamp: "2024-08-16 10:30:00",
      details: "Successful login from 192.168.1.100"
    },
    {
      id: 2,
      action: "Cohort created",
      user: "mike@gamestate.com", 
      timestamp: "2024-08-16 09:45:00",
      details: "Created cohort 'High-Value Spenders'"
    },
    {
      id: 3,
      action: "Data export",
      user: "lisa@gamestate.com",
      timestamp: "2024-08-16 08:15:00",
      details: "Exported player data (1,234 records)"
    },
    {
      id: 4,
      action: "Alert triggered",
      user: "system",
      timestamp: "2024-08-16 07:22:00", 
      details: "DAU anomaly alert sent to #analytics"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-destructive/10 text-destructive';
      case 'analyst': return 'bg-primary/10 text-primary';
      case 'pm': return 'bg-accent-purple/10 text-accent-purple';
      case 'liveops': return 'bg-accent-cyan/10 text-accent-cyan';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-success' : 'text-muted-foreground';
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage users, data sources, security, and system configuration
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite User
            </Button>
          </div>

          <Card className="bg-card border-card-border">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {users.map((user) => (
                  <div key={user.id} className="p-6 hover:bg-surface-elevated transition-smooth">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-success' : 'bg-muted'}`}></div>
                          <span className={`text-sm ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          Last seen {user.lastSeen}
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Role Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium">
                  <div>Permission</div>
                  <div className="text-center">Admin</div>
                  <div className="text-center">Analyst</div>
                  <div className="text-center">PM</div>
                  <div className="text-center">LiveOps</div>
                </div>
                
                <div className="divide-y divide-border space-y-3">
                  <div className="grid grid-cols-5 gap-4 items-center py-2">
                    <div className="text-sm">View all data</div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 items-center py-2">
                    <div className="text-sm">Create cohorts</div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 items-center py-2">
                    <div className="text-sm">Manage playbooks</div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center">-</div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 items-center py-2">
                    <div className="text-sm">Admin settings</div>
                    <div className="text-center"><CheckCircle className="w-4 h-4 text-success mx-auto" /></div>
                    <div className="text-center">-</div>
                    <div className="text-center">-</div>
                    <div className="text-center">-</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          {/* Data Sources */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Data Sources</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Source
            </Button>
          </div>

          <div className="grid gap-4">
            {dataSources.map((source) => (
              <Card key={source.id} className="bg-card border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Database className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{source.name}</h3>
                        <p className="text-sm text-muted-foreground">{source.type}</p>
                      </div>
                      <Badge variant={source.status === 'connected' ? 'default' : 'secondary'}>
                        {source.status}
                      </Badge>
                      <div className={`flex items-center gap-2 ${getHealthColor(source.health)}`}>
                        {source.health === 'healthy' && <CheckCircle className="w-4 h-4" />}
                        {source.health === 'warning' && <AlertTriangle className="w-4 h-4" />}
                        {source.health === 'error' && <AlertTriangle className="w-4 h-4" />}
                        <span className="text-sm capitalize">{source.health}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        Last sync: {source.lastSync}
                      </span>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* API Keys */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg">
                <div>
                  <p className="font-medium">Production API Key</p>
                  <p className="text-sm text-muted-foreground">Full access to all endpoints</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-mono text-sm bg-muted p-2 rounded">
                    {showApiKey ? 'gs_prod_1234567890abcdef...' : '••••••••••••••••'}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Generate New Key
              </Button>
            </CardContent>
          </Card>

          {/* Data Masking */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Data Masking & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable PII masking by default</p>
                  <p className="text-sm text-muted-foreground">Automatically mask email addresses and personal identifiers</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require access approval for unmasked data</p>
                  <p className="text-sm text-muted-foreground">Users must request permission to view unmasked PII</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Log all data access attempts</p>
                  <p className="text-sm text-muted-foreground">Maintain detailed audit trail of data usage</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Channels */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">alerts@gamestate.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-success">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg">
                <div className="flex items-center gap-3">
                  <Slack className="w-5 h-5 text-accent-purple" />
                  <div>
                    <p className="font-medium">Slack Integration</p>
                    <p className="text-sm text-muted-foreground">#analytics, #alerts</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-success">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg">
                <div className="flex items-center gap-3">
                  <Webhook className="w-5 h-5 text-accent-cyan" />
                  <div>
                    <p className="font-medium">Webhook Endpoints</p>
                    <p className="text-sm text-muted-foreground">3 endpoints configured</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-success">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alert notifications</p>
                  <p className="text-sm text-muted-foreground">Threshold breaches and anomalies</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Playbook execution results</p>
                  <p className="text-sm text-muted-foreground">Success, failure, and warning notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data quality issues</p>
                  <p className="text-sm text-muted-foreground">Schema changes and quality degradation</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly summary reports</p>  
                  <p className="text-sm text-muted-foreground">Key metrics and insights digest</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          {/* Audit Logs */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Audit Trail</h2>
            <div className="flex items-center gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="data">Data Access</SelectItem>
                  <SelectItem value="admin">Admin Actions</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Export Logs</Button>
            </div>
          </div>

          <Card className="bg-card border-card-border">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-surface-elevated transition-smooth">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Activity className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">{log.details}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium">{log.user}</p>
                        <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}