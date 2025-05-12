import { useState, useEffect, FormEvent } from "react";
import { Card } from "@/types/card";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// 초기 폼 상태
const initialFormState: Omit<Card, "_id"> = {
  title: "",
  description: "",
};

export default function Cards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // 카드 목록 불러오기
  const fetchCards = async () => {
    try {
      const response = await fetch("/api/cards");
      const result = await response.json();
      if (result.success) {
        setCards(result.data);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  // 페이지 로드 시 카드 목록 불러오기
  useEffect(() => {
    fetchCards();
  }, []);

  // 폼 입력 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 카드 생성
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setFormData(initialFormState);
        fetchCards();
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  // 카드 삭제
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        fetchCards();
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // 편집 모드 시작
  const handleEdit = (card: Card) => {
    const cardId = card._id?.toString() || "";
    setEditingId(cardId);
    setFormData({
      title: card.title,
      description: card.description,
    });
    setOpenDialog(true);
  };

  // 카드 업데이트
  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const response = await fetch(`/api/cards/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setFormData(initialFormState);
        setEditingId(null);
        setOpenDialog(false);
        fetchCards();
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        카드 관리
      </Typography>

      {/* 카드 생성 폼 */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          새 카드 추가
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            name="title"
            label="제목"
            variant="outlined"
            size="small"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            label="상세설명"
            variant="outlined"
            size="small"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            추가
          </Button>
        </Box>
      </Box>

      {/* 카드 목록 */}
      <Typography variant="h6" gutterBottom>
        카드 목록
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>상세설명</TableCell>
              <TableCell>생성일</TableCell>
              <TableCell width="150">작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  카드가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              cards.map((card) => (
                <TableRow key={card._id?.toString()}>
                  <TableCell>{card.title}</TableCell>
                  <TableCell>{card.description}</TableCell>
                  <TableCell>
                    {card.createdAt
                      ? new Date(card.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(card)}
                      >
                        편집
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(card._id?.toString() || "")}
                      >
                        삭제
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 편집 다이얼로그 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>카드 정보 수정</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="title"
              label="제목"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              name="description"
              label="상세설명"
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleUpdate} variant="contained">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
