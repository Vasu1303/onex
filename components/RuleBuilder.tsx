"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { Eye, FileCheck2Icon } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const operators = ["equals", "contains", ">", "<", ">=", "<="];

type Rule = {
  field: string;
  operator: string;
  value: string;
};

export default function RuleBuilder() {
  const [preview, setPreview] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isCountVisible, setIsCountVisible] = useState(false);
  const [segmentName, setSegmentName] = useState("");

  const [isCreatingSegment, setIsCreatingSegment] = useState(false);

  const [rules, setRules] = useState<Rule[]>([
    { field: "", operator: "", value: "" },
  ]);
  const [fields, setFields] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch("/api/getFields");
        const data = await res.json();

        setFields(data);
      } catch (error) {
        console.log("Failed to fetch", error);
      }
    };
    fetchFields();
  }, []);
  const [combinator, setCombinator] = useState<"AND" | "OR">("AND");
  const [matchedCount, setMatchedCount] = useState<number | null>(null);

  const updateRule = (index: number, key: keyof Rule, value: string) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    setRules(newRules);
  };

  const addRule = () => {
    setRules([...rules, { field: "", operator: "", value: "" }]);
  };

  const removeRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleSubmit = async () => {
    const validRules = rules.filter(
      (rule) => rule.field && rule.operator && rule.value
    );

    if (validRules.length === 0) {
      toast("Please add at least one complete rule");
      return;
    }

    if (!segmentName.trim()) {
      toast("Please enter a segment name");
      return;
    }

    setIsPreviewLoading(true);
    setIsCountVisible(false); 
    setPreview(!preview);

    const queryObject = {
      combinator,
      rules: validRules,
      segment_name: segmentName.trim(),
    };

    try {
    

      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryObject),
      });

      if (!res.ok) {
        throw new Error("Query failed");
      }

      const data = await res.json();
      console.log("Matched customers:", data.matchCount);
      setMatchedCount(data.matchCount);

      

      setIsCountVisible(true);
    } catch (error) {
      console.error("Query failed:", error);
      toast("Failed to process query");
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleCreateSegment = async () => {
    setIsCreatingSegment(true);
    try {
      const res = await fetch("/api/segments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          segment_name: segmentName,
          rules,
          combinator,
          size: matchedCount,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
      const data = await res.json();
      console.log("Segment Saved", data.message);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsCreatingSegment(false);
      router.push("/segment");
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600  to-blue-400 bg-clip-text text-transparent">
          Rule Builder
        </h1>
        <p className="text-gray-500 mt-2">
          Create custom segments based on your rules
        </p>
      </div>

      <div className="space-y-6 bg-white/5 p-6 rounded-lg backdrop-blur-sm">
        <div className="space-y-2">
          <Label className="text-lg">Segment Name</Label>
          <Input
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Enter Segment Name"
            className="mt-2 h-12 text-lg"
          />
        </div>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg transition-all hover:bg-white/10"
              key={index}
            >
              <Select onValueChange={(val) => updateRule(index, "field", val)}>
                <SelectTrigger className="w-[180px] h-12">
                  <SelectValue placeholder="Select Field" />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(val) => updateRule(index, "operator", val)}
              >
                <SelectTrigger className="w-[150px] h-12">
                  <SelectValue placeholder="Operator" />
                </SelectTrigger>
                <SelectContent>
                  {operators.map((op) => (
                    <SelectItem key={op} value={op}>
                      {op}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Value"
                className="w-[200px] h-12"
                onChange={(e) => updateRule(index, "value", e.target.value)}
              />

              <Button
                variant="ghost"
                onClick={() => removeRule(index)}
                className="bg-red-500/20 hover:bg-red-500/10 hover:text-red-500"
              >
                ❌
              </Button>
            </div>
          ))}
        </div>

       
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
          <Label htmlFor="combinator" className="text-lg">
            Combinator
          </Label>
          <Switch
            id="combinator"
            checked={combinator === "AND"}
            onCheckedChange={(checked) => setCombinator(checked ? "AND" : "OR")}
          />
          <span className="text-lg font-medium">{combinator}</span>
        </div>

      
        {matchedCount !== null && (
          <div
            className={`p-6 bg-slate-300 rounded-lg transition-all duration-500 ease-out ${
              isCountVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform -translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-xl font-bold">
                  {matchedCount} Matched Customers
                </p>
                <p className="text-sm text-gray-400">
                  Based on your current rule set
                </p>
              </div>
            </div>
          </div>
        )}

      
        <div className="flex gap-4 pt-4">
          <Button onClick={addRule} className="bg-blue-500 hover:bg-blue-600">
            + Add Rule
          </Button>

          <Button
            variant="secondary"
            onClick={handleSubmit}
            disabled={isPreviewLoading}
            className="min-w-[150px] hover:bg-slate-200"
          >
            <Eye />

            {isPreviewLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Show Preview"
            )}
          </Button>

          <Button
            disabled={!segmentName.trim() || isCreatingSegment}
            onClick={handleCreateSegment}
            className="bg-purple-500 hover:bg-purple-600 min-w-[150px]"
          >
            <FileCheck2Icon />
            {isCreatingSegment ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </>
            ) : (
              "Create Segment"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
