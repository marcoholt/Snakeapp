# CI/CD Pipeline Guide

## What is CI/CD?

**CI/CD** stands for **Continuous Integration / Continuous Deployment**:

- **CI (Continuous Integration)**: Automatically builds and tests your code when you push changes
- **CD (Continuous Deployment)**: Automatically deploys your code after tests pass

## Our CI/CD Pipeline

We've set up GitHub Actions workflows that:

1. ✅ **Build** your Docker image automatically
2. ✅ **Test** that the image runs correctly
3. ✅ **Push** to GitHub Container Registry (optional)
4. ✅ **Deploy** to Kubernetes (configurable)

## Pipeline Stages

### Stage 1: Build
- Runs on every push/PR
- Builds Docker image from your Dockerfile
- Uses Docker buildx for faster builds
- Caches layers for speed

### Stage 2: Test
- Starts a container with your image
- Checks that it responds to HTTP requests
- Verifies the application is working

### Stage 3: Push (Main branch only)
- Pushes image to GitHub Container Registry
- Tags image with commit SHA and branch name
- Makes image available for deployment

### Stage 4: Deploy (Optional - Main branch only)
- Deploys to Kubernetes cluster
- Can be configured for cloud providers or minikube

## Files Created

### 1. `.github/workflows/ci-cd.yml`
Full CI/CD pipeline with build, test, push, and deploy stages.

### 2. `.github/workflows/build-only.yml`
Simpler workflow that just builds and tests (no push/deploy).

## How to Use

### Option 1: Start Simple (Recommended)
Use `build-only.yml` first - it automatically runs on every push!

```bash
# Just push your code
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

GitHub Actions will automatically:
- Build your Docker image
- Test that it works
- Show you the results in GitHub

### Option 2: Full Pipeline
To enable the full pipeline with push/deploy:

1. **Enable GitHub Container Registry** (already enabled for GitHub repos)
2. **Configure Kubernetes secrets** (if deploying):
   ```bash
   # Add secrets in GitHub repo settings:
   # Settings → Secrets and variables → Actions
   # - KUBE_SERVER
   # - KUBE_TOKEN
   # - KUBE_CA (if needed)
   ```

## Viewing Pipeline Status

1. Go to your GitHub repository
2. Click on **"Actions"** tab
3. See your workflow runs and their status

## Pipeline Triggers

The pipeline runs automatically when:
- ✅ You push to `main` or `master` branch
- ✅ Someone opens a Pull Request
- ✅ You manually trigger it (Workflow Dispatch)

## Example Workflow Run

```
┌─────────────────────────────────────┐
│  CI/CD Pipeline                     │
├─────────────────────────────────────┤
│  ✓ Checkout code                    │
│  ✓ Set up Docker Buildx             │
│  ✓ Build Docker image               │
│  ✓ Test image runs successfully     │
│  ✓ Push to registry (main only)     │
│  ⏳ Deploy to Kubernetes (optional) │
└─────────────────────────────────────┘
```

## Customizing the Pipeline

### Change Image Name
Edit `.github/workflows/*.yml` and change:
```yaml
IMAGE_NAME: snake-game  # Change this
```

### Add More Tests
Add steps in the workflow:
```yaml
- name: Run custom tests
  run: |
    docker run snake-game:latest /bin/sh -c "your-test-command"
```

### Deploy to Different Environments
Add environment-specific jobs:
```yaml
deploy-staging:
  environment: staging
  # ... staging deployment
  
deploy-production:
  environment: production
  # ... production deployment
```

## Troubleshooting

### Pipeline Fails on Build
- Check Dockerfile is correct
- Verify all files are committed
- Check workflow logs in GitHub Actions tab

### Pipeline Fails on Test
- Verify your app starts correctly
- Check container logs in workflow
- Test locally first: `docker run -p 8080:80 snake-game:latest`

### Push Fails
- Check GitHub Container Registry permissions
- Verify GITHUB_TOKEN is available (auto-provided)

## Next Steps

1. **Push the workflows to GitHub:**
   ```bash
   git add .github/
   git commit -m "Add CI/CD pipeline"
   git push origin main
   ```

2. **Watch it run:**
   - Go to GitHub → Actions tab
   - See your pipeline in action!

3. **Expand as needed:**
   - Add more tests
   - Configure deployment
   - Add notifications
   - Set up environments

## CI/CD Best Practices

✅ **Keep workflows fast** - Use caching
✅ **Test before deploy** - Fail fast on errors
✅ **Tag images properly** - Use commit SHA or version
✅ **Secure secrets** - Never commit passwords/tokens
✅ **Monitor deployments** - Check logs and metrics

## Benefits

- 🚀 **Automation** - No manual builds
- 🔍 **Quality** - Tests run automatically
- 📦 **Consistency** - Same build process every time
- ⚡ **Speed** - Parallel jobs and caching
- 📊 **Visibility** - See status in GitHub

