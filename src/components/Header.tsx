
import { Button } from "@/components/ui/button";
import { Globe, Github, Settings } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-slate-600 p-2 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">StructureCapture</h2>
              <p className="text-sm text-slate-500">Website Analysis Tool</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
