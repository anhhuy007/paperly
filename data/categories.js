const categories = [
  {
    id: 1,
    name: "Thời sự",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 11,
    name: "Tin nóng",
    parent_name: "Thời sự",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 12,
    name: "Chính trị",
    parent_name: "Thời sự",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 13,
    name: "Kinh tế",
    parent_name: "Thời sự",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 14,
    name: "Xã hội",
    parent_name: "Thời sự",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Giải trí",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 21,
    name: "Sao",
    parent_name: "Giải trí",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 22,
    name: "Phim ảnh",
    parent_name: "Giải trí",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 23,
    name: "Âm nhạc",
    parent_name: "Giải trí",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 24,
    name: "Sự kiện",
    parent_name: "Giải trí",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 25,
    name: "Lifestyle",
    parent_name: "Giải trí",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Thể thao",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 31,
    name: "Bóng đá",
    parent_name: "Thể thao",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 32,
    name: "Cầu lông",
    parent_name: "Thể thao",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 33,
    name: "Quần vợt",
    parent_name: "Thể thao",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 34,
    name: "Bơi lội",
    parent_name: "Thể thao",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 4,
    name: "Sức khỏe",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 41,
    name: "Chế độ ăn uống",
    parent_name: "Sức khỏe",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 42,
    name: "Bệnh học",
    parent_name: "Sức khỏe",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 43,
    name: "Tập luyện",
    parent_name: "Sức khỏe",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 5,
    name: "Công nghệ",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 51,
    name: "Điện thoại",
    parent_name: "Công nghệ",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 52,
    name: "Máy tính",
    parent_name: "Công nghệ",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 53,
    name: "AI",
    parent_name: "Công nghệ",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 54,
    name: "Internet",
    parent_name: "Công nghệ",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 55,
    name: "Gadget",
    parent_name: "Công nghệ",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 6,
    name: "Du lịch",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 61,
    name: "Kinh nghiệm",
    parent_name: "Du lịch",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 62,
    name: "Ẩm thực",
    parent_name: "Du lịch",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 63,
    name: "Khám phá",
    parent_name: "Du lịch",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 64,
    name: "Điểm đến",
    parent_name: "Du lịch",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 7,
    name: "Khoa học",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 71,
    name: "Vũ trụ",
    parent_name: "Khoa học",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 72,
    name: "Công nghệ sinh học",
    parent_name: "Khoa học",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 73,
    name: "Môi trường",
    parent_name: "Khoa học",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 74,
    name: "Khám phá",
    parent_name: "Khoa học",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 8,
    name: "Văn hóa",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 81,
    name: "Lịch sử",
    parent_name: "Văn hóa",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 82,
    name: "Truyền thống",
    parent_name: "Văn hóa",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 83,
    name: "Nghệ thuật",
    parent_name: "Văn hóa",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 84,
    name: "Sách",
    parent_name: "Văn hóa",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 9,
    name: "Môi trường",
    parent_name: null,
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 91,
    name: "Biến đổi khí hậu",
    parent_name: "Môi trường",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 92,
    name: "Ô nhiễm",
    parent_name: "Môi trường",
    created_at: "2024-11-27T00:00:00.000Z",
  },
  {
    id: 93,
    name: "Động vật hoang dã",
    parent_name: "Môi trường",
    created_at: "2024-11-27T00:00:00.000Z",
  },
];

export default categories;