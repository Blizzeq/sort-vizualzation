'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Keyboard, X } from 'lucide-react';

const shortcuts = [
  { key: 'Space', description: 'Start/Pause/Resume sorting', icon: '⏯️' },
  { key: 'R', description: 'Reset sorting', icon: '🔄' },
  { key: 'N', description: 'New array', icon: '🎲' },
  { key: 'S', description: 'Next step (when paused)', icon: '⏭️' },
  { key: '→', description: 'Next step (when paused)', icon: '▶️' },
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg border-2 hover:bg-gray-50"
      >
        <Keyboard className="w-4 h-4 mr-2" />
        Keyboard Shortcuts
      </Button>

      {/* Shortcuts Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <Card className="w-96 max-w-[90vw] shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Keyboard className="w-5 h-5" />
                      Keyboard Shortcuts
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={shortcut.key}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{shortcut.icon}</span>
                        <span className="text-sm">{shortcut.description}</span>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {shortcut.key}
                      </Badge>
                    </motion.div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                    <p className="font-medium">💡 Tip</p>
                    <p>Keyboard shortcuts work when you&apos;re not editing any text fields.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}