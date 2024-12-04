// src/utils/validators.js
export const validateUtmParams = (params) => {
  const errors = {};
  
  // Required UTM parameters
  const requiredParams = ['source', 'medium', 'campaign'];
  requiredParams.forEach(param => {
    if (!params[param]) {
      errors[param] = `UTM ${param} is required`;
    }
  });

  // URL validation
  if (params.baseUrl) {
    try {
      new URL(params.baseUrl);
    } catch (e) {
      errors.baseUrl = 'Please enter a valid URL';
    }
  } else {
    errors.baseUrl = 'Base URL is required';
  }

  // Length restrictions
  const maxLengths = {
    source: 50,
    medium: 50,
    campaign: 100,
    content: 100,
    term: 100
  };

  Object.entries(maxLengths).forEach(([param, maxLength]) => {
    if (params[param] && params[param].length > maxLength) {
      errors[param] = `UTM ${param} must be less than ${maxLength} characters`;
    }
  });

  return errors;
};

// src/utils/formatters.js
export const formatUtmString = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
};

export const generateCampaignName = (formData) => {
  const parts = [
    formData.market,
    formData.productCategory,
    formData.subCategory,
    formData.fiscalYear,
    formData.quarter,
    formData.channel,
    formData.mediaObjective
  ].filter(Boolean);
  
  return formatUtmString(parts.join('_'));
};

export const generateAdSetName = (formData) => {
  const parts = [
    formData.channelType,
    formData.buyType
  ].filter(Boolean);
  
  return formatUtmString(parts.join('_'));
};

// Formats UTC date to user's timezone
export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

// Truncates long strings with ellipsis
export const truncate = (str, length = 30) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};

// Generates a preview of the UTM URL
export const generateUtmPreview = (params) => {
  const { baseUrl, ...utmParams } = params;
  if (!baseUrl) return '';

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const searchParams = new URLSearchParams();

  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      searchParams.append(`utm_${key}`, formatUtmString(value));
    }
  });

  return `${cleanBaseUrl}?${searchParams.toString()}`;
};
