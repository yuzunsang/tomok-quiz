"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          로그인
        </Typography>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            fullWidth
            sx={{
              backgroundColor: "#4285F4",
              color: "white",
              "&:hover": {
                backgroundColor: "#3367D6",
              },
              py: 1.5,
            }}
          >
            {isLoading ? "로그인 중..." : "Google 계정으로 로그인"}
          </Button>

          <Button variant="outlined" onClick={() => router.push("/")} fullWidth>
            홈으로 돌아가기
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
