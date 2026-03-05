"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/style.css';

// Dynamically import to prevent SSR issues in Next.js
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false });

const PhoneField = () => {
  return (
    <div className="md:col-span-2 custom-phone-input">
      <PhoneInput
        country={'us'}
        placeholder="Phone Number"
        containerClass="!w-full"
        inputClass="!w-full !bg-[#151515] !text-white !border-white/10 !rounded-xl !p-4 !text-xs !h-auto !outline-none focus:!border-red-600 !transition-colors"
        buttonClass="!bg-transparent !border-r !border-white/10 !rounded-l-xl hover:!bg-white/5"
        dropdownClass="!bg-[#1c1c1c] !text-white !border-white/10"
        searchClass="!bg-[#151515] !text-white"
        enableSearch={true}
        onChange={(phone) => console.log(phone)}
      />

      <style jsx global>{`
        /* Target the dropdown list items */
        .custom-phone-input .country-list .country:hover {
          background-color: #2a2a2a !important;
        }
        .custom-phone-input .country-list .country.highlight {
          background-color: #0056b3 !important; /* Matches your blue highlight image */
        }
        /* Fix for the arrow color */
        .custom-phone-input .selected-flag .arrow {
          border-top-color: #fff !important;
        }
        .custom-phone-input .selected-flag .arrow.up {
          border-bottom-color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default PhoneField;