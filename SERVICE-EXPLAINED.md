# Kubernetes Service YAML - Explained Step by Step

## What is a Service?
A Service in Kubernetes is like a network router that allows external traffic to reach your pods. 
Without a Service, your pods are unreachable from outside the cluster.

## Building service.yaml - Line by Line

### 1. API Version and Kind
```yaml
apiVersion: v1
kind: Service
```
- **apiVersion**: `v1` is the stable API version for Services (unlike Deployments which use `apps/v1`)
- **kind**: `Service` tells Kubernetes this is a Service resource

### 2. Metadata Section
```yaml
metadata:
  name: snake-game-service
  labels:
    app: snake-game
```
- **name**: Unique identifier for your Service (you'll use this to reference it)
- **labels**: Tags for organizing/selecting resources (matching your Deployment labels)

### 3. Spec Section - This is where the magic happens!
```yaml
spec:
  type: NodePort
```
- **type**: How the Service exposes your app
  - `ClusterIP` (default): Only accessible inside the cluster
  - `NodePort`: Exposes on each Node's IP at a static port
  - `LoadBalancer`: Cloud provider load balancer
  - `ExternalName`: Maps to external DNS name
  
  For minikube/local development, `NodePort` is perfect!

### 4. Selector - The Connection
```yaml
  selector:
    app: snake-game
```
- **This MUST match your Deployment's pod labels!**
- Kubernetes uses this to find which pods to route traffic to
- Your Deployment has `app: snake-game` label, so this matches

### 5. Ports Configuration
```yaml
  ports:
  - protocol: TCP
    port: 80           # Port the Service listens on
    targetPort: 80     # Port your container is listening on
    nodePort: 30080    # External port (30000-32767 range)
```

**Understanding the three ports:**
- **port** (80): Port the Service exposes internally
- **targetPort** (80): Port your container is using (matches containerPort in Deployment)
- **nodePort** (30080): Port accessible from outside minikube cluster
  - Must be between 30000-32767
  - minikube will make your app available at: `minikube-ip:30080`

## How It All Works Together

```
Internet → NodePort (30080) → Service Port (80) → Pod targetPort (80) → Container
```

1. External request comes to minikube on port 30080
2. Service receives it and forwards to port 80
3. Service routes to pods with label `app: snake-game`
4. Pod forwards to container port 80
5. Your nginx serves the Snake game!

## Key Relationships

### Service ↔ Deployment Connection
- Service `selector: app: snake-game` 
- Deployment pods have `labels: app: snake-game`
- **They match!** ✅

### Port Mapping
- Container port: 80 (in Deployment)
- Service targetPort: 80
- **They match!** ✅

## Alternative Service Types for Different Use Cases

### ClusterIP (Internal Only)
```yaml
type: ClusterIP  # No nodePort needed
```
- Only accessible from within the cluster
- Good for internal services

### LoadBalancer (Cloud)
```yaml
type: LoadBalancer  # No nodePort needed (cloud provides IP)
```
- Gets an external IP from cloud provider
- Works on AWS, GCP, Azure

## Testing Your Service

After creating the service:
```bash
# Check service was created
kubectl get services

# Access your app
minikube service snake-game-service

# Or get the URL
minikube service snake-game-service --url
```

## Common Mistakes to Avoid

1. ❌ Selector doesn't match pod labels → Service can't find pods
2. ❌ targetPort doesn't match containerPort → Connection refused
3. ❌ Wrong nodePort range (<30000 or >32767) → Invalid configuration
4. ❌ Missing port/protocol → Service won't route traffic

