#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

NAMESPACE=${NAMESPACE:-"default"}

case "${1:-help}" in
  logs)
    echo -e "${BLUE}Showing logs for astro-playground...${NC}"
    kubectl logs -f deployment/astro-playground -n $NAMESPACE --tail=50
    ;;

  status)
    echo -e "${BLUE}Deployment Status:${NC}"
    kubectl get deployment astro-playground -n $NAMESPACE
    echo ""
    echo -e "${BLUE}Pods:${NC}"
    kubectl get pods -n $NAMESPACE -l app=astro-playground -o wide
    echo ""
    echo -e "${BLUE}Service:${NC}"
    kubectl get svc astro-playground -n $NAMESPACE
    ;;

  restart)
    echo -e "${YELLOW}Restarting deployment...${NC}"
    kubectl rollout restart deployment/astro-playground -n $NAMESPACE
    kubectl rollout status deployment/astro-playground -n $NAMESPACE
    echo -e "${GREEN}✓ Restarted${NC}"
    ;;

  scale)
    REPLICAS=${2:-3}
    echo -e "${YELLOW}Scaling to $REPLICAS replicas...${NC}"
    kubectl scale deployment astro-playground --replicas=$REPLICAS -n $NAMESPACE
    ;;

  delete)
    echo -e "${RED}Deleting deployment...${NC}"
    kubectl delete deployment astro-playground -n $NAMESPACE
    kubectl delete svc astro-playground -n $NAMESPACE
    kubectl delete ingress astro-playground -n $NAMESPACE
    echo -e "${GREEN}✓ Deleted${NC}"
    ;;

  describe)
    echo -e "${BLUE}Deployment Details:${NC}"
    kubectl describe deployment astro-playground -n $NAMESPACE
    ;;

  shell)
    POD=$(kubectl get pods -n $NAMESPACE -l app=astro-playground -o jsonpath='{.items[0].metadata.name}')
    echo -e "${BLUE}Connecting to pod $POD...${NC}"
    kubectl exec -it $POD -n $NAMESPACE -- /bin/sh
    ;;

  *)
    echo -e "${BLUE}Kubernetes Utils${NC}"
    echo ""
    echo "Usage: ./scripts/k8s-utils.sh <command>"
    echo ""
    echo "Commands:"
    echo "  ${GREEN}logs${NC}      - Show deployment logs"
    echo "  ${GREEN}status${NC}    - Show deployment status"
    echo "  ${GREEN}restart${NC}   - Restart deployment"
    echo "  ${GREEN}scale${NC} N   - Scale to N replicas"
    echo "  ${GREEN}delete${NC}    - Delete deployment"
    echo "  ${GREEN}describe${NC}  - Show deployment details"
    echo "  ${GREEN}shell${NC}     - Connect to pod shell"
    echo ""
    echo "Environment variables:"
    echo "  NAMESPACE - Kubernetes namespace (default: default)"
    ;;
esac
