'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/login'); // Not logged in
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-red-600">You</span>
                <span className="text-gray-900 dark:text-white">Transcript</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {session.user?.name || session.user?.email}!
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Subscription Tier
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {session.user?.subscriptionTier || 'Free Trial'}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Transcripts Used
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {session.user?.transcriptsUsed || 0}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                AI Queries Used
              </h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {session.user?.aiQueriesUsed || 0}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl">
                <h4 className="font-semibold text-lg mb-2">New Transcript</h4>
                <p className="text-blue-100">Start transcribing a YouTube video</p>
              </button>
              
              <button className="p-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl">
                <h4 className="font-semibold text-lg mb-2">View Transcripts</h4>
                <p className="text-green-100">Browse your saved transcripts</p>
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              🎉 Phase 2 Complete!
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              Authentication system is now fully functional! You can sign up with email verification, 
              sign in with credentials or OAuth (Google/GitHub), reset passwords, and access protected routes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
