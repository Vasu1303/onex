"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Papa from "papaparse";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DataPreview from "./DataPreview";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface ParseResult {
  data: string[][];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}
const FileUpload = () => {
  const [customersFile, setCustomersFile] = useState<File | null>(null);
  const [ordersFile, setOrdersFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messageCustomer, setMessageCustomer] = useState("");
  const [messageOrder, setMessageOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parsedCustomer, setParsedCustomer] = useState<string[][]>([]);
  const [parsedOrder, setParsedOrder] = useState<string[][]>([]);
  
  const router = useRouter();

  const parseCsv = (file: File, setter: (data: string[][]) => void) => {
    Papa.parse(file, {
      complete: (results: ParseResult) => {
        setter(results.data);
      },
      header: false,
    });
  };

  const handleCustomerChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomersFile(file);
      parseCsv(file, setParsedCustomer);
    }
  };
  const handleOrdersChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOrdersFile(file);
      parseCsv(file, setParsedOrder);
    }
  };
  const handleUpload = async () => {
    if (customersFile && ordersFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("customerFile", customersFile);
      formData.append("orderFile", ordersFile);

      try {
       
       

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`HTTP ERROR!: ${res.status}`);
        }

        const data = await res.json();
        setMessageCustomer(data.Customermessage);
        setMessageOrder(data.Ordermessage);



      } catch (error) {
        setError(error instanceof Error ? error.message : "Upload Failed");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast("Upload Files");
    }
  };
  
  const handlePageNavigation = ()=>{
    router.push("/segment/create")

  }

  return (
    <>
      <div className="flex">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon className="w-4 h-4 mr-2" /> Upload Data{" "}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Data</DialogTitle>
              <DialogDescription>
                Upload CSV files of your company&apos;s Customer & Orders data
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-left">
                  Upload Customers Data
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleCustomerChange}
                  />

                  {customersFile && (
                    <Drawer>
                      <DrawerTrigger>
                        <Button >Preview</Button>
                      </DrawerTrigger>
                      <DrawerContent className="flex p-4 ">
                        <DataPreview parsed={parsedCustomer} />
                        <DataPreview parsed={parsedOrder} />
                      </DrawerContent>
                    </Drawer>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-left">
                  Upload Orders Data
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleOrdersChange}
                  />
                  {ordersFile && <Button>Preview</Button>}
                </div>
              </div>
            </div>
           

            <DialogFooter>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={isLoading || !customersFile || !ordersFile}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Uploading...
                  </>
                ) : (
                  "Upload Files"
                )}
              </Button>
              {(messageCustomer && messageOrder) && (
                <Button onClick={handlePageNavigation }>Create Rules</Button>
              ) }
            </DialogFooter>
           

            {messageOrder && toast("Files Uploaded Succesfully")}
            {error && toast('Error Uploading Files')}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default FileUpload;
