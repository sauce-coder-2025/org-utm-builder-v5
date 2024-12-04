// src/components/Campaign/CampaignOrganization.jsx
import React, { useEffect, useState } from 'react';
import Select from '../common/Select';
import { 
  productHierarchy, 
  marketHierarchy 
} from '../../data/relationships';

const CampaignOrganization = ({ formData, setFormData }) => {
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  // Update available options when product category changes
  useEffect(() => {
    if (formData.productCategory) {
      const categoryData = productHierarchy[formData.productCategory];
      if (categoryData) {
        setAvailableSubcategories(categoryData.subcategories);
        setAvailableBrands(categoryData.defaultBrands);
      }
    } else {
      setAvailableSubcategories([]);
      setAvailableBrands([]);
    }
  }, [formData.productCategory]);

  // Reset dependent fields when market changes
  useEffect(() => {
    if (formData.market) {
      const marketData = marketHierarchy[formData.market];
      if (!marketData?.availableProducts?.includes(formData.productCategory)) {
        setFormData(prev => ({
          ...prev,
          productCategory: '',
          subCategory: '',
        }));
      }
    }
  }, [formData.market]);

  const handleChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'productCategory') {
        newData.subCategory = '';
      }
      if (field === 'market') {
        newData.productCategory = '';
        newData.subCategory = '';
      }
      
      return newData;
    });
  };

  return (
    <div className="form-section">
      <h3>Campaign Organization</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Market"
          name="market"
          options={Object.keys(marketHierarchy)}
          value={formData.market}
          onChange={(value) => handleChange('market', value)}
          required
        />

        <Select
          label="Brand"
          name="brand"
          options={availableBrands}
          value={formData.brand}
          onChange={(value) => handleChange('brand', value)}
          disabled={!formData.market}
          required
        />

        <Select
          label="Product Category"
          name="productCategory"
          options={formData.market ? marketHierarchy[formData.market]?.availableProducts || [] : []}
          value={formData.productCategory}
          onChange={(value) => handleChange('productCategory', value)}
          disabled={!formData.market}
          required
        />

        <Select
          label="Sub Category"
          name="subCategory"
          options={availableSubcategories}
          value={formData.subCategory}
          onChange={(value) => handleChange('subCategory', value)}
          disabled={!formData.productCategory}
        />
      </div>
    </div>
  );
};

export default CampaignOrganization;
