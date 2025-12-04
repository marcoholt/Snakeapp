# Building service.yaml - A Simple Guide

## Your Deployment has:
- Pod labels: `app: snake-game` (line 15 in deployment.yaml)
- Container port: `80` (line 22 in deployment.yaml)

## Build Service.yaml in 3 Steps:

### STEP 1: Header (Always the same)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: snake-game-service    # ← Choose any name you want
```

### STEP 2: Selector (Match your Deployment labels)
```yaml
spec:
  selector:
    app: snake-game    # ← MUST match pod labels from Deployment!
```

**Why?** The Service needs to know which pods to send traffic to. 
It looks for pods with the label `app: snake-game` (from your Deployment).

### STEP 3: Ports (Map the ports)
```yaml
  ports:
  - port: 80           # Service's internal port
    targetPort: 80     # Container's port (from Deployment!)
    protocol: TCP      # Type of traffic
```

**Why?**
- `targetPort: 80` must match your container's port (80 from Deployment)
- `port: 80` is the port the Service listens on internally

### STEP 4: Service Type (How to expose it)

For minikube, use **NodePort**:
```yaml
  type: NodePort
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080    # External port (30000-32767 range)
```

**NodePort breakdown:**
- `nodePort: 30080` - Access from outside minikube
- `port: 80` - Internal Service port  
- `targetPort: 80` - Container port

## Complete Flow:

```
Browser → minikube:30080 → Service port 80 → Pod targetPort 80 → Container
```

## Quick Decision Tree:

**Q: What pods do I want to route to?**
- Look at Deployment pod labels → Use in selector

**Q: What port is my container using?**
- Look at Deployment containerPort → Use as targetPort

**Q: How should it be accessed?**
- Local/minikube? → `type: NodePort`
- Cloud? → `type: LoadBalancer`
- Internal only? → `type: ClusterIP`

## Common Patterns:

### Pattern 1: Simple Web App (Your case)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: NodePort
  selector:
    app: my-app          # Match Deployment labels
  ports:
  - port: 80
    targetPort: 8080     # Match container port
    nodePort: 30080
```

### Pattern 2: Internal Service Only
```yaml
spec:
  type: ClusterIP       # No nodePort needed
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080
```

### Pattern 3: Multiple Ports
```yaml
spec:
  ports:
  - name: http
    port: 80
    targetPort: 8080
  - name: https
    port: 443
    targetPort: 8443
```

## Checklist Before Creating Service:

- [ ] I know my pod labels from Deployment
- [ ] I know my container port from Deployment
- [ ] I've chosen a Service type (NodePort for minikube)
- [ ] Selector matches pod labels
- [ ] targetPort matches containerPort

