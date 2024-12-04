// src/components/Campaign/CampaignStructure.jsx
import React, { useEffect } from 'react';
import { marketHierarchy } from '../../data/relationships';

const CampaignStructure = ({ formData, setFormData }) => {
  // Auto-generate campaign name based on other fields
  useEffect(() => {
    if (formData.market && formData.productCategory && formData.fiscalYear) {
      const campaignName = generateCampaignName(formData);
      setFormData(prev => ({ ...prev, campaignName }));
    }
  }, [
    formData.market,
    formData.productCategory,
    formData.subCategory,
    formData.fiscalYear,
    formData.quarter,
    formData.month,
    formData.channel,
    formData.mediaObjective
  ]);

  // Auto-generate ad set name when campaign name changes
  useEffect(() => {
    if (formData.campaignName) {
      const adSet = generateAdSetName(formData);
      setFormData(prev => ({ ...prev, adSet }));
    }
  }, [formData.campaignName, formData.channelType, formData.buyType]);

  const generateCampaignName = (data) => {
    const parts = [
      data.market,
      data.productCategory,
      data.subCategory,
      data.fiscalYear,
      data.quarter,
      data.channel,
      data.mediaObjective
    ].filter(Boolean);
    
    return parts.join('_').toLowerCase();
  };

  const generateAdSetName = (data) => {
    const parts = [
      data.channelType,
      data.buyType
    ].filter(Boolean);
    
    return parts.join('_').toLowerCase();
  };

  // Auto-populate base URL based on market
  useEffect(() => {
    if (formData.market) {
      const baseUrl = marketHierarchy[formData.market]?.baseUrl || '';
      setFormData(prev => ({ ...prev, baseUrl }));
    }
  }, [formData.market]);

  return (
    <div className="form-section">
      <h3>Campaign Structure</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-fp-dark mb-2">
            Base URL
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="url"
            className="input-field"
            value={formData.baseUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, baseUrl: e.target.value }))}
            placeholder="https://www.fisherpaykel.com/market"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-fp-dark mb-2">
              Campaign Name
              <span className="text-gray-400 text-xs ml-2">(Auto-generated)</span>
            </label>
            <div className="input-field bg-gray-50">{formData.campaignName}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-fp-dark mb-2">
              Ad Set
              <span className="text-gray-400 text-xs ml-2">(Auto-generated)</span>
            </label>
            <div className="input-field bg-gray-50">{formData.adSet}</div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-fp-dark mb-2">
              Ad Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.adName}
              onChange={(e) => setFormData(prev => ({ ...prev, adName: e.target.value }))}
              placeholder="Enter ad name"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignStructure;
