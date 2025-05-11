"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Next.js 14 + MUI 예제
          </Typography>
          <Button color="inherit">로그인</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js 14와 MUI 통합 예제
          </Typography>

          <Item elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              카운터: {count}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setCount(count + 1)}
              sx={{ mr: 2 }}
            >
              증가
            </Button>
            <Button variant="outlined" onClick={() => setCount(0)}>
              리셋
            </Button>
          </Item>
        </Box>
      </Container>
    </>
  );
}
