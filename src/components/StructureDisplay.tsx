import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WebsiteStructure } from "@/pages/Index";
import { ScreenshotCapture } from "@/components/ScreenshotCapture";
import { HtmlViewer } from "@/components/HtmlViewer";
import { 
  Globe, 
  Calendar, 
  FileText, 
  Link, 
  Image, 
  FormInput,
  Hash,
  Clock
} from "lucide-react";

interface StructureDisplayProps {
  structure: WebsiteStructure;
}

export const StructureDisplay = ({ structure }: StructureDisplayProps) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Website Info Card */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{structure.title}</h3>
              <p className="text-slate-600">{structure.url}</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{structure.timestamp.toLocaleString()}</span>
          </Badge>
        </div>
        
        {structure.description && (
          <p className="text-slate-600 mb-4 p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
            {structure.description}
          </p>
        )}
      </Card>

      {/* Screenshots Section */}
      <ScreenshotCapture 
        screenshots={structure.screenshots}
        websiteTitle={structure.title}
      />

      {/* HTML Content and Additional Pages */}
      <HtmlViewer 
        htmlContent={structure.htmlContent}
        additionalPages={structure.additionalPages}
        websiteUrl={structure.url}
        websiteTitle={structure.title}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Hash className="h-5 w-5 text-purple-500" />
            <span className="font-medium text-slate-700">Headings</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{structure.elements.headings.length}</p>
          <p className="text-sm text-slate-500">H1-H6 elements found</p>
        </Card>

        <Card className="p-4 bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Link className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-slate-700">Links</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{structure.elements.links}</p>
          <p className="text-sm text-slate-500">Anchor elements</p>
        </Card>

        <Card className="p-4 bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Image className="h-5 w-5 text-green-500" />
            <span className="font-medium text-slate-700">Images</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{structure.elements.images}</p>
          <p className="text-sm text-slate-500">Image elements</p>
        </Card>

        <Card className="p-4 bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <FormInput className="h-5 w-5 text-orange-500" />
            <span className="font-medium text-slate-700">Forms</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{structure.elements.forms}</p>
          <p className="text-sm text-slate-500">Form elements</p>
        </Card>
      </div>

      {/* Content Structure */}
      {structure.elements.headings.length > 0 && (
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-5 w-5 text-slate-600" />
            <h4 className="text-xl font-bold text-slate-800">Content Structure</h4>
          </div>
          <div className="space-y-2">
            {structure.elements.headings.slice(0, 10).map((heading, index) => (
              <div 
                key={index} 
                className="p-3 bg-slate-50 rounded-lg border-l-4 border-blue-400 hover:bg-slate-100 transition-colors"
              >
                <p className="text-slate-700 font-medium">{heading}</p>
              </div>
            ))}
            {structure.elements.headings.length > 10 && (
              <p className="text-sm text-slate-500 text-center mt-4">
                ...and {structure.elements.headings.length - 10} more headings
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
