Smart-Summary-Q&A Frontend
A modern React frontend for the Smart-Summary-Q&A platform, offering a user-friendly interface for AI-powered video and document analysis with smart summarization and interactive Q&A capabilities.

✨ Features
Video Intelligence: Analyze YouTube videos and get automatic transcriptions.

Document Intelligence: Process PDFs to extract and summarize key information.

Interactive Q&A: Ask context-aware questions about your videos or documents.

Batch Processing: Process multiple videos at once.

Real-time Status: Live backend connection monitoring.

Responsive Design: A mobile-first design built with Material-UI components.

Dark/Light Theme: Easily switch between dark and light modes.

Progress Tracking: Real-time indicators to monitor processing status.

🛠️ Technology Stack
Framework: React 18

UI Library: Material-UI (MUI)

Routing: React Router DOM

HTTP Client: Axios

Styling: Material-UI theming system

Icons: Material-UI Icons

Build Tool: Create React App

State Management: React Hooks

📋 Prerequisites
Node.js (v16 or higher)

npm or yarn package manager

A backend server running on http://localhost:5000

🔧 Installation
Clone the repository:

Bash

git clone <repository-url>
cd frontend
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm start
The application will be available at http://localhost:3000.

🌐 Available Scripts
npm start: Runs the app in development mode.

npm run build: Builds the app for production in the build folder.

npm test: Launches the test runner.

📁 Project Structure
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/              # Main page components (HomePage, PDFProcessor, etc.)
│   ├── services/           # API service functions
│   ├── App.js              # Main app component and routing
│   ├── index.js            # App entry point
│   └── index.css           # Global styles
└── package.json
🎨 UI Components
Core Pages
Home Page: An overview of the platform's features.

Video Processing: Interface for single and batch YouTube video analysis.

Document AI: Interface for PDF upload and processing.

Q&A System: Interactive question-answering based on content.

About: Information on the technology stack and author.

🔗 API Integration
The frontend communicates with a backend using RESTful API calls. The src/services/api.js file contains all the necessary functions for these calls.

JavaScript

// Example API usage
import { processVideo, uploadPDF, askQuestion } from './services/api';

// Process YouTube video
const videoResult = await processVideo(videoUrl);

// Upload and process PDF
const pdfResult = await uploadPDF(file);

// Ask a question about the content
const answer = await askQuestion(question, context);
🚀 Deployment
Development
Bash

npm start
# Runs on http://localhost:3000
Production Build
Bash

npm run build
# Creates an optimized build in the 'build' folder
Environment Variables
Create a .env file in the root directory to configure the backend API URL.

REACT_APP_API_URL=http://localhost:5000
REACT_APP_APP_NAME=Smart-Summary-Q&A
🧪 Testing
Bash

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
🤝 Contributing
We welcome contributions! Please feel free to fork the repository, create a feature branch, and open a pull request.

📝 License
This project is licensed under the MIT License.

👨‍💻 Author
Bala Lakshmi Vivekananda Reddy

GitHub: @balalakshmivivekanandareddy

Email: vivekanandareddy2303@gmail.com
