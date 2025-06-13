
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Download, ExternalLink, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HtmlViewerProps {
  htmlContent?: string;
  additionalPages?: string[];
  websiteUrl: string;
  websiteTitle: string;
}

export const HtmlViewer = ({ htmlContent, additionalPages, websiteUrl, websiteTitle }: HtmlViewerProps) => {
  const { toast } = useToast();

  const downloadHtml = () => {
    if (!htmlContent) return;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${websiteTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_source.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "HTML Downloaded",
      description: "Website HTML source code has been downloaded",
    });
  };

  const copyHtml = async () => {
    if (!htmlContent) return;
    
    try {
      await navigator.clipboard.writeText(htmlContent);
      toast({
        title: "HTML Copied",
        description: "Website HTML has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy HTML to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* HTML Source Section */}
      {htmlContent && (
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Code className="h-6 w-6 text-green-500" />
              <h3 className="text-xl font-bold text-slate-800">HTML Source Code</h3>
              <Badge variant="secondary">{htmlContent.length} characters</Badge>
            </div>
            <div className="flex space-x-2">
              <Button onClick={copyHtml} variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Copy HTML
              </Button>
              <Button onClick={downloadHtml} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-lg p-4 max-h-96 overflow-auto">
            <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
              {htmlContent.substring(0, 2000)}
              {htmlContent.length > 2000 && (
                <span className="text-slate-400">
                  ... ({htmlContent.length - 2000} more characters)
                </span>
              )}
            </pre>
          </div>
        </Card>
      )}

      {/* Additional Pages Section */}
      {additionalPages && additionalPages.length > 0 && (
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <ExternalLink className="h-6 w-6 text-blue-500" />
            <h3 className="text-xl font-bold text-slate-800">Discovered Pages</h3>
            <Badge variant="secondary">{additionalPages.length} pages found</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {additionalPages.map((page, index) => (
              <div 
                key={index}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium truncate mr-2">
                    {page.replace(websiteUrl, '').replace(/^\//, '') || 'Home'}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(page, '_blank')}
                    className="flex-shrink-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-1 truncate">{page}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> These are the internal pages discovered from the main page. 
              Each page can be analyzed separately for complete website structure mapping.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
