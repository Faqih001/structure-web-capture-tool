
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Monitor, Smartphone, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScreenshotCaptureProps {
  screenshots: {
    fullPage: string;
    desktop: string;
    mobile: string;
  };
  websiteTitle: string;
}

export const ScreenshotCapture = ({ screenshots, websiteTitle }: ScreenshotCaptureProps) => {
  const { toast } = useToast();

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Screenshot Downloaded",
        description: `${filename} has been downloaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download screenshot. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatFilename = (type: string) => {
    const cleanTitle = websiteTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const timestamp = new Date().toISOString().split('T')[0];
    return `${cleanTitle}_${type}_${timestamp}.png`;
  };

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <FileImage className="h-6 w-6 text-blue-500" />
        <h3 className="text-xl font-bold text-slate-800">Website Screenshots</h3>
        <Badge variant="secondary">Ready for Download</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Full Page Screenshot */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Monitor className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-slate-700">Full Page</span>
          </div>
          <div className="relative group">
            <img
              src={screenshots.fullPage}
              alt="Full page screenshot"
              className="w-full h-48 object-cover rounded-lg border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
          </div>
          <Button
            onClick={() => downloadImage(screenshots.fullPage, formatFilename('fullpage'))}
            className="w-full"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Full Page
          </Button>
        </div>

        {/* Desktop View */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Monitor className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-slate-700">Desktop View</span>
          </div>
          <div className="relative group">
            <img
              src={screenshots.desktop}
              alt="Desktop view screenshot"
              className="w-full h-48 object-cover rounded-lg border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
          </div>
          <Button
            onClick={() => downloadImage(screenshots.desktop, formatFilename('desktop'))}
            className="w-full"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Desktop
          </Button>
        </div>

        {/* Mobile View */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-slate-700">Mobile View</span>
          </div>
          <div className="relative group">
            <img
              src={screenshots.mobile}
              alt="Mobile view screenshot"
              className="w-full h-48 object-cover rounded-lg border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
          </div>
          <Button
            onClick={() => downloadImage(screenshots.mobile, formatFilename('mobile'))}
            className="w-full"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Mobile
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm text-blue-700">
          <strong>Pro Tip:</strong> Use these screenshots as visual references while coding to ensure your implementation matches the original design and layout.
        </p>
      </div>
    </Card>
  );
};
