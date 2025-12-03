# Snake Game 🐍

A simple, fun Snake game deployed to Kubernetes with full CI/CD automation!

## 🎮 Play the Game

The game is deployed and accessible via Kubernetes Service.

## 🚀 Features

- ✅ Web-based Snake game
- ✅ Containerized with Docker
- ✅ Deployed to Kubernetes (minikube)
- ✅ Automated CI/CD pipeline with GitHub Actions
- ✅ Modern, responsive UI

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Container**: Docker + nginx
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Local Dev**: minikube

## 📦 Deployment

### Using Docker:
```bash
docker build -t snake-app .
docker run -p 8080:80 snake-app
```

### Using Kubernetes:
```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

## 🔄 CI/CD Pipeline

This project includes automated CI/CD:
- Builds Docker image on every push
- Tests that the image works
- Ready for automated deployment

## 📚 Documentation

- [CI/CD Guide](CI-CD-GUIDE.md)
- [Deployment Steps](DEPLOYMENT-STEPS.md)
- [Access Guide](ACCESS-GUIDE.md)

## 🎯 How to Play

- Use arrow keys or WASD to control the snake
- Eat the red food to grow and score points
- Avoid hitting walls or yourself!

Enjoy! 🎉

