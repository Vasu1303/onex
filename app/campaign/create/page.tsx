"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { DrumIcon } from "lucide-react";
import { useSession } from "next-auth/react";



export type Customer = {
  customer_id: string;
  email: string;
  first_name: string;
  [key: string]: string | number | boolean ; // for other optional fields like last_name, city etc.
};

export default function CreateCampaignPage()  {
  const {data:session} = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const segmentId = searchParams.get("segmentId");

  const [segmentName, setSegmentName] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [message, setMessage] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [results, setResults] = useState<{ sent: number; failed: number }>({
    sent: 0,
    failed: 0,
  });
  const [isSending, setIsSending] = useState(false);
  

  useEffect(() => {
    const fetchSegmentData = async () => {
      const res = await fetch(`/api/segments/${segmentId}`);
      const data = await res.json();
      setSegmentName(data.segment.segment_name);
      setCustomers(data.customers);
    };

    if (segmentId) fetchSegmentData();
  }, [segmentId]);

  const personalizeMessage = (msg: string, customer: Customer) => {
    return msg.replace(/{first_name}/g, customer.first_name || "friend");
  };

  const handleSend = async () => {
   
    const trimmedCampaignName = campaignName.trim();
    if (!trimmedCampaignName) {
      toast("Please enter a campaign name");
      return;
    }

    setIsSending(true);
    
    let sent = 0;
    let failed = 0;

    try {
      
      const campaignPayload = {
        campaign_name: trimmedCampaignName,
        segment_id: segmentId,
        segment_name: segmentName,
        message,
        sent_count: 0, 
        failed_count: 0,
        created_by: session?.user?.name ,
      };

      const res1 = await fetch("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignPayload),
      });

      if (!res1.ok) {
        const errorData = await res1.json();
        throw new Error(errorData.error || "Failed to save campaign");
      }

      const savedCampaign = await res1.json();
      const campaignId = savedCampaign.campaign._id;

      for (const customer of customers) {
        const finalMessage = personalizeMessage(message, customer);

        const vendorRes = await fetch("/api/vendor/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customer, message: finalMessage }),
        });

        const result = await vendorRes.json();
        if (result.status === "SENT") sent++;
        else failed++;

        await fetch("/api/comm-logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campaign_id: campaignId,
            customer_id: customer.customer_id,
            customer_email: customer.email,
            message: finalMessage,
            status: result.status,
          }),
        });
      }

      setResults({ sent, failed });

      await fetch(`/api/campaign/${campaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sent_count: sent, failed_count: failed }),
      });

      toast("✅ Campaign completed!");
      router.push(`/campaign/${campaignId}`);

    } catch (error) {
      console.error("Campaign error:", error);
      toast("❌ Failed to complete campaign");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-8 mt-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">
        <DrumIcon/> Create Campaign for: <span>{segmentName}</span>
      </h1>

      
      <div className="space-y-4 mb-6 w-full max-w-2xl">
        <Label className="block font-semibold">Enter Campaign Name</Label>
        <Input
          value={campaignName}
          placeholder="The Saga Sale.."
          onChange={(e) => setCampaignName(e.target.value)}
          className="w-full" />

        <Label className="block font-semibold">Message Template:</Label>
        <Textarea
          placeholder="Hey, check this out!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-[100px]"  />
      </div>

      <Button className="bg-blue-600 hover:bg-blue-400" onClick={handleSend} disabled={isSending || customers.length === 0}>
        {isSending ? "Sending..." : "🚀 Send Campaign"}
      </Button>

      {(results.sent + results.failed > 0) && (
        <div className="mt-6 p-4 rounded-lg shadow">
          <p>✅ Sent: {results.sent}</p>
          <p>❌ Failed: {results.failed}</p>
        </div>
      )}
    </div>
  );
}
