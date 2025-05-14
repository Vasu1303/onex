"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Customer } from "@/app/campaign/create/page";

export default function SegmentDetailPage() {
    const router = useRouter();
  const { id } = useParams();
  const [customers, setCustomers] = useState([]);
  const [segmentName, setSegmentName] = useState("");

  useEffect(() => {
    const fetchSegmentData = async () => {
      const res = await fetch(`/api/segments/${id}`);
      const data = await res.json();

      setSegmentName(data.segment.segment_name);
      setCustomers(data.customers);
    };

    fetchSegmentData();
  }, [id]);

  return (
    <div className="p-8 mt-16">
        <div className="flex justify-between">

      <h1 className="text-2xl font-bold mb-4">Segment: {segmentName}</h1>
      <Button className="bg-blue-600 hover:bg-blue-400" onClick={() => router.push(`/campaign/create?segmentId=${id}`)}>
  📣 Create Campaign
</Button>
        </div>

      <div className=" rounded-lg  overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Total Spend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((c: Customer, index) => (
              <TableRow key={index}>
                <TableCell>{c.first_name} {c.last_name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.city}</TableCell>
                <TableCell>{c.total_spend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
