
import React, { Suspense, lazy } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Shield, Loader2 } from 'lucide-react';

// Lazy load MDX components untuk performa yang lebih baik
const IntroductionMDX = lazy(() => import('./documentation/IntroductionMDX'));
const SecurityMDX = lazy(() => import('./documentation/SecurityMDX'));
const ThreatsMDX = lazy(() => import('./documentation/ThreatsMDX'));
const BestPracticesMDX = lazy(() => import('./documentation/BestPracticesMDX'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8 sm:py-12 md:py-16">
    <Loader2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 animate-spin text-blue-400" />
    <span className="ml-3 text-gray-400 text-sm sm:text-base md:text-lg">Memuat konten...</span>
  </div>
);

const DocumentationModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/50 transition-all duration-300 text-xs sm:text-sm md:text-base px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5"
        >
          <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
          <span className="hidden sm:inline">Dokumentasi Web3</span>
          <span className="sm:hidden">Docs</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] bg-gray-900/95 backdrop-blur-md border-gray-700/50 p-0 mx-2 sm:mx-4 md:mx-auto">
        <DialogHeader className="p-3 sm:p-4 md:p-6 lg:p-8 border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
          <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white flex items-center">
            <Shield className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-blue-400 flex-shrink-0" />
            <span className="truncate">Panduan Keamanan Web3 & Blockchain</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="intro" className="w-full flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-800/60 backdrop-blur-sm mx-3 sm:mx-4 md:mx-6 lg:mx-8 mt-3 sm:mt-4 md:mt-6 rounded-lg shrink-0 border border-gray-700/30">
            <TabsTrigger 
              value="intro" 
              className="text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4 py-2 sm:py-2.5 md:py-3 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <span className="hidden sm:inline">Pengenalan</span>
              <span className="sm:hidden">Intro</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4 py-2 sm:py-2.5 md:py-3 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <span className="hidden sm:inline">Keamanan</span>
              <span className="sm:hidden">Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="threats" 
              className="text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4 py-2 sm:py-2.5 md:py-3 data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <span className="hidden sm:inline">Ancaman</span>
              <span className="sm:hidden">Threats</span>
            </TabsTrigger>
            <TabsTrigger 
              value="best-practices" 
              className="text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4 py-2 sm:py-2.5 md:py-3 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <span className="hidden md:inline">Best Practices</span>
              <span className="md:hidden">Practices</span>
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 min-h-0">
            <div className="py-4 sm:py-5 md:py-6 lg:py-8">
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
