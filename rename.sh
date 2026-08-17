#!/bin/bash
echo "Renaming CyberNet to Cyboeta..."

# Update package.json
sed -i 's/"name": "cybernet"/"name": "cyboeta"/g' ~/Cybo/package.json
sed -i 's/"name": "dr-screal"/"name": "cyboeta"/g' ~/Cybo/package.json

# Update layout.tsx
sed -i 's/CyberNet — Where Secure Minds Meet/Cyboeta — Where Secure Minds Meet/g' ~/Cybo/app/layout.tsx
sed -i 's/CyberNet/Cyboeta/g' ~/Cybo/app/layout.tsx

# Update page.tsx
sed -i 's/CyberNet/Cyboeta/g' ~/Cybo/app/page.tsx
sed -i 's/CyberNet/Cyboeta/g' ~/Cybo/app/auth/page.tsx
sed -i 's/CyberNet/Cyboeta/g' ~/Cybo/app/dashboard/page.tsx

# Update ROADMAP
sed -i 's/CyberNet/Cyboeta/g' ~/Cybo/ROADMAP.md

# Update SVG logo alt text
sed -i 's/CyberNet Shield/Cyboeta Shield/g' ~/Cybo/app/page.tsx

echo "Done! All references updated to Cyboeta"
