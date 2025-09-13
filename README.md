# CNC Share

A modern web platform for sharing CNC (Computer Numerical Control) files. Users can upload, search, and download CNC files with rich previews, descriptions, and community features.

## Features

- **File Upload**: Upload CNC files with descriptions and preview images
- **Search & Discovery**: Search files by title or description
- **Rich Previews**: View files with image previews and markdown descriptions
- **User Authentication**: Secure login via Discord OAuth
- **File Management**: Download, report, and delete files (owners only)
- **Admin Panel**: Moderate reported content
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with Discord provider
- **File Storage**: UploadThing
- **API**: tRPC
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Discord application for OAuth (get credentials from [Discord Developer Portal](https://discord.com/developers/applications))
- UploadThing account for file storage

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cnc-share.git
   cd cnc-share
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in the following variables in `.env`:

   - `AUTH_SECRET`: Generate with `npx auth secret`
   - `AUTH_DISCORD_ID`: Your Discord app client ID
   - `AUTH_DISCORD_SECRET`: Your Discord app client secret
   - `DATABASE_URL`: PostgreSQL connection string
   - `UPLOADTHING_SECRET`: Your UploadThing secret key
   - `UPLOADTHING_APP_ID`: Your UploadThing app ID

4. Set up the database:

   ```bash
   # Start PostgreSQL (if using local)
   ./start-database.sh

   # Generate and run migrations
   npm run db:generate
   npm run db:migrate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Uploading Files

1. Sign in with Discord
2. Navigate to `/upload`
3. Fill in title, description (supports Markdown), and upload CNC file
4. Optionally add preview images
5. Submit to share with the community

### Searching Files

- Use the search bar on the homepage or `/search` page
- Search by file title or description
- Browse results in a responsive grid layout

### Viewing Files

- Click on any file card to view details
- See author, upload date, description, and previews
- Download the file or report inappropriate content

### Admin Features

- Access `/admin` to view and manage reported files
- Moderate content as needed

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run preview` - Preview production build
- `npm run check` - Run linting and type checking
- `npm run lint` - Run ESLint
- `npm run format:check` - Check code formatting
- `npm run format:write` - Format code
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:generate` - Generate database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── file/[id]/      # Individual file pages
│   ├── upload/         # File upload page
│   └── ...
├── components/         # Reusable UI components
├── lib/               # Utility functions
├── server/            # Server-side code
│   ├── api/           # tRPC routers
│   ├── auth/          # Authentication config
│   └── db/            # Database schema and connection
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and run tests
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
