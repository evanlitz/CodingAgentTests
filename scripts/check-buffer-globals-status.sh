#!/bin/bash

# Script to check the status of buffer globals TODO in @types/node
# This helps monitor when the deprecated types are removed upstream

set -e

echo "================================================"
echo "Buffer Globals TODO Status Checker"
echo "================================================"
echo ""

# Get current versions
TS_VERSION=$(npx tsc --version | grep -oP '\d+\.\d+\.\d+' || echo "unknown")
NODE_TYPES_VERSION=$(npm list @types/node --depth=0 2>/dev/null | grep @types/node | grep -oP '\d+\.\d+\.\d+' || echo "unknown")

echo "📦 Current Versions:"
echo "   TypeScript: $TS_VERSION"
echo "   @types/node: $NODE_TYPES_VERSION"
echo ""

# Check if the deprecated types still exist
BUFFER_FILE="node_modules/@types/node/buffer.buffer.d.ts"

if [ ! -f "$BUFFER_FILE" ]; then
    echo "⚠️  Warning: buffer.buffer.d.ts not found"
    echo "   File location: $BUFFER_FILE"
    exit 1
fi

# Check for the TODO comment
if grep -q "TODO: remove globals in future version" "$BUFFER_FILE"; then
    echo "📋 Status: TODO still present"
    echo ""
    echo "   The deprecated global types are still in @types/node:"
    echo "   - NonSharedBuffer"
    echo "   - AllowSharedBuffer"
    echo ""
    
    # Check if deprecated types exist
    if grep -q "type NonSharedBuffer" "$BUFFER_FILE"; then
        echo "   ✓ NonSharedBuffer found (deprecated)"
    fi
    
    if grep -q "type AllowSharedBuffer" "$BUFFER_FILE"; then
        echo "   ✓ AllowSharedBuffer found (deprecated)"
    fi
    echo ""
    
    # Check TypeScript version
    MAJOR_VERSION=$(echo $TS_VERSION | cut -d. -f1)
    MINOR_VERSION=$(echo $TS_VERSION | cut -d. -f2)
    
    if [ "$MAJOR_VERSION" -lt 5 ] || { [ "$MAJOR_VERSION" -eq 5 ] && [ "$MINOR_VERSION" -lt 7 ]; }; then
        echo "💡 Recommendation: Upgrade to TypeScript 5.7+"
        echo "   Current version ($TS_VERSION) is below the target version (5.7)"
        echo ""
        echo "   Run: npm install --save-dev typescript@latest @types/node@latest"
    else
        echo "✅ TypeScript version is 5.7+ compatible"
        echo "   The types may be removed in a future @types/node version"
    fi
else
    echo "✅ Status: TODO has been resolved!"
    echo ""
    echo "   The deprecated global types have been removed from @types/node"
    echo "   This technical debt item is complete."
fi

echo ""
echo "================================================"

# Check if our source code uses the deprecated types
echo ""
echo "🔍 Checking for usage in source code..."
echo ""

FOUND=0
if grep -r "NonSharedBuffer" src/ 2>/dev/null; then
    echo "⚠️  Found usage of NonSharedBuffer in source code!"
    FOUND=1
fi

if grep -r "AllowSharedBuffer" src/ 2>/dev/null; then
    echo "⚠️  Found usage of AllowSharedBuffer in source code!"
    FOUND=1
fi

if [ $FOUND -eq 0 ]; then
    echo "✅ No usage of deprecated types found in source code"
    echo "   Your code is safe from this deprecation"
fi

echo ""
echo "================================================"
echo "📚 For more information, see:"
echo "   - docs/BUFFER_GLOBALS_TODO.md"
echo "   - docs/UPGRADE_GUIDE.md"
echo "================================================"
