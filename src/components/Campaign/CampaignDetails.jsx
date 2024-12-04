// src/components/Campaign/CampaignDetails.jsx
import React, { useState, useEffect } from 'react';
import Select from '../common/Select';
import { channelHierarchy } from '../../data/relationships';

const CampaignDetails = ({ formData, setFormData }) => {
  const [showOtherChannel, setShowOtherChannel] = useState(false);

  // Update available options when channel changes
  useEffect(() => {
    if (formData.channel === 'Other') {
      setShowOtherChannel(true);
    } else {
      setShowOtherChannel(false);
      // Reset other channel field if it was previously set
      if (formData.otherChannel) {
        setFormData(prev => ({ ...prev, otherChannel: '' }));
      }
    }
  }, [formData.channel]);

  // Reset dependent fields when channel changes
  useEffect(() => {
    if (formData.channel && formData.channel !== 'Other') {
      const channelData = channelHierarchy[formData.channel];
      if (!channelData?.types?.includes(formData.channelType)) {
        setFormData(prev => ({
          ...prev,
          channelType: '',
          mediaObjective: '',
          buyType: ''
        }));
      }
    }
  }, [formData.channel]);

  const handleChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'channel') {
        newData.channelType = '';
        newData.mediaObjective = '';
        newData.buyType = '';
      }
      
      return newData;
    });
  };

  return (
    <div className="form-section">
      <h3>Campaign Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Channel"
          name="channel"
          options={[...Object.keys(channelHierarchy), 'Other']}
          value={formData.channel}
          onChange={(value) => handleChange('channel', value)}
          required
        />

        {showOtherChannel && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-fp-dark mb-2">
              Other Channel
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.otherChannel || ''}
              onChange={(e) => handleChange('otherChannel', e.target.value)}
              placeholder="Enter channel name"
              required
            />
          </div>
        )}

        <Select
          label="Channel Type"
          name="channelType"
          options={formData.channel && channelHierarchy[formData.channel]?.types || []}
          value={formData.channelType}
          onChange={(value) => handleChange('channelType', value)}
          disabled={!formData.channel || formData.channel === 'Other'}
          required
        />

        <Select
          label="Media Objective"
          name="mediaObjective"
          options={formData.channel && channelHierarchy[formData.channel]?.objectives || []}
          value={formData.mediaObjective}
          onChange={(value) => handleChange('mediaObjective', value)}
          disabled={!formData.channelType}
          required
        />

        <Select
          label="Buy Type"
          name="buyType"
          options={formData.channel && channelHierarchy[formData.channel]?.buyTypes || []}
          value={formData.buyType}
          onChange={(value) => handleChange('buyType', value)}
          disabled={!formData.mediaObjective}
          required
        />
      </div>
    </div>
  );
};

export default CampaignDetails;
