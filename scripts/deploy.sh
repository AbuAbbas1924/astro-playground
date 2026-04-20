#!/bin/bash
set -e

# Configuration
NAMESPACE=${NAMESPACE:-"default"}
IMAGE_REGISTRY=${IMAGE_REGISTRY:-"docker.io"}
IMAGE_NAME=${IMAGE_NAME:-"your-username/astro-playground"}
IMAGE_TAG=${IMAGE_TAG:-"latest"}
DOMAIN=${DOMAIN:-"your-domain.com"}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}===================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===================================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed"
    exit 1
fi

# Create namespace if it doesn't exist
print_header "Creating Kubernetes namespace"
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
print_success "Namespace $NAMESPACE ready"

# Build Docker image
print_header "Building Docker image"
if [ "$BUILD" = "true" ]; then
    ./scripts/build.sh
    print_success "Docker image built"
else
    print_info "Skipping build (set BUILD=true to build)"
fi

# Update deployment with image
print_header "Updating deployment manifest"
sed -i "s|docker.io/your-registry/astro-playground:latest|$IMAGE_REGISTRY/$IMAGE_NAME:$IMAGE_TAG|g" k8s/deployment.yaml
sed -i "s|your-domain.com|$DOMAIN|g" k8s/ingress.yaml
print_success "Manifests updated"

# Apply Kubernetes resources
print_header "Deploying to Kubernetes"
kubectl apply -f k8s/deployment.yaml -n $NAMESPACE
kubectl apply -f k8s/service.yaml -n $NAMESPACE
kubectl apply -f k8s/ingress.yaml -n $NAMESPACE
print_success "Resources deployed"

# Wait for rollout
print_header "Waiting for deployment to be ready"
kubectl rollout status deployment/astro-playground -n $NAMESPACE --timeout=5m
print_success "Deployment ready"

# Get service information
print_header "Service Information"
echo -e "${YELLOW}Namespace:${NC} $NAMESPACE"
echo -e "${YELLOW}Deployment:${NC} astro-playground"
echo -e "${YELLOW}Image:${NC} $IMAGE_REGISTRY/$IMAGE_NAME:$IMAGE_TAG"
echo ""
echo -e "${YELLOW}Get Pods:${NC}"
kubectl get pods -n $NAMESPACE -l app=astro-playground
echo ""
echo -e "${YELLOW}Get Service:${NC}"
kubectl get svc -n $NAMESPACE astro-playground
echo ""
echo -e "${YELLOW}Get Ingress:${NC}"
kubectl get ingress -n $NAMESPACE astro-playground

print_success "Deployment complete!"
