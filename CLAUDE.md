# DORIV - From Notes to Memory

## Project Overview

DORIV is a flashcard-based learning platform that helps users transform their notes into long-term memory. Import your Notion pages, automatically generate flashcards, and leverage spaced repetition to master any subject.

**Core Values:**
- Don't just write - start thinking
- Transform notes into lasting memories
- Efficient spaced repetition learning

**Tech Stack:**
- **Frontend:** Next.js 16.1.6 (App Router), TypeScript, Tailwind CSS v3
- **Authentication:** OAuth 2.0 (Google, Kakao) with PKCE flow
- **Design System:** Neo-Brutalism
- **State Management:** React Hooks + localStorage

---

## Project Structure

```
doriv-fe/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx              # Login page
│   │   ├── main/page.tsx         # Main dashboard
│   │   ├── oauth/                # OAuth callback pages
│   │   │   ├── google/callback/
│   │   │   └── kakao/callback/
│   │   └── api/                  # Next.js API Routes
│   │       └── oauth/
│   │           ├── login/        # OAuth login handler
│   │           ├── refresh/      # Token refresh
│   │           └── user/         # User info
│   ├── components/               # Reusable React components
│   │   └── Header.tsx
│   ├── lib/                      # Utility functions
│   │   ├── api/                  # API client functions
│   │   │   └── auth.ts
│   │   └── utils/                # Helper utilities
│   │       └── oauth.ts
│   └── types/                    # TypeScript type definitions
│       └── auth.ts
├── public/                       # Static assets
│   └── icons/
├── .env.local                    # Environment variables (not committed)
├── .env.local.example            # Environment variables template
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── CLAUDE.md                     # This file
```

---

## Development Conventions

### Commit Message Convention

We follow **Conventional Commits** specification for clear and consistent commit history.

**Format:**
```
<type>: <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting (no code change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Build process, dependencies, or tooling changes
- `perf:` - Performance improvements
- `ci:` - CI/CD configuration changes

**Examples:**
```bash
feat: add OAuth token refresh functionality
fix: resolve login redirect issue
docs: update API documentation
style: format code with prettier
refactor: simplify authentication logic
test: add unit tests for auth module
chore: update dependencies
```

**Commit Message Guidelines:**
1. Use imperative mood ("add" not "added" or "adds")
2. Keep subject line under 72 characters
3. Capitalize first letter of subject
4. No period at the end of subject
5. Include `Co-Authored-By` for AI-assisted commits

**Example with body:**
```bash
feat: implement logout functionality with redirect

Add logout button in Header component with dropdown menu.
When user logs out, clear all tokens and redirect to login page.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Code Style Conventions

**TypeScript:**
- Use TypeScript for all files
- Avoid `any` type - use proper type definitions
- Define interfaces for all component props
- Use type inference where possible

**React Components:**
- Use functional components with hooks
- Prefix event handlers with `handle` (e.g., `handleClick`)
- Use descriptive variable names

**Naming Conventions:**
- **Components:** PascalCase (`LoginPage`, `DashboardCard`)
- **Functions:** camelCase (`handleClick`, `fetchData`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)
- **Files:** kebab-case (`user-profile.tsx`, `api-client.ts`)
- **Interfaces/Types:** PascalCase (`UserData`, `AuthResponse`)

**File Organization:**
- One component per file
- Export default for main component
- Named exports for utilities/types
- Keep files under 300 lines

### Git Workflow

**Branch Naming:**
- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation
- `refactor/component-name` - Refactoring

**Pull Request Guidelines:**
- Use conventional commit format in PR title
- Include description of changes
- Reference related issues
- Request code review before merging

**Code Review:**
- Check for type safety
- Verify Neo-Brutalism design adherence
- Test OAuth flow manually
- Ensure responsive design

---

## Design System: Neo-Brutalism

### Design Philosophy

Neo-Brutalism uses bold, direct visual language to emphasize clarity and functionality.

**Core Principles:**

1. **Bold Black Borders (3-4px)**
   - Apply thick black borders to all UI elements
   - Provides clear boundaries and separation

2. **Strong Color Contrast**
   - Use pure, highly saturated colors
   - Clear contrast between background and elements

3. **Hard Shadows**
   - Use solid offset shadows instead of soft shadows
   - Typically `shadow-[4px_4px_0px_rgba(0,0,0,1)]` or `shadow-[8px_8px_0px_rgba(0,0,0,1)]`

4. **Geometric Shapes**
   - Use simple, clear geometric shapes
   - **No emojis** - Implement all icons with pure CSS

5. **Flat Design**
   - Minimize gradients
   - Use solid colors for backgrounds and elements

### Color Palette

```css
/* Primary Colors */
--primary-yellow: #e8c547; /* Main background */
--kakao-yellow: #fee500;   /* Kakao button, accent */

/* Neutral Colors */
--white: #ffffff;
--black: #000000;
--gray-100: #fafafa;       /* Light background */
--gray-300: #e8e8e8;       /* Medium background */
--gray-600: #666666;       /* Secondary text */

/* Accent Colors */
--blue: #4a90e2;           /* Info, statistics */
--light-blue: #d8e5f0;     /* Egg white */
--cyan: #4ecdc4;           /* Accent */
--red: #ff4444;            /* Warning, error */
--coral: #ff6b6b;          /* Emphasis */
--green: #90ee90;          /* Success, beginner */
--yellow-gold: #ffd93d;    /* Egg yolk */
```

### Typography

```css
/* Font Family */
font-family: Arial, Helvetica, sans-serif;

/* Font Sizes */
--text-xs: 11px;           /* Small labels */
--text-sm: 13-14px;        /* Body, buttons */
--text-md: 18px;           /* Subtitles */
--text-lg: 24px;           /* Titles */
--text-xl: 32px;           /* Large titles */
--text-2xl: 48px;          /* Statistics numbers */
```

