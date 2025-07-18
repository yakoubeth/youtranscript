'use client';

import { useState } from 'react';

interface DownloadDropdownProps {
  onDownload: (format: 'txt' | 'md' | 'json' | 'srt') => void;
  disabled?: boolean;
}

export default function DownloadDropdown({ onDownload, disabled = false }: DownloadDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formats = [
    { id: 'txt', name: 'Text (.txt)', icon: '📄' },
    { id: 'md', name: 'Markdown (.md)', icon: '📝' },
    { id: 'json', name: 'JSON (.json)', icon: '⚙️' },
    { id: 'srt', name: 'Subtitle (.srt)', icon: '🎬' }
  ];

  const handleDownload = (format: 'txt' | 'md' | 'json' | 'srt') => {
    onDownload(format);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Download</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10">
          <div className="py-2">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => handleDownload(format.id as 'txt' | 'md' | 'json' | 'srt')}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 first:rounded-t-xl last:rounded-b-xl"
              >
                <span className="text-lg">{format.icon}</span>
                <span>{format.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
