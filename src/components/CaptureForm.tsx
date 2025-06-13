
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Loader2, Globe, Shield } from "lucide-react";
import { WebsiteStructure } from "@/pages/Index";
import { analyzeWebsiteStructure } from "@/utils/structureAnalyzer";

interface CaptureFormProps {
  onStructureCaptured: (structure: WebsiteStructure) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const CaptureForm = ({ onStructureCaptured, isLoading, setIsLoading }: CaptureFormProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to analyze",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Analyzing website structure for:", url);
      const structure = await analyzeWebsiteStructure(url);
      onStructureCaptured(structure);
      
      toast({
        title: "Analysis Complete",
        description: "Website structure has been successfully captured and analyzed",
      });
    } catch (error) {
      console.error("Error analyzing website:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the website structure. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 mb-8 bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-lg font-medium text-slate-700 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-500" />
            Website URL
          </label>
          <div className="relative">
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-12 h-12 text-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://example.com or example.com"
              disabled={isLoading}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            We analyze publicly available HTML structure and metadata
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !url}
          className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-slate-600 hover:from-blue-600 hover:to-slate-700 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Analyzing Structure...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Capture Website Structure
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
