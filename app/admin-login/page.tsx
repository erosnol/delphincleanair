'use client';

import { signIn, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Chrome } from 'lucide-react';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/secure-admin-dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn('google', {
        callbackUrl: '/secure-admin-dashboard',
        redirect: false,
      });
      
      if (result?.error) {
        alert('Access denied. Only authorized administrators can access this area.');
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Secure login for Delphin Clean Air administrators
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Lock className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-amber-800 mb-1">
                  Restricted Access
                </h3>
                <p className="text-sm text-amber-700">
                  This area is restricted to authorized personnel only. 
                  Access is logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            ) : (
              <>
                <Chrome className="w-5 h-5 mr-3" />
                Sign in with Google
              </>
            )}
          </button>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Protected by Google OAuth 2.0
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Delphin Clean Air © 2024
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/80 hover:text-white text-sm underline transition-colors"
          >
            ← Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}
