#!/bin/bash
echo ${TRAVIS_JOB_NUMBER}
echo ${TRAVIS_TAG}
echo "tagging docker image"
VERSION=`grep '"version":' package.json | sed 's/.*: "//' | sed 's/",//'`
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin ${DOCKER_REGISTRY}
docker tag score-calculation-service ${DOCKER_REGISTRY}/score-calculation-service:${VERSION}
docker tag score-calculation-service ${DOCKER_REGISTRY}/score-calculation-service:latest
echo "pushing docker image"
docker push ${DOCKER_REGISTRY}/score-calculation-service:${VERSION}
docker push ${DOCKER_REGISTRY}/score-calculation-service:latest


