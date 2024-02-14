KIND_CLUSTER_NAME := master
DOCKER := docker
DOCKER_IMAGE_NAME := dashboard
DOCKER_IMAGE_TAG := v1
DOCKER_BUILD_ARGS := -t $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)

DASHBOARD_DEPLOYMENT := deployment/dashboard.yml

.PHONY: docker-build
docker-build:
	$(DOCKER) build $(DOCKER_BUILD_ARGS) .

.PHONY: docker-build-load
docker-build-load: docker-build
	kind load docker-image --name $(KIND_CLUSTER_NAME) $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)

.PHONY: deploy-dashboard
deploy-dashboard:
	kubectl apply -f $(DASHBOARD_DEPLOYMENT)