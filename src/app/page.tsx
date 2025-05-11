"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Navbar from "./_components/Navbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            홈
          </Typography>

          {session && (
            <Item elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                환영합니다, {session.user?.name || "사용자"}님!
              </Typography>
              <Typography>
                성공적으로 Google 계정으로 로그인했습니다.
              </Typography>
            </Item>
          )}

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
