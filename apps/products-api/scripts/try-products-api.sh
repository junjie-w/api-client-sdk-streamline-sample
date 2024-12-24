#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Base URL
BASE_URL="http://localhost:3001"

# Headers
CONTENT_TYPE="Content-Type: application/json"

# Sample product data
PRODUCT_DATA='{
  "name": "Gaming Laptop",
  "price": 1299.99,
  "categories": ["electronics", "computers"],
  "description": "High-performance gaming laptop"
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

# Product endpoints
echo -e "${GREEN}=== Products ===${NC}"
echo -e "3. Creating a Product"
curl -X POST $BASE_URL/products \
  -H "$CONTENT_TYPE" \
  -d "$PRODUCT_DATA" | json_pp
echo -e "\n"

echo -e "4. Getting All Products"
curl -X GET $BASE_URL/products | json_pp
echo -e "\n"

echo -e "5. Getting Products by Category"
curl -X GET "$BASE_URL/products?category=electronics" | json_pp
echo -e "\n"

echo -e "6. Getting Specific Product"
curl -X GET $BASE_URL/products/1 | json_pp
echo -e "\n"
