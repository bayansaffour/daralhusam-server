require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

// اتصال بقاعدة البيانات
const connectDB = require("./config/db");
connectDB();

// استدعاء المسارات
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const successStoryRoutes = require("./routes/successStoryRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const traineeRoutes = require("./routes/traineeRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const individualPartnerRoutes = require("./routes/individualPartnerRoutes");
const programRoutes = require("./routes/programRoutes");
const registerRoutes = require("./routes/register");
const homeRoutes = require("./routes/homeRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// إنشاء التطبيق
const app = express();
const PORT = process.env.PORT || 5000;

// التأكد من وجود مجلد uploads
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// تقديم الملفات الثابتة
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// استخدام المسارات
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", volunteerRoutes);
app.use("/api", trainerRoutes);
app.use("/api", traineeRoutes);
app.use("/api", partnerRoutes);
app.use("/api", individualPartnerRoutes);
app.use("/api/add", subscriberRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/success", successStoryRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRoutes);

// التعامل مع الأخطاء العامة
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: "حدث خطأ في الخادم",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
