# How to Access Your Snake Game

Your service is running! Here are **3 ways** to access it:

## Method 1: Port Forward (Easiest - Already Started!)
I just started a port-forward for you. Open your browser and go to:

**http://localhost:8080**

This forwards your local port 8080 to the service inside minikube.

**To start it again manually:**
```bash
kubectl port-forward service/snake-game-service 8080:80
```
Keep the terminal running and open http://localhost:8080 in your browser.

---

## Method 2: Minikube Service Tunnel
```bash
minikube service snake-game-service
```
This opens your browser automatically.

---

## Method 3: Direct Access via NodePort
Your minikube IP is: **192.168.49.2**
Your NodePort is: **30080**

Open your browser and go to:
**http://192.168.49.2:30080**

---

## Troubleshooting

**Check if pods are running:**
```bash
kubectl get pods
```
Should show STATUS: Running

**Check service:**
```bash
kubectl get services
```
Should show snake-game-service

**View logs if something's wrong:**
```bash
kubectl logs -l app=snake-game
```

**Test from inside minikube:**
```bash
minikube ssh
curl http://localhost:30080
```

---

## Quick Access Command
The easiest way - run this and click the link:
```bash
minikube service snake-game-service --url
```
Then copy the URL it gives you and paste in your browser.