**Rules:**
- Always use `font-bold` for titles
- Use `font-semibold` or `font-bold` for button text
- Use `text-gray-600` for secondary text

### Component Patterns

#### 1. Card

```tsx
<div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
  {/* Card content */}
</div>
```

**Variants:**
- Large card: `border-4`, `shadow-[8px_8px_0px_rgba(0,0,0,1)]`
- Small card: `border-2`, `shadow-[2px_2px_0px_rgba(0,0,0,1)]`

#### 2. Button

```tsx
{/* Primary Button */}
<button className="px-6 py-3 bg-[#FEE500] text-black border-2 border-black rounded font-bold hover:-translate-y-0.5 active:translate-y-0 transition-transform">
  Button Text
</button>

{/* Secondary Button */}
<button className="px-6 py-3 bg-white text-black border-2 border-black rounded font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-transform">
  Button Text
</button>
```

**Rules:**
- Always use 2px+ black border
- On hover: `-translate-y-0.5` (slight upward movement)
- On active: `translate-y-0` (return to position)
- Use `transition-transform`

#### 3. Badge

```tsx
<span className="bg-black text-white px-3 py-1 text-xs rounded font-bold">
  Label
</span>
```

**Variants:**
- Beginner: `bg-[#90EE90] text-black border-2 border-black`
- Advanced: `bg-[#FF6B6B] text-white border-2 border-black`

#### 4. Input Field

```tsx
<div className="flex items-center border-2 border-black rounded overflow-hidden">
  <input
    type="text"
    className="flex-1 px-4 py-2.5 border-0 outline-none text-sm"
    placeholder="Enter text..."
  />
</div>
```

#### 5. Icons

**⚠️ Important: No Emojis!**

All icons must be implemented with pure CSS.

**Examples:**

```tsx
{/* Search Icon */}
<div className="w-4 h-4 border-2 border-black rounded-full relative">
  <div className="absolute -bottom-[6px] -right-[6px] w-[2px] h-[6px] bg-black rotate-45"></div>
</div>

{/* User Profile Icon */}
<div className="w-11 h-11 rounded-full bg-[#E8E8E8] border-2 border-black flex items-center justify-center relative overflow-hidden">
  <div className="absolute top-[8px] w-[14px] h-[14px] bg-black rounded-full"></div>
  <div className="absolute bottom-[2px] w-[24px] h-[16px] bg-black rounded-t-full"></div>
</div>

{/* Warning Icon */}
<div className="flex flex-col items-center gap-[2px]">
  <div className="w-[3px] h-[10px] bg-black rounded-full"></div>
  <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
</div>
```

### Layout Principles

1. **Spacing**
   - Card gap: `gap-5` or `gap-8`
   - Internal padding: `p-6` ~ `p-10`
   - Section spacing: `mb-8`

2. **Responsive Design**
   ```tsx
   // 2-column layout
   <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
   ```

3. **Max Width**
   - Container: `max-w-[1400px]`
   - Login card: `max-w-[900px]`

---

## Key Pages

### 1. Login Page (`/`)

**Components:**
- EST. 2026 badge
- DORIV logo
- Title: "From Notes to Memory"
- Description: "Don't just write. Start thinking."
- Google login button
- Kakao login button
- Terms of Service / Privacy Policy links
- Egg illustration (Neo-Brutalism style)

### 2. Main Dashboard (`/main`)

**Components:**
- Header (logo, search bar, profile)
- Welcome message
- Recent notes card
- Import Notion page card
- Statistics (flashcards, retention rate)
- Problem list sidebar

---

## Development Guide

### Adding New Components

1. **Design Review**
   - Verify Neo-Brutalism principles adherence
   - Apply bold borders, strong contrast, hard shadows

2. **Icon Implementation**
   - ⚠️ Never use emojis
   - Implement with pure CSS
   - Maintain geometric shapes

3. **Color Selection**
   - Use defined color palette
   - Discuss with team if new colors needed

4. **Responsive Testing**
   - Test on mobile, tablet, desktop
   - Use Tailwind responsive prefixes (sm:, md:, lg:)

### Running Development Server

```bash
npm run dev
# http://localhost:3000
```

### Build

```bash
npm run build
npm run start
```

---

## API Documentation

### Authentication Endpoints

#### POST `/api/oauth/login`
OAuth login with Google or Kakao

**Request:**
```json
{
  "provider": "google" | "kakao",
  "code": "authorization_code",
  "redirectUri": "callback_url",
  "codeVerifier": "pkce_verifier"
}
```

**Response:**
```json
{
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "tokenType": "bearer",
    "expiresIn": 3600,
    "refreshTokenExpiresIn": 604800
  },
  "user": {
    "userId": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "profileImage": "https://..."
  },
  "isNewUser": false
}
```

#### POST `/api/oauth/refresh`
Refresh access token

**Request:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:** Same as login response

#### GET `/api/oauth/user`
Get current user info

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "profileImage": "https://..."
}
```

---

## Environment Variables

Create `.env.local` file based on `.env.local.example`:

```bash
# API Base URL
NEXT_PUBLIC_API_BASE_URL=

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/oauth/google/callback
GOOGLE_CLIENT_SECRET=your_client_secret

# Kakao OAuth
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_client_id
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/oauth/kakao/callback
KAKAO_CLIENT_SECRET=your_client_secret
```

**Security Notes:**
- Never commit `.env.local` to Git
- Verify `.env.local` is in `.gitignore`
- Keep client secrets confidential

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Neo-Brutalism Design Guide](https://hype4.academy/articles/design/neubrutalism-is-taking-over-web)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Last Updated:** 2026-02-10
**Authors:** Development Team + Claude
