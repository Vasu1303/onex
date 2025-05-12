'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {ScrollText} from "lucide-react"
import { Button } from "@/components/ui/button";

type Log = {
  _id: string;
  customer_id: string;
  customer_email: string;
  message: string;
  status: "SENT" | "FAILED";
  delivery_time?: string;
};

export default function CampaignLogsPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id;
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      setLogs([]); // Clear previous logs
      try {
        const res = await fetch(`/api/comm-logs/${campaignId}`, {
          cache: 'no-store', // Disable caching
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch logs');
        }
        
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (error) {
        console.error("Error:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch logs');
      } finally {
        setIsLoading(false);
      }
    };

    if (campaignId) {
      fetchLogs();
    }
  }, [campaignId]);

  return (
    <div className="p-8 mt-16">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          onClick={() => router.push('/campaign')}
          className="text-sm bg-blue-600 hover:bg-blue-400"
        >
          ← Back to Campaigns
        </Button>
        <div className="flex gap-2 justify-center">
             <ScrollText/>

        <h1 className="text-2xl font-bold"> Communication Logs</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"/>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : logs.length === 0 ? (
        <div className="text-center">No logs found for this campaign</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{log.customer_id}</TableCell>
                  <TableCell>{log.customer_email}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {log.message}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      log.status === "SENT" 
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}>
                      {log.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {log.delivery_time 
                      ? new Date(log.delivery_time).toLocaleString()
                      : '-'
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
