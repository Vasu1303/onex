"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { PlusIcon } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface Segment {
  segment_name: string;
  rules: Array<{
    field: string;
    operator: string;
    value: string;
  }>;

  combinator: string;
  _id: string;
  size: number;
}
const ShowSegment = () => {
  const router = useRouter();
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    const fetchSegments = async () => {
      const res = await fetch("/api/segments");
      const data = await res.json();
      setSegments(data.data);
    };

    fetchSegments();
  }, []);
  const handlePreview = (segmentId: string) => {
    router.push("/segment/" + segmentId);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8"> 
        <h1 className="text-2xl font-bold">Your Segments</h1>
        <div className="flex gap-2">
          <FileUpload/>
          <Button 
            className="bg-blue-600 hover:bg-blue-400" 
            onClick={() => router.push("/segment/create")}
          > 
            <PlusIcon/> New Segment
          </Button>
        </div>
      </div>
     
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment, index) => (
          <div key={index} className="bg-slate-200 p-6 flex justify-between rounded-lg shadow-lg ">
            <div>
                <h2 className="text-xl font-semibold mb-4">
              {segment.segment_name}
            </h2>
            <div className="space-y-2">
              <p >Combinator: {segment.combinator}</p>
              <p>Matched Customers: {segment.size}</p>
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Rules:</h3>
                <div className="space-y-2">
                  {segment.rules.map((rule, ruleIndex) => (
                    <div
                      key={ruleIndex}
                      className="bg-slate-300 p-3 rounded text-sm"
                    >
                      {rule.field} {rule.operator} {rule.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            </div>
            
            <Button className="bg-blue-600  hover:bg-blue-400" onClick={() => handlePreview(segment._id)}>Preview</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSegment;
