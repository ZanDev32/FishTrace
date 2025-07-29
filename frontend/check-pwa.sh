#!/bin/bash

echo "🔍 Checking PWA Build Files..."
echo

# Check if dist directory exists
if [ -d "dist" ]; then
    echo "✅ dist/ directory exists"
else
    echo "❌ dist/ directory not found"
    exit 1
fi

# Check for essential PWA files
echo
echo "📁 Checking PWA files:"

if [ -f "dist/sw.js" ]; then
    echo "✅ Service Worker (sw.js) found"
else
    echo "❌ Service Worker (sw.js) missing"
fi

if [ -f "dist/manifest.webmanifest" ]; then
    echo "✅ Web App Manifest found"
else
    echo "❌ Web App Manifest missing"
fi

if [ -f "dist/registerSW.js" ]; then
    echo "✅ Service Worker registration script found"
else
    echo "❌ Service Worker registration script missing"
fi

# Check for PWA icons
echo
echo "🖼️  Checking PWA icons:"

for icon in "pwa-64x64.png" "pwa-192x192.png" "pwa-512x512.png"; do
    if [ -f "public/$icon" ]; then
        echo "✅ $icon found"
    else
        echo "❌ $icon missing"
    fi
done

echo
echo "🚀 PWA Build Check Complete!"
echo
echo "To test your PWA:"
echo "1. Run: pnpm preview"
echo "2. Open: http://localhost:4173"
echo "3. Open Chrome DevTools > Application tab"
echo "4. Check 'Service Workers' and 'Manifest' sections"
echo "5. Use Lighthouse to audit PWA score"
