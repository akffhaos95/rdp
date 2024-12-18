import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const VISIBLE_FIELDS = ["opponent", "date", "venue", "league", "participation"];

const GameFilter = ({ players }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchGames = async () => {
      const db = getFirestore();
      const gamesCollection = collection(db, "games");
      const gamesSnapshot = await getDocs(gamesCollection);
      const gamesList = gamesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesList);
      setFilteredGames(gamesList);
    };
    fetchGames();
  }, []);

  const filterOptions = [
    {
      key: "yearMonth",
      label: "년도와 월",
      type: "yearMonth",
      options: {
        years: [
          ...new Set(games.map((game) => dayjs(game.date).year().toString())),
        ],
        months: [...Array(12).keys()].map((month) => (month + 1).toString()),
      },
    },
    {
      key: "timeOfDay",
      label: "시간대",
      type: "select",
      options: [
        { value: "morning", label: "오전" },
        { value: "afternoon", label: "오후" },
      ],
    },
    {
      key: "venue",
      label: "구장",
      type: "multiSelect",
      options: [...new Set(games.map((game) => game.venue))],
    },
    {
      key: "league",
      label: "리그",
      type: "multiSelect",
      options: [...new Set(games.map((game) => game.league))],
    },
    {
      key: "opponent",
      label: "상대팀",
      type: "string",
    },
    {
      key: "players",
      label: "참여 선수",
      type: "multiSelect",
      options: players.map((player) => ({
        value: player.id,
        label: player.name,
      })),
    },
  ];

  useEffect(() => {
    let filtered = games;

    if (filters.yearMonth) {
      const { year, month } = filters.yearMonth;
      if (year) {
        filtered = filtered.filter(
          (game) => dayjs(game.date).year().toString() === year
        );
      }
      if (month) {
        filtered = filtered.filter(
          (game) => dayjs(game.date).month() === parseInt(month, 10) - 1
        );
      }
    }

    if (filters.timeOfDay) {
      filtered = filtered.filter((game) => {
        const hour = dayjs(game.date).hour();
        return filters.timeOfDay === "morning" ? hour < 12 : hour >= 12;
      });
    }

    if (filters.venue && filters.venue.length > 0) {
      filtered = filtered.filter((game) => filters.venue.includes(game.venue));
    }

    if (filters.league && filters.league.length > 0) {
      filtered = filtered.filter((game) =>
        filters.league.includes(game.league)
      );
    }

    if (filters.players && filters.players.length > 0) {
      filtered = filtered.filter((game) =>
        filters.players.every((playerId) =>
          game.participation.includes(playerId)
        )
      );
    }

    if (filters.opponent) {
      filtered = filtered.filter((game) =>
        game.opponent.includes(filters.opponent)
      );
    }

    setFilteredGames(filtered);
  }, [filters, games]);

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
        경기 조회
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
      <Box mt={2}>
        <Grid container spacing={2}>
          {filteredGames.map((game) => (
            <Grid item xs={12} md={6} lg={4} key={game.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {game.opponent}
                  </Typography>
                  <Typography color="text.secondary">
                    {dayjs(game.date).format("YYYY-MM-DD")}
                  </Typography>
                  <Typography variant="body2">구장: {game.venue}</Typography>
                  <Typography variant="body2">리그: {game.league}</Typography>
                  <Typography variant="body2">
                    참여 선수:{" "}
                    {game.participation
                      .map((playerId) => {
                        const player = players.find((p) => p.id === playerId);
                        return player ? player.name : "Unknown Player";
                      })
                      .join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GameFilter;
