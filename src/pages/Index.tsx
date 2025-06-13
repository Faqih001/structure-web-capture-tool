
import { Header } from "@/components/Header";
import { CaptureForm } from "@/components/CaptureForm";
import { StructureDisplay } from "@/components/StructureDisplay";
import { useState } from "react";

export interface WebsiteStructure {
  url: string;
  title: string;
  description: string;
  elements: {
    headings: string[];
    links: number;
    images: number;
    forms: number;
  };
  screenshots: {
    fullPage: string;
    desktop: string;
    mobile: string;
  };
  htmlContent?: string;
  additionalPages?: string[];
  timestamp: Date;
}

const Index = () => {
  const [capturedStructure, setCapturedStructure] = useState<WebsiteStructure | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
            Web Structure Analyzer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Capture and analyze the structure of any website. Get insights into HTML elements, 
            layout patterns, and content organization.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <CaptureForm 
            onStructureCaptured={setCapturedStructure}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          
          {capturedStructure && (
            <StructureDisplay structure={capturedStructure} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
