// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// module.exports = app;









// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // 👇 CORS middleware setup (make sure this is ABOVE all routes!)
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true,
// }));

// // 👇 JSON parser
// app.use(express.json());

// // 👇 Import routes
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

const express = require('express');
const app = express();

// existing middlewares...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);  // ✅ Now accessible via /api/posts

module.exports = app;
