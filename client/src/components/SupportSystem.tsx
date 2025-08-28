import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HeadphonesIcon, 
  Plus, 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText
} from "lucide-react";

interface Ticket {
  id: string;
  type: string;
  priority: string;
  status: string;
  title: string;
  created: string;
}

const mockTickets: Ticket[] = [
  {
    id: "#123",
    type: "Bug",
    priority: "High",
    status: "Open",
    title: "Data export issue with large datasets",
    created: "2 days ago"
  },
  {
    id: "#122",
    type: "Feature Request",
    priority: "Medium", 
    status: "Closed",
    title: "Add custom date ranges to LTV charts",
    created: "1 week ago"
  },
  {
    id: "#121",
    type: "Question",
    priority: "Low",
    status: "In Progress",
    title: "How to set up custom cohort rules",
    created: "3 days ago"
  }
];

export default function SupportSystem() {
  const [issueType, setIssueType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!issueType || !priority || !description || !title) return;
    
    // Mock ticket creation
    console.log("Creating ticket:", { issueType, priority, description, title });
    
    // Reset form
    setIssueType("");
    setPriority("");
    setDescription("");
    setTitle("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-primary" />;
      case "Closed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <HeadphonesIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support</h1>
          <p className="text-muted-foreground">Get help and submit support requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Ticket */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Support Ticket
            </CardTitle>
            <CardDescription>
              Submit a bug report, feature request, or ask a question
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Brief description of your issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Type</label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="integration">Integration Help</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe your issue in detail. Include steps to reproduce if it's a bug."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full"
              disabled={!issueType || !priority || !description || !title}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Help Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Help Resources
            </CardTitle>
            <CardDescription>
              Find answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/help/getting-started">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Getting Started Guide
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/help/analytics">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Analytics Documentation
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/help/ltv">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  LTV Prediction Guide
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/help/api">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  API Reference
                </a>
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Contact Information</h4>
              <p className="text-sm text-muted-foreground">
                Email: support@ea.com
              </p>
              <p className="text-sm text-muted-foreground">
                Response time: 24-48 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
          <CardDescription>
            Track the status of your submitted tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  {getStatusIcon(ticket.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ticket.id}</span>
                      <Badge variant={getPriorityColor(ticket.priority) as any}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant="outline">{ticket.type}</Badge>
                    </div>
                    <p className="text-sm text-foreground mt-1">{ticket.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created {ticket.created}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    ticket.status === "Closed" ? "default" : 
                    ticket.status === "In Progress" ? "secondary" : "destructive"
                  }>
                    {ticket.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}