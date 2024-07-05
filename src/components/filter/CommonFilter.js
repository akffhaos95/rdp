import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

const CommonFilter = ({ filterOptions, onFilter }) => {
  const [filters, setFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleChipDelete = (filterType) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterType];
      return newFilters;
    });
    setActiveFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.key !== filterType)
    );
  };

  const addFilter = () => {
    const filter = filterOptions.find((f) => f.key === selectedFilter);
    if (filter && !activeFilters.includes(filter)) {
      setActiveFilters((prevFilters) => [...prevFilters, filter]);
      setSelectedFilter("");
    }
  };

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  const renderFilterInput = (filter) => {
    switch (filter.type) {
      case "yearMonth":
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="년도"
                select
                value={filters[filter.key]?.year || ""}
                onChange={(e) =>
                  handleFilterChange(filter.key, {
                    ...filters[filter.key],
                    year: e.target.value,
                  })
                }
                fullWidth
              >
                {filter.options.years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="월"
                select
                value={filters[filter.key]?.month || ""}
                onChange={(e) =>
                  handleFilterChange(filter.key, {
                    ...filters[filter.key],
                    month: e.target.value,
                  })
                }
                fullWidth
              >
                {filter.options.months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        );
      case "date":
        return (
          <TextField
            label={filter.label}
            type="date"
            value={filters[filter.key] || ""}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            fullWidth
          />
        );
      case "string":
        return (
          <TextField
            label={filter.label}
            value={filters[filter.key] || ""}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            fullWidth
          />
        );
      case "select":
        return (
          <TextField
            label={filter.label}
            select
            value={filters[filter.key] || ""}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            fullWidth
          >
            {filter.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case "multiSelect":
        return (
          <Autocomplete
            multiple
            options={filter.options}
            getOptionLabel={(option) => option.label}
            value={filters[filter.key] || []}
            onChange={(e, newValue) => handleFilterChange(filter.key, newValue)}
            renderInput={(params) => (
              <TextField {...params} label={filter.label} />
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Filter
      </Typography>
      <FormControl fullWidth>
        <Select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            필터 선택
          </MenuItem>
          {filterOptions.map((filter) => (
            <MenuItem key={filter.key} value={filter.key}>
              {filter.label}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={addFilter}
          disabled={!selectedFilter}
          sx={{ mt: 2 }}
        >
          필터 추가
        </Button>
      </FormControl>
      <Box mt={2}>
        {activeFilters.map((filter) => (
          <Box key={filter.key} mb={2}>
            {renderFilterInput(filter)}
          </Box>
        ))}
      </Box>
      <Box mt={2}>
        {Object.entries(filters).map(([key, value]) => (
          <Chip
            key={key}
            label={`${filterOptions.find((f) => f.key === key).label}: ${
              Array.isArray(value)
                ? value.map((v) => v.label).join(", ")
                : JSON.stringify(value)
            }`}
            onDelete={() => handleChipDelete(key)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CommonFilter;
