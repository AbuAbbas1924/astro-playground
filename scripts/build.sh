#!/bin/bash
set -e

# Configuration
REGISTRY=${REGISTRY:-"docker.io"}
IMAGE_NAME=${IMAGE_NAME:-"astro-playground"}
IMAGE_TAG=${IMAGE_TAG:-"latest"}
DOCKERFILE=${DOCKERFILE:-"Dockerfile"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building Docker image...${NC}"
docker build -f $DOCKERFILE -t $REGISTRY/$IMAGE_NAME:$IMAGE_TAG -t $REGISTRY/$IMAGE_NAME:latest .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi

# Optional: Push to registry
if [ "$PUSH" = "true" ]; then
    echo -e "${YELLOW}Pushing to registry...${NC}"
    docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG
    docker push $REGISTRY/$IMAGE_NAME:latest
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Push successful!${NC}"
    else
        echo -e "${RED}✗ Push failed!${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}Image: $REGISTRY/$IMAGE_NAME:$IMAGE_TAG${NC}"
