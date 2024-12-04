// src/components/UTM/UtmBuilder.jsx
import React, { useState } from 'react';
import { useUtmGenerator } from '../../hooks/useUtmGenerator';

const UtmBuilder = ({ formData }) => {
  const [manualMode, setManualMode] = useState(false);
  const [manualUtmParams, setManualUtmParams] = useState({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: ''
  });
  const { generateUtm, copyToClipboard } = useUtmGenerator();
  const [showPreview, setShowPreview] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  // Helper function to sanitize UTM parameters
  const sanitizeUtmParam = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
      .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
  };

  // Generate UTM parameters from form data
  const generateUtmFromForm = () => {
    if (!formData.baseUrl) return '';

    const utmParams = manualMode ? manualUtmParams : {
      source: formData.channel?.toLowerCase() || '',
      medium: formData.channelType?.toLowerCase() || 'social',
      campaign: sanitizeUtmParam(formData.campaignName),
      content: sanitizeUtmParam(formData.adName),
      term: ''  // Optional parameter
    };

    const baseUrl = formData.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    const params = new URLSearchParams();

    // Add non-empty parameters
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        params.append(`utm_${key}`, value);
      }
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;
    setGeneratedUrl(finalUrl);
    setShowPreview(true);
    return finalUrl;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = generateUtmFromForm();
    if (url) {
      generateUtm({ ...formData, generatedUrl: url });
    }
  };

  return (
    <div className="form-section">
      <h3>UTM Parameters</h3>
      
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={manualMode}
            onChange={() => setManualMode(!manualMode)}
            className="form-checkbox h-4 w-4 text-fp-blue"
          />
          <span className="ml-2 text-sm">Enable manual UTM parameter input</span>
        </label>
      </div>

      {manualMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="UTM Source"
            value={manualUtmParams.source}
            onChange={(e) => setManualUtmParams(prev => ({...prev, source: e.target.value}))}
            className="input-field"
          />
          <input
            type="text"
            placeholder="UTM Medium"
            value={manualUtmParams.medium}
            onChange={(e) => setManualUtmParams(prev => ({...prev, medium: e.target.value}))}
            className="input-field"
          />
          <input
            type="text"
            placeholder="UTM Campaign"
            value={manualUtmParams.campaign}
            onChange={(e) => setManualUtmParams(prev => ({...prev, campaign: e.target.value}))}
            className="input-field"
          />
          <input
            type="text"
            placeholder="UTM Content"
            value={manualUtmParams.content}
            onChange={(e) => setManualUtmParams(prev => ({...prev, content: e.target.value}))}
            className="input-field"
          />
          <input
            type="text"
            placeholder="UTM Term (optional)"
            value={manualUtmParams.term}
            onChange={(e) => setManualUtmParams(prev => ({...prev, term: e.target.value}))}
            className="input-field"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-field bg-gray-50">
            UTM Source: {formData.channel?.toLowerCase() || '[Auto-populated from Channel]'}
          </div>
          <div className="input-field bg-gray-50">
            UTM Medium: {formData.channelType?.toLowerCase() || '[Auto-populated from Channel Type]'}
          </div>
          <div className="input-field bg-gray-50">
            UTM Campaign: {formData.campaignName || '[Auto-populated from Campaign Name]'}
          </div>
          <div className="input-field bg-gray-50">
            UTM Content: {formData.adName || '[Auto-populated from Ad Name]'}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="btn-primary px-8"
          disabled={!formData.baseUrl}
        >
          Generate UTM
        </button>
      </div>

      {showPreview && <UtmPreview url={generatedUrl} onCopy={copyToClipboard} />}
    </div>
  );
};

// UTM Preview Component
const UtmPreview = ({ url, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h4 className="text-lg font-medium mb-4">Generated UTM URL:</h4>
      <div className="generated-utm mb-4">{url}</div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCopy}
          className="btn-secondary"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
};

export default UtmBuilder;
