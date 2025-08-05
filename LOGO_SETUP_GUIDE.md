# Logo Setup Guide

## What was added:

1. **New Sanity Schema**: Created `sanity/schemaTypes/logo.ts` with fields for:
   - Logo image (required)
   - Alt text (required)
   - Fallback text (defaults to "SM")

2. **Updated Schema Index**: Added the logo schema to `sanity/schemaTypes/index.ts`

3. **New Query**: Added `logoQuery` to `sanity/lib/queries.ts` to fetch logo data

4. **Updated Logo Component**: Modified `app/_components/navbar/Logo.tsx` to:
   - Fetch logo data from Sanity
   - Display the logo image when available
   - Fall back to text ("SM") when loading or if no image is set

## How to set up the logo in Sanity Studio:

1. **Start Sanity Studio**:
   ```bash
   npm run dev
   ```
   Then visit your Sanity Studio (usually at `/studio` route)

2. **Add Logo Content**:
   - In Sanity Studio, you'll see a new "Logo" document type
   - Click on "Logo" to create/edit the logo configuration
   - Upload your logo image
   - Add appropriate alt text (e.g., "Sarath Menon Logo")
   - The fallback text is pre-filled with "SM" but you can change it

3. **Publish**: Make sure to publish the logo document

## Features:

- **Responsive**: Logo adapts to different screen sizes
- **Fallback**: Shows "SM" text while loading or if no logo is configured
- **Optimized**: Uses Next.js Image component for performance
- **Accessible**: Includes proper alt text for screen readers

The logo will now be dynamically loaded from Sanity and displayed in the navbar where "SM" currently appears.