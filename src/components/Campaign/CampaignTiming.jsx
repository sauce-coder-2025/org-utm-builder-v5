// src/components/Campaign/CampaignTiming.jsx
import React, { useEffect } from 'react';
import Select from '../common/Select';

const CampaignTiming = ({ formData, setFormData }) => {
  // Generate fiscal years dynamically (current + next 2 years)
  const getCurrentFY = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
    // FY starts in July, so if we're before July, we're in the previous FY
    const currentFY = currentMonth < 7 ? currentYear : currentYear + 1;
    return [`FY${String(currentFY).slice(-2)}`, 
            `FY${String(currentFY + 1).slice(-2)}`, 
            `FY${String(currentFY + 2).slice(-2)}`];
  };

  const fiscalYears = getCurrentFY();
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const months = [
    'July', 'August', 'September',     // Q1
    'October', 'November', 'December', // Q2
    'January', 'February', 'March',    // Q3
    'April', 'May', 'June'            // Q4
  ];

  // Helper function to get quarter from month
  const getQuarterFromMonth = (month) => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === -1) return '';
    return `Q${Math.floor(monthIndex / 3) + 1}`;
  };

  // Update quarter when month changes
  useEffect(() => {
    if (formData.month) {
      const quarter = getQuarterFromMonth(formData.month);
      if (quarter !== formData.quarter) {
        setFormData(prev => ({ ...prev, quarter }));
      }
    }
  }, [formData.month]);

  // Get available months based on selected quarter
  const getAvailableMonths = (quarter) => {
    if (!quarter) return months;
    const quarterIndex = parseInt(quarter[1]) - 1;
    return months.slice(quarterIndex * 3, (quarterIndex + 1) * 3);
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'quarter') {
        newData.month = '';
      }
      
      return newData;
    });
  };

  return (
    <div className="form-section">
      <h3>Campaign Timing</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Financial Year"
          name="fiscalYear"
          options={fiscalYears}
          value={formData.fiscalYear}
          onChange={(value) => handleChange('fiscalYear', value)}
          required
        />

        <Select
          label="Quarter"
          name="quarter"
          options={quarters}
          value={formData.quarter}
          onChange={(value) => handleChange('quarter', value)}
          disabled={!formData.fiscalYear}
          required
        />

        <Select
          label="Month"
          name="month"
          options={getAvailableMonths(formData.quarter)}
          value={formData.month}
          onChange={(value) => handleChange('month', value)}
          disabled={!formData.quarter}
          required
        />
      </div>
    </div>
  );
};

export default CampaignTiming;
