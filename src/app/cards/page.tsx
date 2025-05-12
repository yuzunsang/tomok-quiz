"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import Cards from "@/components/Cards";
import Navbar from "@/components/Navbar";

export default function Page() {
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
      <Cards />
    </>
  );
}
