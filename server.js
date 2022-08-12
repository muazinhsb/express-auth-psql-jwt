const express = require("express");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { dirname, join } = require("path");
const { fileURLToPath } = require("url");
const membersRouter = require("./routes/members.route");
const adminRouter = require("./routes/admin.route");
const authRouter = require("./routes/auth.route");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const corsOption = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRouter);
app.use("/api/members", membersRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
