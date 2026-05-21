import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { ElementType } from "react";

interface EmptyStateProps {
  icon: ElementType<SvgIconProps>;
  title: string;
  description: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 300,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "24px",
        bgcolor: "rgba(255, 255, 255, 0.72)",
        px: 3,
        py: 7,
        textAlign: "center",
      })}
    >
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          borderRadius: "50%",
          bgcolor: "rgba(91, 80, 255, 0.1)",
          color: "primary.main",
          mb: 2,
        }}
      >
        <Icon sx={{ fontSize: 34 }} aria-hidden="true" />
      </Stack>
      <Typography variant="h6" component="h3" sx={{ fontWeight: 900 }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, maxWidth: 380, lineHeight: 1.7 }}
      >
        {description}
      </Typography>
    </Box>
  );
}
