# 🚀 Production Deployment Guide

## Quick Deploy Options

### 1. Heroku (Easiest)
```bash
# Backend
cd Back-end
heroku create learno-ai-backend
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set REDIS_URL=your_redis_cloud_uri
git push heroku main

# Frontend
cd ../front-end
npm run build
# Deploy build folder to Netlify/Vercel
```

### 2. DigitalOcean App Platform
- Connect GitHub repo
- Select Back-end directory
- Set environment variables
- Deploy

### 3. AWS EC2
```bash
# Install dependencies
sudo apt update
sudo apt install nodejs npm nginx -y
sudo npm install -g pm2

# Deploy app
git clone your-repo
cd Back-end
npm install --production
pm2 start server.js
pm2 startup
```

## Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/learno_ai
REDIS_URL=redis://user:pass@host:port
JWT_SECRET=your-super-secure-production-secret
JWT_REFRESH_SECRET=your-refresh-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Security Checklist
- [ ] HTTPS/SSL enabled
- [ ] Strong JWT secrets
- [ ] Database access restricted
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Environment variables secured

## Monitoring
- Set up PM2 for process management
- Configure log rotation
- Enable database backups
- Monitor error rates and performance

## Next Steps
1. Choose deployment platform
2. Set up production databases
3. Configure environment variables
4. Deploy and test
5. Set up monitoring 