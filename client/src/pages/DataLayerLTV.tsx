import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  CATEGORY_TO_SUBCATEGORIES,
  SUBCATEGORY_TO_PAYLOADS,
  SAMPLE_GTM_DATA,
  type EventCategory,
  type ValueType,
  type PayloadDefinition,
  DEFAULT_EVENT_TAGS_STORAGE_KEY,
} from "./DataLayerLTV.constants";
import { Download, Upload, Database, Tag } from "lucide-react";

interface EventTagDraft {
  tagName: string;
  category: EventCategory | "";
  subcategory: string;
  payloads: Array<{
    name: string;
    valueType: ValueType;
  }>;
}

export default function DataLayerLTV() {
  const [draft, setDraft] = useState<EventTagDraft>({
    tagName: "",
    category: "",
    subcategory: "",
    payloads: [],
  });
  const [savedTags, setSavedTags] = useState<EventTagDraft[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(DEFAULT_EVENT_TAGS_STORAGE_KEY);
    if (raw) setSavedTags(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(DEFAULT_EVENT_TAGS_STORAGE_KEY, JSON.stringify(savedTags));
  }, [savedTags]);

  const categories = useMemo(() => Object.keys(CATEGORY_TO_SUBCATEGORIES) as EventCategory[], []);
  const subcategories = useMemo(() => {
    if (!draft.category) return [] as string[];
    return CATEGORY_TO_SUBCATEGORIES[draft.category as EventCategory] ?? [];
  }, [draft.category]);

  useEffect(() => {
    if (draft.subcategory) {
      const recommended = SUBCATEGORY_TO_PAYLOADS[draft.subcategory] ?? [];
      setDraft((d) => ({ ...d, payloads: recommended }));
      if (!draft.tagName) {
        setDraft((d) => ({ ...d, tagName: draft.subcategory }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.subcategory]);

  function update<K extends keyof EventTagDraft>(key: K, value: EventTagDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function updatePayloadValueType(payloadName: string, newValueType: ValueType) {
    setDraft((d) => ({
      ...d,
      payloads: d.payloads.map((p) =>
        p.name === payloadName ? { ...p, valueType: newValueType } : p
      ),
    }));
  }

  function addCustomPayload(payload: string) {
    const val = payload.trim();
    if (!val) return;
    setDraft((d) => ({
      ...d,
      payloads: Array.from(
        new Set([...(d.payloads ?? []), { name: val, valueType: "String" as ValueType }])
      ),
    }));
  }

  function removePayload(payloadName: string) {
    setDraft((d) => ({
      ...d,
      payloads: (d.payloads ?? []).filter((p) => p.name !== payloadName),
    }));
  }

  function canSave() {
    return Boolean(
      draft.category && draft.subcategory && draft.tagName && draft.payloads.length > 0
    );
  }

  function saveTag() {
    if (!canSave()) return;
    setSavedTags((tags) => [...tags, draft]);
    toast({ title: "Event tag saved", description: `${draft.tagName} added.` });
    setDraft({ tagName: "", category: "", subcategory: "", payloads: [] });
  }

  function importFromGTM() {
    setSavedTags((tags) => [...tags, ...SAMPLE_GTM_DATA]);
    toast({
      title: "GTM Import Complete",
      description: `Imported ${SAMPLE_GTM_DATA.length} event tags from Google Tag Manager.`,
    });
  }

  function exportTags() {
    const dataStr = JSON.stringify(savedTags, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ltv-event-tags.json";
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Complete", description: "Event tags exported to JSON file." });
  }

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Layer - LTV</h1>
          <p className="text-muted-foreground mt-1">
            Configure LTV-focused event tags and required payloads with data types.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={importFromGTM}>
            <Upload className="w-4 h-4 mr-2" />
            Import from GTM
          </Button>
          <Button variant="outline" onClick={exportTags} disabled={savedTags.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export Tags
          </Button>
          <Button onClick={saveTag} disabled={!canSave()}>
            Save Event Tag
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Wizard */}
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-6">
            <Tabs defaultValue="mapping" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mapping">1. Event Mapping</TabsTrigger>
                <TabsTrigger value="payloads" disabled={!draft.subcategory}>
                  2. Payloads
                </TabsTrigger>
                <TabsTrigger value="review" disabled={!canSave()}>
                  3. Review
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mapping" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select value={draft.category} onValueChange={(value) => update("category", value as EventCategory)}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Subcategory</Label>
                    <Select value={draft.subcategory} onValueChange={(value) => update("subcategory", value)} disabled={!draft.category}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tag name</Label>
                    <Input
                      className="mt-1"
                      value={draft.tagName}
                      onChange={(e) => update("tagName", e.target.value)}
                      placeholder="e.g., subscription_billed"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payloads" className="space-y-4">
                <div>
                  <Label>Recommended payloads with data types</Label>
                  <div className="mt-2 space-y-2">
                    {(SUBCATEGORY_TO_PAYLOADS[draft.subcategory] ?? []).map((payload) => (
                      <div key={payload.name} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{payload.name}</Badge>
                          <Select
                            value={payload.valueType}
                            onValueChange={(value) => updatePayloadValueType(payload.name, value as ValueType)}
                          >
                            <SelectTrigger className="w-20 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="String">String</SelectItem>
                              <SelectItem value="Int">Int</SelectItem>
                              <SelectItem value="Float">Float</SelectItem>
                              <SelectItem value="Date">Date</SelectItem>
                              <SelectItem value="String(optional)">Optional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePayload(payload.name)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <Label>Add additional payload</Label>
                    <Input
                      id="customPayload"
                      placeholder="Enter payload key (e.g., custom_attribute)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const target = e.target as HTMLInputElement;
                          addCustomPayload(target.value);
                          target.value = "";
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const input = document.getElementById("customPayload") as HTMLInputElement | null;
                      if (input && input.value) {
                        addCustomPayload(input.value);
                        input.value = "";
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  {draft.payloads
                    .filter((p) => !SUBCATEGORY_TO_PAYLOADS[draft.subcategory]?.some((rp) => rp.name === p.name))
                    .map((p) => (
                      <div key={p.name} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{p.name}</Badge>
                          <Select
                            value={p.valueType}
                            onValueChange={(value) => updatePayloadValueType(p.name, value as ValueType)}
                          >
                            <SelectTrigger className="w-20 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="String">String</SelectItem>
                              <SelectItem value="Int">Int</SelectItem>
                              <SelectItem value="Float">Float</SelectItem>
                              <SelectItem value="Date">Date</SelectItem>
                              <SelectItem value="String(optional)">Optional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePayload(p.name)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="review" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Category</Label>
                    <p className="mt-1 text-sm">{draft.category || "—"}</p>
                  </div>
                  <div>
                    <Label>Subcategory</Label>
                    <p className="mt-1 text-sm">{draft.subcategory || "—"}</p>
                  </div>
                  <div>
                    <Label>Tag name</Label>
                    <p className="mt-1 text-sm">{draft.tagName || "—"}</p>
                  </div>
                </div>
                <div>
                  <Label>Payloads with Data Types</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {draft.payloads.length ? (
                      draft.payloads.map((p) => (
                        <Badge key={p.name} variant="secondary">
                          {p.name}: {p.valueType}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">None</span>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Column - Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="w-5 h-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Tags</span>
                <span className="font-semibold">{savedTags.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Categories</span>
                <span className="font-semibold">
                  {new Set(savedTags.map((t) => t.category)).size}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Payloads</span>
                <span className="font-semibold">
                  {savedTags.reduce((sum, tag) => sum + tag.payloads.length, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full" onClick={importFromGTM}>
                <Upload className="w-4 h-4 mr-2" />
                Import from GTM
              </Button>
              <Button variant="outline" className="w-full" onClick={exportTags} disabled={savedTags.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export All Tags
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Configured tags list */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Configured LTV Event Tags</h2>
          <Badge variant="secondary">{savedTags.length} tags</Badge>
        </div>
        {savedTags.length === 0 ? (
          <div className="text-center py-8">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No tags configured yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start by adding an event tag above, or import from Google Tag Manager.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedTags.map((tag, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-lg">{tag.tagName}</div>
                    <div className="text-sm text-muted-foreground">
                      {tag.category} → {tag.subcategory}
                    </div>
                  </div>
                  <Badge variant="outline">{tag.payloads.length} payloads</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tag.payloads.map((payload) => (
                    <Badge key={payload.name} variant="secondary">
                      {payload.name}: {payload.valueType}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
} 