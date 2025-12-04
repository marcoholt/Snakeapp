# Deployment vs Service - How They Connect

## Side-by-Side Comparison

### Your Deployment (deployment.yaml)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: snake-game
spec:
  template:
    metadata:
      labels:                    # ← POD LABELS
        app: snake-game          # ← This is what Service looks for!
    spec:
      containers:
      - name: snake-game
        ports:
        - containerPort: 80      # ← Container is listening on port 80
```

### Your Service (service.yaml)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: snake-game-service
spec:
  selector:                      # ← LOOKS FOR PODS
    app: snake-game              # ← Matches pod label above! ✅
  ports:
  - targetPort: 80               # ← Matches containerPort above! ✅
    port: 80
    nodePort: 30080
```

## The Connection Points:

### 1. Labels ↔ Selector
```
Deployment Pod Label:    app: snake-game
Service Selector:        app: snake-game
                         ✅ THEY MATCH!
```

### 2. Container Port ↔ Target Port
```
Deployment containerPort:  80
Service targetPort:        80
                           ✅ THEY MATCH!
```

## Visual Flow:

```
┌─────────────────────────────────────────┐
│         Your Browser                    │
└─────────────────┬───────────────────────┘
                  │
                  │ http://minikube:30080
                  ▼
┌─────────────────────────────────────────┐
│         Service                         │
│  - Receives on nodePort: 30080          │
│  - Forwards to port: 80                 │
│  - Routes to pods with label            │
│    app: snake-game                      │
└─────────────────┬───────────────────────┘
                  │
                  │ port 80 → targetPort 80
                  ▼
┌─────────────────────────────────────────┐
│         Pod (from Deployment)           │
│  - Has label: app: snake-game  ✅       │
│  - Container listening on port 80  ✅   │
│  - Runs your nginx container            │
└─────────────────────────────────────────┘
```

## If They Don't Match:

### ❌ Wrong Selector:
```yaml
# Deployment pod label
labels:
  app: snake-game

# Service selector (WRONG!)
selector:
  app: different-name    # ❌ Service can't find pods!
```
**Result:** Service won't route to any pods

### ❌ Wrong Target Port:
```yaml
# Deployment container port
containerPort: 80

# Service target port (WRONG!)
targetPort: 8080    # ❌ Service forwards to wrong port!
```
**Result:** Connection refused - container isn't listening on 8080

## Key Takeaway:

**Service = Phone Book + Router**
- Phone Book (selector): Finds pods by their labels
- Router (ports): Forwards traffic to correct container port

