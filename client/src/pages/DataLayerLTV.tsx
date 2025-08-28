import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  CATEGORY_TO_SUBCATEGORIES,
  SUBCATEGORY_TO_PAYLOADS,
  type EventCategory,
  DEFAULT_EVENT_TAGS_STORAGE_KEY,
} from "./DataLayerLTV.constants";

interface EventTagDraft {
  tagName: string;
  category: EventCategory | "";
  subcategory: string;
  payloads: string[];
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

  function addCustomPayload(payload: string) {
    const val = payload.trim();
    if (!val) return;
    setDraft((d) => ({ ...d, payloads: Array.from(new Set([...(d.payloads ?? []), val])) }));
  }

  function removePayload(payload: string) {
    setDraft((d) => ({ ...d, payloads: (d.payloads ?? []).filter((p) => p !== payload) }));
  }

  function canSave() {
    return Boolean(draft.category && draft.subcategory && draft.tagName && draft.payloads.length > 0);
  }

  function saveTag() {
    if (!canSave()) return;
    setSavedTags((tags) => [...tags, draft]);
    toast({ title: "Event tag saved", description: `${draft.tagName} added.` });
    setDraft({ tagName: "", category: "", subcategory: "", payloads: [] });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Layer - LTV</h1>
          <p className="text-muted-foreground mt-1">Configure LTV-focused event tags and required payloads.</p>
        </div>
        <Button onClick={saveTag} disabled={!canSave()}>Save Event Tag</Button>
      </div>

      {/* Wizard */}
      <Card className="p-6 space-y-6">
        <Tabs defaultValue="mapping" className="space-y-6">
          <TabsList>
            <TabsTrigger value="mapping">1. Event Mapping</TabsTrigger>
            <TabsTrigger value="payloads" disabled={!draft.subcategory}>2. Payloads</TabsTrigger>
            <TabsTrigger value="review" disabled={!canSave()}>3. Review</TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Category</Label>
                <select className="w-full mt-1 border rounded px-3 py-2 bg-background" value={draft.category}
                        onChange={(e) => update("category", e.target.value as EventCategory)}>
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Other">Other…</option>
                </select>
              </div>

              <div>
                <Label>Subcategory</Label>
                <select className="w-full mt-1 border rounded px-3 py-2 bg-background" value={draft.subcategory}
                        onChange={(e) => update("subcategory", e.target.value)} disabled={!draft.category}>
                  <option value="">Select subcategory</option>
                  {subcategories.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Tag name</Label>
                <Input className="mt-1" value={draft.tagName} onChange={(e) => update("tagName", e.target.value)} placeholder="e.g., subscription_billed" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payloads" className="space-y-4">
            <div>
              <Label>Recommended payloads</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(SUBCATEGORY_TO_PAYLOADS[draft.subcategory] ?? []).map((p) => (
                  <Badge key={p} variant={draft.payloads.includes(p) ? "default" : "secondary"} className="cursor-pointer"
                    onClick={() => {
                      if (draft.payloads.includes(p)) removePayload(p);
                      else addCustomPayload(p);
                    }}>
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <Label>Add additional payload</Label>
                <Input id="customPayload" placeholder="Enter payload key (e.g., custom_attribute)" onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    addCustomPayload(target.value);
                    target.value = "";
                  }
                }} />
              </div>
              <Button onClick={() => {
                const input = document.getElementById("customPayload") as HTMLInputElement | null;
                if (input && input.value) {
                  addCustomPayload(input.value);
                  input.value = "";
                }
              }}>Add</Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {draft.payloads.map((p) => (
                <Badge key={p} className="cursor-pointer" onClick={() => removePayload(p)}>
                  {p}
                </Badge>
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
              <Label>Payloads</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {draft.payloads.length ? draft.payloads.map((p) => <Badge key={p}>{p}</Badge>) : <span className="text-sm text-muted-foreground">None</span>}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Configured tags list */}
      <Card className="p-6">
        <h2 className="font-semibold mb-3">Configured LTV Event Tags</h2>
        {savedTags.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tags yet. Configure one above.</p>
        ) : (
          <div className="space-y-2">
            {savedTags.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between border rounded px-3 py-2">
                <div>
                  <div className="font-medium">{t.tagName}</div>
                  <div className="text-xs text-muted-foreground">{t.category} → {t.subcategory}</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {t.payloads.map((p) => <Badge key={p} variant="secondary">{p}</Badge>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
} 