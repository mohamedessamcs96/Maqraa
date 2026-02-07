# Maqra'ah Platform - Quick Start Guide

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```

### Demo Accounts
Use these credentials to test the platform:

| Role | Email | Password |
|------|-------|----------|
| Learner | user@example.com | 123456 |
| Teacher | teacher@example.com | 123456 |
| Admin | admin@example.com | 123456 |

## 📍 Navigation Map

### Public Pages (No Login Required)
- `/landing` - Landing page with platform overview
- `/signup` - User registration page
- `/login` - Login page
- `/learner/teachers` - Browse all teachers (guest access)

### Learner Pages
- `/learner/onboarding` - Setup preferences
- `/learner/dashboard` - Main dashboard
- `/learner/teachers` - Browse and search teachers
- `/learner/teacher/:id` - View teacher profile
- `/learner/book/:teacherId` - Book a session (TODO)
- `/learner/payment/:sessionId` - Payment page (TODO)
- `/learner/sessions` - My sessions (TODO)
- `/learner/sessions/:id` - Session details (TODO)
- `/learner/rate/:sessionId` - Rate session (TODO)

### Teacher Pages
- `/teacher/application` - Apply as teacher (TODO)
- `/teacher/application-status` - Check application status (TODO)
- `/teacher/services` - Setup services (TODO)
- `/teacher/availability` - Set availability (TODO)
- `/teacher/dashboard` - Earnings dashboard (TODO)
- `/teacher/sessions` - My sessions (TODO)

### Admin Pages
- `/admin/dashboard` - Admin home (TODO)
- `/admin/applications` - Review applications (TODO)
- `/admin/review/:id` - Review single application (TODO)
- `/admin/pricing` - Approve pricing (TODO)
- `/admin/sessions` - Monitor sessions (TODO)
- `/admin/financials` - Financial management (TODO)
- `/admin/reports` - Analytics & reports (TODO)

## 🎯 User Flows to Try

### As a New Learner
1. Click "Sign Up" on landing page
2. Register with email/password
3. Choose "Learner" role
4. Complete 4-step onboarding
5. Browse teachers with filters
6. Click teacher to view profile
7. View upcoming sessions on dashboard

### As a Teacher
1. Click "Sign Up"
2. Choose "Teacher" role
3. Fill application form with documents (TODO)
4. Check application status (TODO)
5. Set up services and pricing (TODO)
6. Define availability (TODO)

### As Admin
- Navigate to `/admin/dashboard` (TODO)
- Review teacher applications (TODO)
- Manage pricing (TODO)
- View analytics (TODO)

## 📱 Feature Testing Checklist

### Authentication
- [x] Landing page loads
- [x] Sign up with new email
- [x] Login with credentials
- [x] Switch between roles
- [ ] Forgot password link (TODO)
- [ ] Session persistence

### Learner
- [x] Onboarding form completes
- [x] Teacher search works
- [x] Filter by service/rating/price works
- [x] Teacher profile displays
- [x] Dashboard shows stats
- [ ] Book session flow (TODO)
- [ ] Payment processing (TODO)
- [ ] Session management (TODO)

### Responsiveness
- [x] Mobile layout (< 640px)
- [x] Tablet layout (640px - 1024px)
- [x] Desktop layout (> 1024px)
- [x] RTL text direction

## 🔧 Customization

### Changing Colors
Edit color values in pages (search for #486837 or #ad9f4e):
```tsx
style={{ backgroundColor: '#486837' }} // Green
style={{ backgroundColor: '#ad9f4e' }} // Gold
```

### Adding Mock Data
Edit `src/app/data/mockData.ts`:
```ts
export const mockTeachers: Teacher[] = [
  // Add more teacher objects
];
```

### Modifying Form Validation
Edit validation logic in auth pages:
```ts
const validateForm = () => {
  const newErrors: Record<string, string> = {};
  // Add custom validation rules
};
```

## 🐛 Troubleshooting

### Pages Not Loading
- Check that page component is exported correctly
- Verify file path in imports
- Check browser console for errors

### Navigation Not Working
- Ensure onNavigate function is passed correctly
- Check that routing is set up in App.tsx
- Verify page paths match navigation calls

### Form Not Validating
- Check validation logic in page component
- Verify error state is being set
- Confirm error messages are displayed

## 📝 Code Organization

```
src/app/
├── pages/                 # Full page components
│   ├── auth/             # Authentication pages
│   ├── learner/          # Learner interface pages
│   ├── teacher/          # Teacher interface pages
│   └── admin/            # Admin dashboard pages
├── components/
│   ├── shared/           # Reusable components
│   └── (other existing)
├── types/                # TypeScript interfaces
├── data/                 # Mock data
├── hooks/                # Custom React hooks
└── App.tsx              # Main app routing
```

## 🎨 Design Guidelines

- **Colors**: Green (#486837) for primary actions, Gold (#ad9f4e) for highlights
- **Spacing**: Use Tailwind's p-4, p-6, p-8 for padding
- **Borders**: Use rounded-lg, rounded-xl, rounded-2xl
- **Shadows**: shadow-md for cards, shadow-lg for modals
- **Text**: RTL (right-to-left) layout throughout
- **Animations**: Use motion/react with standard timing

## 📚 Key Components

### ChatWidget
Embedded messaging for sessions:
```tsx
<ChatWidget 
  sessionId="session-1"
  messages={messages}
  onSendMessage={handleSend}
/>
```

### NotificationToast
Show success/error notifications:
```tsx
<NotificationToast 
  notification={notification}
  onDismiss={handleDismiss}
/>
```

### useAuth Hook
Get authentication state:
```tsx
const { user, isAuthenticated, login, logout } = useAuth();
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy
```

### Environment Variables
```
VITE_API_URL=https://api.maqraa.com
VITE_APP_NAME=Maqra'ah
```

## 📊 Project Status

| Module | Status | Pages | Notes |
|--------|--------|-------|-------|
| Auth | ✅ Complete | 3 | Landing, Sign Up, Login |
| Learner Core | ✅ Complete | 4 | Onboarding, Browse, Profile, Dashboard |
| Learner Extended | 🚧 TODO | 5 | Book, Payment, Sessions, Details, Review |
| Teacher | 🚧 TODO | 7 | Application, Status, Services, Availability, Dashboard, Sessions |
| Admin | 🚧 TODO | 7 | Dashboard, Applications, Pricing, Sessions, Financials, Reports |
| Shared | ✅ Complete | 3 | Chat, Notifications, Types |

## 📞 Support

For issues or questions:
1. Check IMPLEMENTATION_ROADMAP.md for details
2. Review PLATFORM_PROGRESS.md for status
3. Check console for error messages
4. Review mock data in mockData.ts

## ✅ Completion Checklist

- [x] Auth module complete
- [x] Learner core pages complete
- [x] Mock data set up
- [x] Types defined
- [x] Shared components created
- [ ] Routing in App.tsx
- [ ] All learner pages complete
- [ ] All teacher pages complete
- [ ] All admin pages complete
- [ ] Testing completed
- [ ] Deployment ready

---

**Version**: 1.0.0 MVP  
**Last Updated**: February 7, 2026  
**Ready for**: Frontend testing & user feedback
