# Gemastik PWA

A modern Progressive Web App built with React.js, Supabase, and Tailwind CSS.

## Features



## Tech Stack


## Getting Started

### Prerequisites

- Node.js 16+ 
- pnpm (install with `npm install -g pnpm`)  
  Note: You can use npm instead of pnpm; commands for both are shown below.
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Gemastik2025/frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your URL and anon key
   - Enable Authentication providers as needed

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

### Building for Production

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets and PWA icons
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries (Supabase config)
│   ├── assets/         # Images, fonts, etc.
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `pnpm dev` (or `npm run dev`) - Start development server
- `pnpm build` (or `npm run build`) - Build for production
- `pnpm preview` (or `npm run preview`) - Preview production build
- `pnpm lint` (or `npm run lint`) - Run ESLint

## Features Overview



## Supabase Setup

1. Create tables as needed for your application
2. Set up Row Level Security (RLS) policies
3. Configure authentication providers
4. Set up real-time subscriptions if needed

Example user profile table:
```sql
create table profiles (
  id uuid references auth.users on delete cascade,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  primary key (id),
  constraint username_length check (char_length(username) >= 3)
);

## License

This project is licensed under the MIT License - see the LICENSE file for details.
