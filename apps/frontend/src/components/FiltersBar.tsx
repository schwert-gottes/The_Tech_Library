import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

interface FiltersBarProps {
  types: string[];
  selectedType: string;
  onTypeChange: (value: string) => void;
  searchText: string;
  onSearchTextChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function FiltersBar({
  types,
  selectedType,
  onTypeChange,
  searchText,
  onSearchTextChange,
  totalCount,
  filteredCount,
}: FiltersBarProps) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: 2, md: 2.5 }}
      sx={{
        alignItems: { xs: "stretch", lg: "center" },
        justifyContent: "space-between",
        mb: { xs: 3, sm: 4, lg: 5 },
        gap: { lg: 4 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", lg: 780, xl: 860 },
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search products"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          slotProps={{
            htmlInput: { "aria-label": "Search products" },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: { xs: 48, md: 52 },
              borderRadius: 999,
            },
          }}
        />
        <TextField
          select
          label="Category"
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
          slotProps={{
            select: {
              inputProps: { "aria-label": "Filter products by type" },
            },
          }}
          size="small"
          sx={{
            minWidth: { xs: "100%", sm: 220, lg: 240 },
            "& .MuiOutlinedInput-root": {
              height: { xs: 48, md: 52 },
              borderRadius: 999,
            },
          }}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: { xs: "flex-start", lg: "flex-end" },
          minWidth: { lg: 190 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: { xs: 13, lg: 14 },
            whiteSpace: "nowrap",
          }}
        >
          <Box component="span" sx={{ color: "text.primary", fontWeight: 800 }}>
            {filteredCount}
          </Box>{" "}
          of {totalCount} results found
        </Typography>
      </Stack>
    </Stack>
  );
}
