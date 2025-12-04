# Next Steps: Deploy Your Snake Game to Minikube

## Step 1: Load Docker Image into Minikube
```bash
minikube image load snake-app:latest
```
This makes your Docker image available inside minikube's environment.

## Step 2: Create the Deployment
```bash
cd "/Users/marcocardin/Downloads/mini kube/snakeapp"
kubectl apply -f deployment.yaml
```
This creates your pods running the Snake game.

## Step 3: Create the Service
```bash
kubectl apply -f service.yaml
```
This creates a Service to route traffic to your pods.

## Step 4: Check Everything is Running
```bash
kubectl get deployments
kubectl get pods
kubectl get services
```
Verify your pods are in "Running" status.

## Step 5: Access Your Game!
```bash
minikube service snake-game-service
```
This will open your browser automatically, or get the URL:
```bash
minikube service snake-game-service --url
```

## Useful Commands:

**View logs:**
```bash
kubectl logs -l app=snake-game
```

**Check pod status:**
```bash
kubectl get pods -w
```

**Describe your service:**
```bash
kubectl describe service snake-game-service
```

**Delete everything:**
```bash
kubectl delete -f deployment.yaml
kubectl delete -f service.yaml
```

