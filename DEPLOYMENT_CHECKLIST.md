# Production Deployment Checklist

## Pre-Build Verification

- [ ] All source files have no syntax errors
- [ ] No console warnings or errors in development
- [ ] All routes are functional
- [ ] API endpoints are working
- [ ] Contact form submits successfully
- [ ] Admin dashboard (if applicable) is protected
- [ ] All images are optimized or acceptable size
- [ ] No large uncompressed assets

## Build Phase

### Local Build
```bash
cd frontend
npm install  # if needed
npm run build:prod
```

- [ ] Build completes without errors
- [ ] No build warnings
- [ ] `dist/` folder created
- [ ] dist/index.html exists and is valid

### Local Testing
```bash
npm run preview
```

- [ ] Preview server starts on http://localhost:4173
- [ ] All routes load without error
- [ ] Lazy routes show loader and then content
- [ ] No console errors in DevTools
- [ ] No 404 errors in Network tab
- [ ] API calls use correct backend URL

## Performance Verification

### Network Tab Analysis
- [ ] Initial HTML: < 5 KB
- [ ] Main JS chunk: < 100 KB
- [ ] Vendor chunks: < 100 KB each
- [ ] CSS bundle: < 100 KB
- [ ] Each route chunk: < 80 KB
- [ ] Total initial transfer: < 300 KB

### Lighthouse Report
In DevTools → Lighthouse:
```bash
1. Run audit with default settings
2. Check Performance: > 85 target
3. Check Accessibility: > 80 target
4. Check Best Practices: > 80 target
5. Check SEO: > 80 target
```

- [ ] Performance score: > 85
- [ ] No critical issues
- [ ] LCP (Largest Paint): < 2.5s
- [ ] CLS (Layout Shift): < 0.1
- [ ] FID/INP (Responsiveness): < 100ms

### Bundle Size Check
```bash
# Optional: Visualize bundle
npm run analyze
```

- [ ] No unexpected large chunks
- [ ] Vendor libraries properly separated
- [ ] Route chunks reasonable size
- [ ] Source maps disabled (smaller bundle)

## Route & Feature Testing

### Public Routes
- [ ] `/` (Home) loads and renders
- [ ] `/about` loads and renders
- [ ] `/projects` loads and renders with lazy loading
- [ ] `/contact` loads and renders
- [ ] `/blogs` loads and renders
- [ ] `/blog/:id` loads with dynamic route
- [ ] `/invalid-route` redirects to home

### Admin Routes (if applicable)
- [ ] `/admin/login` loads
- [ ] Admin dashboard requires authentication
- [ ] Unauthenticated users redirected to login
- [ ] Admin functions work after login

### Functional Tests
- [ ] Form submissions work
- [ ] API responses display correctly
- [ ] Images load properly
- [ ] Videos/media play (if applicable)
- [ ] Animations work smoothly
- [ ] Mobile responsiveness verified
- [ ] Keyboard navigation works
- [ ] Tab order is logical

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if macOS available)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

For each browser:
- [ ] No console errors
- [ ] All routes accessible
- [ ] Layout renders correctly
- [ ] Interactions responsive
- [ ] Media plays correctly

## Environment Configuration

### Update `.env.production`
```bash
# Before deployment, update:
VITE_API_URL=https://your-actual-backend-domain.com/api
```

- [ ] Backend URL is correct
- [ ] Backend is accessible from production domain
- [ ] CORS is properly configured on backend
- [ ] API key/auth tokens are valid

### Verify Build Configuration
In `frontend/vite.config.js`:
- [ ] `target: 'ES2020'` for modern browsers
- [ ] `minify: 'terser'` enabled
- [ ] `drop_console: true` in production
- [ ] Code splitting configured correctly
- [ ] Asset organization in place

## Deployment Target Configuration

### Vercel Deployment
- [ ] Project connected to GitHub repo
- [ ] Build command: `npm run build:prod`
- [ ] Output directory: `dist`
- [ ] Environment variable `VITE_API_URL` set
- [ ] Automatic deployments enabled
- [ ] Domain configured (if applicable)

### Netlify Deployment
- [ ] Site connected to GitHub repo
- [ ] Build command: `npm run build:prod`
- [ ] Publish directory: `dist`
- [ ] Build settings verified
- [ ] Environment variable `VITE_API_URL` set
- [ ] Redirects configured for SPA routing

### Other Hosting (Docker/Server)
- [ ] `dist/` folder properly uploaded
- [ ] Web server configured for SPA routing
- [ ] CORS headers configured if needed
- [ ] Environment variables set on server
- [ ] HTTPS enabled
- [ ] SSL certificate valid

## Post-Deployment Testing

### Production Site
- [ ] Website loads at your domain
- [ ] All routes work in production
- [ ] API calls succeed
- [ ] Forms submit successfully
- [ ] No 404 errors
- [ ] No console errors in production
- [ ] Performance acceptable (< 3s load time)

### Performance Monitoring
- [ ] Web Vitals are being tracked
- [ ] No significant performance degradation
- [ ] API response times acceptable
- [ ] Error logs show no issues

### Security Check
- [ ] HTTPS is enforced
- [ ] No sensitive data in console
- [ ] API credentials not exposed
- [ ] Admin routes are protected
- [ ] No security warnings from browser

## Monitoring & Maintenance

Ongoing post-deployment:
- [ ] Set up error tracking (Sentry)
- [ ] Monitor performance metrics
- [ ] Review server logs regularly
- [ ] Keep dependencies updated
- [ ] Plan regular security audits

## Rollback Plan

If issues found in production:
- [ ] Previous build backup available
- [ ] Can quickly revert deployment
- [ ] DNS changes can be reverted
- [ ] Database backups current (if applicable)

## Documentation

- [ ] Update project README with deployment steps
- [ ] Document any custom configurations
- [ ] Note any environment-specific setup
- [ ] Document troubleshooting steps
- [ ] Keep deployment log with date and version

## Sign-Off

- [ ] All items checked
- [ ] No blocking issues
- [ ] Performance acceptable
- [ ] Ready for production
- [ ] Date deployed: _____________
- [ ] Deployed by: _____________

---

## Quick Rollback Commands

If deployment fails:

```bash
# Revert Vercel deployment
vercel rollback

# Revert Netlify deployment
# Use Netlify dashboard to restore previous deployment

# Redeploy if needed
npm run build:prod
# Upload dist/ folder again
```

## Support Contacts

- Backend API Team: _____________
- Hosting Support: _____________
- Admin Contact: _____________

---

**After Deployment**: 
1. Test production site thoroughly
2. Monitor errors and performance
3. Check analytics and user behavior
4. Plan updates and maintenance windows
5. Keep dependencies updated

**Celebrate! 🎉** Your app is now live!
