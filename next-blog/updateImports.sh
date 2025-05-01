#!/bin/bash

# Script to help update imports in the codebase

# Update Sanity imports
find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/utils/sanity|@/lib/sanity/client|g'

# Update component imports
find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "./components/|from "@/components/|g'
find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from "../components/|from "@/components/|g'

# Update utility imports
find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/utils/formatters|@/lib/utils|g'
find ./src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/utils/hooks|@/lib/utils|g'

echo "Import paths updated!" 