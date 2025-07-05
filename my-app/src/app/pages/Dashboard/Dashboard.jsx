
// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const feedData = JSON.parse(searchParams.get("feedData") || "{}");

  const requestSMSPermission = async () => {
    // Web platform does not require SMS permissions
    console.log("Web platform: No SMS permission needed");
  };

  useEffect(() => {
    requestSMSPermission();
  }, []);

  const handleEmergencyClick = () => {
    router.push(`/emergency?id=${encodeURIComponent(JSON.stringify(feedData))}`);
  };

  const handleMedicalClick = () => {
    router.push(`/healthprofile?id=${encodeURIComponent(JSON.stringify(feedData))}`);
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="max-w-3xl mx-auto">
        <div className="mt-12 ml-5">
          <p className="text-gray-500 text-xl">Good Morning</p>
          <p className="text-black text-xl">{feedData.name}</p>
        </div>

        <div className="mt-10 px-5">
          <h1 className="text-4xl font-bold">
            What do you <span className="underline text-green-500">need?</span> ☺
          </h1>

          <div className="flex flex-col md:flex-row gap-5 mt-8 justify-center">
            <button className="bg-red-700 rounded-2xl p-6 w-full md:w-1/2 text-white font-bold text-lg flex flex-col items-center">
              <Image src="/icon1.png" alt="SOS" width={48} height={48} />
              <span className="text-xl font-bold mt-2">SOS</span>
            </button>

            <div className="bg-purple-200 rounded-2xl p-6 w-full md:w-1/2 flex flex-col items-center">
              <Image src="/icon2.png" alt="Health" width={48} height={48} />
              <button onClick={handleMedicalClick} className="text-black font-bold text-sm mt-2">
                Add Medical History
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 mt-5 justify-center">
            <div className="bg-orange-200 rounded-2xl p-6 w-full md:w-1/2 flex flex-col items-center">
              <Image src="/icon3.png" alt="Emergency" width={48} height={48} />
              <button onClick={handleEmergencyClick} className="text-black font-bold text-sm mt-2">
                Add Emergency Contact
              </button>
            </div>

            <div className="bg-green-200 rounded-2xl p-6 w-full md:w-1/2 flex flex-col items-center">
              <Image src="/icon4.png" alt="Pharmacy" width={48} height={48} />
              <span className="text-black font-bold text-sm mt-2">Pharmacy</span>
              <div className="mt-2 w-full h-64">
                <iframe
                  title="Nearby Pharmacy"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed/v1/search?key=YOUR_GOOGLE_MAPS_API_KEY&q=pharmacy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
