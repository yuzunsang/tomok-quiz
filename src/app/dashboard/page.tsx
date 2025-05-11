"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Navbar from "../_components/Navbar";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography variant="h5">로딩 중...</Typography>
          </Box>
        </Container>
      </>
    );
  }

  if (!session) {
    return null; // useEffect에서 리디렉션 처리
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            대시보드
          </Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              안녕하세요, {session.user?.name || "사용자"}님!
            </Typography>
            <Typography variant="body1">
              이메일: {session.user?.email || "이메일 정보 없음"}
            </Typography>
          </Paper>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ mb: 4 }}
          >
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  프로필 정보
                </Typography>
                <Typography variant="body2">
                  회원님의 프로필 정보를 관리할 수 있습니다.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  설정
                </Typography>
                <Typography variant="body2">
                  계정 설정 및 환경 설정을 변경할 수 있습니다.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  활동 내역
                </Typography>
                <Typography variant="body2">
                  최근 활동 내역을 확인할 수 있습니다.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
