# Photography Content Guide for Sanity Studio

## How to Add Photography Categories

1. Go to your Sanity Studio at `/studio`
2. Click on "Category" in the sidebar
3. Create new category documents for each photography folder

## Fields Explanation:

### Title
The name of your photography category (e.g., "Little District", "Rajasthan", "Portraits", "London")

### Description
Optional description of what this category contains

### Cover Image
Upload a representative image for this category - this will be the main image shown in the folder grid

### Slug
Auto-generated from the title - this creates the URL path (e.g., "little-district", "rajasthan")

### Photos
Upload all the photos that belong to this category (for future gallery pages)

## Sample Categories Based on Your Design:

### Category 1:
- **Title:** `Little District`
- **Description:** `Urban photography capturing the essence of small neighborhoods`
- **Cover Image:** Upload the landscape/cityscape image
- **Slug:** `little-district` (auto-generated)

### Category 2:
- **Title:** `Rajasthan`
- **Description:** `Cultural photography from the royal state of India`
- **Cover Image:** Upload the woman in traditional dress image
- **Slug:** `rajasthan` (auto-generated)

### Category 3:
- **Title:** `Portraits`
- **Description:** `Intimate portrait photography`
- **Cover Image:** Upload a portrait image
- **Slug:** `portraits` (auto-generated)

### Category 4:
- **Title:** `London`
- **Description:** `Street and architectural photography from London`
- **Cover Image:** Upload the London cityscape
- **Slug:** `london` (auto-generated)

### Category 5:
- **Title:** `Concert`
- **Description:** `Live music and performance photography`
- **Cover Image:** Upload the concert/performance image
- **Slug:** `concert` (auto-generated)

## Features:
- **Masonry Layout**: Categories automatically arrange in a Pinterest-style grid
- **Responsive Design**: Adapts to different screen sizes (1 column on mobile, 2 on tablet, 3 on desktop)
- **Hover Effects**: Scale and brightness effects on hover
- **Dynamic Aspect Ratios**: Each category gets a different aspect ratio for visual variety
- **Clickable Links**: Each category links to `/photography/[slug]` (ready for individual gallery pages)
- **Fallback Images**: Shows placeholder if no cover image is uploaded

## Individual Gallery Pages:
Each category automatically gets its own gallery page at `/photography/[slug]` with:
- **Masonry Photo Grid**: All photos from the category displayed in a Pinterest-style layout
- **Dynamic Aspect Ratios**: Photos get different sizes for visual variety
- **Hover Effects**: Subtle brightness and scale effects
- **Back Navigation**: Easy return to main photography page
- **Responsive Design**: Adapts from 1 to 4 columns based on screen size
- **Loading States**: Smooth loading experience with skeleton screens
- **404 Handling**: Graceful error pages for missing categories

## Notes:
- The component automatically creates different sized "folders" for visual interest
- Categories are displayed in the order they're created in Sanity
- Each category links to its own gallery page at `/photography/[category-slug]`
- Make sure to upload high-quality cover images and photos for best results
- Photos in each category will be displayed in a beautiful masonry layout
- The system generates static pages for better performance