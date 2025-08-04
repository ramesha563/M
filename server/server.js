// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path'); // ✅ required for __dirname
// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');

// dotenv.config();

// const app = express();

// // Allow frontend access
// app.use(cors({
//   // origin: 'http://localhost:5173', // ✅ hardcoded for now
//     origin: "*",
//   credentials: true
// }));

// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);

// // Connect DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('DB error:', err));

// // Start server
// const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





//  // ✅ Now available at http://localhost:5050/api/posts












const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require("./routes/contactRoutes");


dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use("/api/contact", contactRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB error:', err));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
