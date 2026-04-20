# Kubernetes Deployment Guide

## Prerequisites

1. **kubectl** - Install from https://kubernetes.io/docs/tasks/tools/
2. **Docker** - For building images
3. **Access to Kubernetes cluster** - Configure kubeconfig
4. **Docker registry** - Docker Hub, ECR, GCR, or private registry
5. **Nginx Ingress Controller** (optional, for Ingress)
6. **Cert-Manager** (optional, for SSL certificates)

## Quick Setup

### 1. Build and Push Docker Image

```bash
# Set your registry credentials
export REGISTRY=docker.io
export IMAGE_NAME=your-username/astro-playground
export IMAGE_TAG=latest
export PUSH=true

# Run build script
chmod +x scripts/build.sh
./scripts/build.sh
```

### 2. Configure Deployment

Edit `k8s/deployment.yaml`:
```yaml
image: docker.io/your-username/astro-playground:latest
```

Edit `k8s/ingress.yaml`:
```yaml
host: your-domain.com
secretName: astro-playground-tls
```

### 3. Deploy to Kubernetes

```bash
chmod +x scripts/deploy.sh scripts/k8s-utils.sh

# Deploy with custom settings
export NAMESPACE=production
export IMAGE_REGISTRY=docker.io
export IMAGE_NAME=your-username/astro-playground
export IMAGE_TAG=latest
export DOMAIN=your-domain.com
export BUILD=true

./scripts/deploy.sh
```

## Deployment Options

### Option A: LoadBalancer Service (Simple)
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get svc astro-playground
```
Access via external IP on port 80.

### Option B: Ingress with SSL (Recommended)

**Install Nginx Ingress Controller:**
```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install nginx-ingress ingress-nginx/ingress-nginx
```

**Install Cert-Manager:**
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer for Let's Encrypt
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

**Deploy with Ingress:**
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

## Common Operations

### View Status
```bash
./scripts/k8s-utils.sh status
```

### View Logs
```bash
./scripts/k8s-utils.sh logs
```

### Restart Deployment
```bash
./scripts/k8s-utils.sh restart
```

### Scale Replicas
```bash
./scripts/k8s-utils.sh scale 5
```

### Connect to Pod Shell
```bash
./scripts/k8s-utils.sh shell
```

### Delete Deployment
```bash
./scripts/k8s-utils.sh delete
```

## WebSocket Configuration

The deployment includes:
- **sessionAffinity: ClientIP** - Routes websocket clients to the same pod
- **sessionAffinityConfig.timeoutSeconds: 10800** - 3 hour session timeout
- **Ingress annotations** - WebSocket support with nginx

## Environment Variables

Add to `k8s/deployment.yaml` env section:
```yaml
env:
- name: DATABASE_URL
  valueFrom:
    secretKeyRef:
      name: app-secrets
      key: database-url
```

Create secret:
```bash
kubectl create secret generic app-secrets \
  --from-literal=database-url='postgresql://...' \
  -n production
```

## Monitoring

### Get pod metrics (requires Metrics Server)
```bash
kubectl top pods -n default
```

### Watch pod creation
```bash
kubectl get pods -w -n default
```

### Describe deployment for events
```bash
./scripts/k8s-utils.sh describe
```

## Troubleshooting

### Pod stuck in Pending
```bash
kubectl describe pod <pod-name> -n default
```

### Image pull errors
```bash
# Check image exists and credentials
docker login
./scripts/build.sh  # Rebuild
```

### WebSocket connection issues
```bash
# Verify ingress is routing correctly
kubectl describe ingress astro-playground
```

### Check pod logs
```bash
./scripts/k8s-utils.sh logs
```

## Production Checklist

- [ ] Database connection configured
- [ ] Secrets configured (API keys, DB credentials)
- [ ] Resource limits set appropriately
- [ ] Liveness/Readiness probes working
- [ ] Ingress configured with domain
- [ ] SSL certificates working
- [ ] Session affinity enabled for WebSockets
- [ ] Monitoring/logging setup
- [ ] Backup/restore procedures documented
