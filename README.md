# 🎥 YouTranscript

**AI-Powered YouTube Transcription Service**

Transform any YouTube video into accurate transcripts with AI-powered summaries, speaker identification, and advanced analytics. Built for content creators, researchers, and anyone who needs professional transcription services.

## ✨ Features

### 🎯 Core Transcription
- **Accurate Transcription**: AI-powered speech-to-text with high accuracy
- **YouTube Integration**: Support for all YouTube URL formats
- **Multiple Export Formats**: TXT, Markdown, JSON, SRT subtitles
- **Real-time Processing**: Live progress tracking for transcription jobs

### 🧠 AI-Powered Features
- **Intelligent Summaries**: AI-generated summaries in multiple formats
- **Chat with Transcripts**: Ask questions about your transcripts using RAG
- **Speaker Identification**: Automatic speaker diarization and labeling
- **Content Analytics**: Sentiment analysis, keyword extraction, and insights

### 📊 Professional Dashboard
- **Usage Tracking**: Monitor your transcription usage and limits
- **File Management**: Organize transcripts with search and filtering
- **Team Collaboration**: Share transcripts and collaborate with team members
- **Comprehensive Analytics**: Detailed insights into your content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yakoubeth/youtranscript.git
   cd youtranscript
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=your-database-url
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 💰 Pricing Tiers

### 🆓 Free Trial
- **Duration**: 14 days
- **Transcripts**: 5 transcriptions
- **Features**: Basic transcription, TXT export
- **Support**: Community support

### 💼 Pro Plan - $10/month
- **Transcripts**: 100 per month
- **Features**: All export formats, AI summaries, priority processing
- **Video Length**: Up to 2 hours per video
- **Support**: Email support

### 👑 Ultra Plan - $25/month
- **Transcripts**: Unlimited
- **Features**: Everything in Pro + Chat with transcripts, speaker ID, analytics
- **Video Length**: Unlimited
- **Support**: Priority support + phone

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **NextAuth.js**: Authentication solution

### Backend & Database
- **SQLite**: Local development database
- **Prisma**: Type-safe database ORM
- **NextAuth.js**: Session management

### AI & Services
- **OpenAI Whisper**: Speech-to-text transcription
- **OpenAI GPT-4**: AI summaries and chat features
- **YouTube API**: Video metadata and processing

## 📁 Project Structure

```
youtranscript/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Authentication pages
│   │   ├── signup/
│   │   ├── dashboard/      # User dashboard
│   │   └── forgot-password/
│   ├── components/         # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   └── lib/               # Utility functions and configurations
├── public/                # Static assets
├── prisma/               # Database schema and migrations
└── docs/                # Documentation
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Development Guidelines

1. **Code Style**: Follow the ESLint and Prettier configurations
2. **Components**: Use TypeScript for all components with proper type definitions
3. **Database**: Use Prisma for all database operations
4. **Authentication**: Leverage NextAuth.js for user management
5. **Styling**: Use Tailwind CSS utilities for consistent design

## 📊 Current Status

### ✅ Completed (Phase 1-2)
- [x] Modern, responsive landing page
- [x] Complete authentication system (signup, login, password reset)
- [x] Professional user dashboard with subscription management
- [x] User profile and settings management
- [x] Database integration with SQLite
- [x] Accessibility compliance (WCAG guidelines)

### 🚧 In Development (Phase 3)
- [ ] YouTube URL validation and processing
- [ ] Audio extraction pipeline
- [ ] Transcription service integration
- [ ] Real-time progress tracking
- [ ] File processing and management

### 📅 Upcoming Features (Phase 4+)
- [ ] AI-powered summaries
- [ ] Chat with transcripts (RAG system)
- [ ] Speaker identification
- [ ] Advanced analytics and insights
- [ ] Team collaboration features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@youtranscript.com
- **Documentation**: [docs.youtranscript.com](https://docs.youtranscript.com)
- **Issues**: [GitHub Issues](https://github.com/yakoubeth/youtranscript/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [OpenAI](https://openai.com/) - AI-powered transcription and features
- [Prisma](https://prisma.io/) - Type-safe database toolkit

---

**Built with ❤️ for content creators, researchers, and anyone who values accessible content.**
