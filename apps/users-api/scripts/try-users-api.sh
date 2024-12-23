#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Base URL
BASE_URL="http://localhost:3002"

# Headers
CONTENT_TYPE="Content-Type: application/json"

# Sample user data
USER_DATA='{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}'

echo -e "${BLUE}=== Testing API Endpoints ===${NC}\n"

# Documentation endpoints
echo -e "${GREEN}=== Documentation ===${NC}"
echo -e "1. Getting API Info"
curl -X GET $BASE_URL | json_pp
echo -e "\n"

echo -e "2. Getting OpenAPI Spec"
curl -X GET $BASE_URL/api-docs-json | json_pp
echo -e "\n"

echo -e "${BLUE}=== Swagger UI ===${NC}"
echo -e "🌱 For interactive API documentation, visit:"
echo -e "$BASE_URL/api-docs"
echo -e "\n"

# User endpoints
echo -e "${GREEN}=== Users ===${NC}"
echo -e "3. Creating a User"
curl -X POST $BASE_URL/users \
  -H "$CONTENT_TYPE" \
  -d "$USER_DATA" | json_pp
echo -e "\n"

echo -e "4. Getting All Users"
curl -X GET $BASE_URL/users | json_pp
echo -e "\n"

echo -e "5. Getting Specific User"
curl -X GET $BASE_URL/users/1 | json_pp
echo -e "\n"
