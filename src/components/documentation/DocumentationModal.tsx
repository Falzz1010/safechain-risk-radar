
import React, { Suspense, lazy } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Shield, Loader2 } from 'lucide-react';

// Lazy load MDX components untuk performa yang lebih baik
const IntroductionMDX = lazy(() => import('./IntroductionMDX'));
const SecurityMDX = lazy(() => import('./SecurityMDX'));
const ThreatsMDX = lazy(() => import('./ThreatsMDX'));
const BestPracticesMDX = lazy(() => import('./BestPracticesMDX'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
    <span className="ml-3 text-gray-400">Memuat konten...</span>
  </div>
);

const DocumentationModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/50 transition-all duration-300"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Dokumentasi Web3</span>
          <span className="sm:hidden">Docs</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[95vh] bg-gray-900/95 backdrop-blur-md border-gray-700/50 p-0">
        <DialogHeader className="p-4 md:p-6 border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
          <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center">
            <Shield className="mr-3 h-5 w-5 md:h-6 md:w-6 text-blue-400" />
            <span className="truncate">Panduan Keamanan Web3 & Blockchain</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="intro" className="w-full flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-800/60 backdrop-blur-sm mx-4 md:mx-6 mt-4 md:mt-6 rounded-lg border border-gray-700/30">
            <TabsTrigger 
              value="intro" 
              className="text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <span className="hidden sm:inline">Pengenalan</span>
              <span className="sm:hidden">Intro</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="threats" 
              className="text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <span className="hidden sm:inline">Ancaman</span>
              <span className="sm:hidden">Threats</span>
            </TabsTrigger>
            <TabsTrigger 
              value="best-practices" 
              className="text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <span className="hidden sm:inline">Best Practices</span>
              <span className="sm:hidden">Practices</span>
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1 px-4 md:px-6 min-h-0">
            <div className="py-6 md:py-8">
              <TabsContent value="intro" className="mt-0 focus:outline-none">
                <Suspense fallback={<LoadingSpinner />}>
                  <IntroductionMDX />
                </Suspense>
              </TabsContent>

              <TabsContent value="security" className="mt-0 focus:outline-none">
                <Suspense fallback={<LoadingSpinner />}>
                  <SecurityMDX />
                </Suspense>
              </TabsContent>

              <TabsContent value="threats" className="mt-0 focus:outline-none">
                <Suspense fallback={<LoadingSpinner />}>
                  <ThreatsMDX />
                </Suspense>
              </TabsContent>

              <TabsContent value="best-practices" className="mt-0 focus:outline-none">
                <Suspense fallback={<LoadingSpinner />}>
                  <BestPracticesMDX />
                </Suspense>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentationModal;
