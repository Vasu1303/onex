"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {NotebookText} from "lucide-react"

interface Campaign {
  _id: string;
  campaign_name: string;
  segment_name: string;
  message: string;
  sent_count: number;
  failed_count: number;
  created_at: string;
}

export default function CampaignHistory() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/campaign");
        const data = await res.json();
        setCampaigns(data.campaigns);
        console.log("campaign name", data.campaigns[0].campaign_name)
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        <p>Loading campaigns...</p>
      </div>
    );
  }

  return (
    
    <div className="py-8 mt-16">
      <div className="flex gap-2 items-center justify-center">
        <NotebookText size={30} />

      <h1 className="text-2xl font-bold mb-6 text-center">Campaign History</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map((campaign: Campaign) => (
          <Link  key={campaign._id} href={`/campaign/${campaign._id}`}>
          <div key={campaign._id} className="bg-slate-200 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{campaign.campaign_name}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(campaign.created_at).toLocaleString()}
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-bold">Segment:</span> {campaign.segment_name}
              </p>
              <p className="text-sm">
                <span className="font-bold">Message:</span> {campaign.message}
              </p>
              <div className="flex gap-4 mt-3">
                <p className="text-green-400">✅ Sent: {campaign.sent_count}</p>
                <p className="text-red-400">❌ Failed: {campaign.failed_count}</p>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
   
  );
}
