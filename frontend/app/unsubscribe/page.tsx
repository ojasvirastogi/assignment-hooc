import React from 'react';
import Link from 'next/link';

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 pt-32 pb-20">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Unsubscribed
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          {email 
            ? <span>We've successfully removed <strong>{email}</strong> from our mailing list.</span>
            : "You have been successfully removed from our mailing list."
          }
        </p>

        <p className="text-sm text-gray-500 pt-4">
          We're sorry to see you go. If this was a mistake, you can always subscribe again.
        </p>

        <div className="pt-8">
          <Link 
            href="/"
            className="inline-block bg-red-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
