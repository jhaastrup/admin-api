"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config(); // Load environment variables from .env file
var student_1 = __importDefault(require("../src/routes/student"));
var admin_1 = __importDefault(require("../src/routes/admin"));
var course_1 = __importDefault(require("../src/routes/course"));
var app = (0, express_1.default)();
// Set up middleware
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
// MongoDB connection URI from .env file
var mongoURI = process.env.DB_URI;
// Connect to MongoDB
mongoose_1.default.connect(mongoURI, {
//useNewUrlParser: true,
//useUnifiedTopology: true,
})
    .then(function () {
    console.log('MongoDB connected successfully');
})
    .catch(function (err) {
    console.error('MongoDB connection error:', err);
});
// Define routes
app.get('/', function (req, res) {
    res.send('Welcome to Kidsthatcode LMS!');
});
app.use('/api/students', student_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/courses', course_1.default);
// Set up error handling middleware
app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Define port
var PORT = process.env.PORT || 4000;
// Start the server
app.listen(PORT, function () {
    console.log("Kidsthatcode Server is running on http://localhost:".concat(PORT, " \uD83D\uDE80"));
});
//# sourceMappingURL=index.js.map