// src/components/Layout/MainContent.jsx
import React, { useState } from 'react';
import { UserMenu } from '../Auth';
import CampaignOrganization from '../Campaign/CampaignOrganization';
import CampaignTiming from '../Campaign/CampaignTiming';
import CampaignDetails from '../Campaign/CampaignDetails';
import CampaignStructure from '../Campaign/CampaignStructure';
import UtmBuilder from '../UTM/UtmBuilder';
import UtmLog from '../UTM/UtmLog';

const MainContent = () => {
  // Initialize form state with all required fields
  const [formData, setFormData] = useState({
    // Campaign Organization
    market: '',
    brand: '',
    productCategory: '',
    subCategory: '',
    
    // Campaign Timing
    fiscalYear: '',
    quarter: '',
    month: '',
    
    // Campaign Details
    channel: '',
    channelType: '',
    mediaObjective: '',
    buyType: '',
    otherChannel: '',
    
    // Campaign Structure
    baseUrl: '',
    campaignName: '',
    adSet: '',
    adName: ''
  });

  return (
    <div className="min-h-screen bg-fp-gray">
      {/* Header */}
      <header className="bg-white shadow-fp">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.jpg"
                alt="Fisher & Paykel"
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-fp-dark hidden md:block">
                UTM Builder
              </h1>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - UTM Builder Form */}
          <div className="space-y-6">
            <CampaignOrganization 
              formData={formData}
              setFormData={setFormData}
            />
            <CampaignTiming 
              formData={formData}
              setFormData={setFormData}
            />
            <CampaignDetails 
              formData={formData}
              setFormData={setFormData}
            />
            <CampaignStructure 
              formData={formData}
              setFormData={setFormData}
            />
            <UtmBuilder 
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          {/* Right Column - UTM Log */}
          <div>
            <UtmLog />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Fisher & Paykel. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainContent;
