import React from 'react';

export default function FilterSidebar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      <label className="block mb-2">
        Preference:
        <select name="preference" value={filters.preference} onChange={handleChange} className="w-full mt-1 border px-2 py-1">
          <option value="">Any</option>
          <option value="short-distance">Short-distance</option>
          <option value="long-distance">Long-distance</option>
          <option value="training">Training</option>
        </select>
      </label>

      <label className="block mb-2">
        Gender:
        <select name="gender" value={filters.gender} onChange={handleChange} className="w-full mt-1 border px-2 py-1">
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
    </div>
  );
}
