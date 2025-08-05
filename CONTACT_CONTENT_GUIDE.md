# Contact Section Content Guide for Sanity Studio

## How to Add Contact Section Content

1. Go to your Sanity Studio at `/studio`
2. Click on "Contact" in the sidebar
3. Create a new Contact document

## Fields Explanation:

### Section Title
The main title displayed at the top (default: "CONTACT")

### Contact Image
Upload the main image that appears on the left side. This should be a professional photo of Sarath or a behind-the-scenes image.

### Main Heading
The heading text next to the contact info (default: "Let's work together")

### Instagram Handle
Instagram username without the @ symbol (e.g., "sarathmenonfilms")

### Email Address
Professional email address for contact

### Phone Number
Contact phone number with country code

## Sample Content Based on Your Design:

**Section Title:** `CONTACT`

**Contact Image:** Upload the black and white behind-the-scenes photo (like in your design)

**Main Heading:** `Let's work together`

**Instagram Handle:** `sarathmenonfilms`

**Email Address:** `sarathmenonfilms@gmail.com`

**Phone Number:** `+91 7387000371`

## Features:

### Contact Information Display:
- **Professional Layout**: Image on left, contact info on right
- **Clickable Links**: Email and phone are clickable for easy contact
- **Social Media**: Instagram handle with icon
- **Responsive Design**: Adapts to all screen sizes

### Aceternity UI Contact Form:
- **Modern Design**: Sleek form with gradient effects
- **Interactive Elements**: Hover effects and animations
- **Form Validation**: Required fields and email validation
- **Loading States**: Shows loading spinner during submission
- **Success/Error Messages**: User feedback after form submission
- **Responsive**: Works perfectly on all devices

### Form Fields:
- First Name (required)
- Last Name (required)
- Email Address (required, validated)
- Message (required, textarea)

## Notes:
- Only create ONE Contact document (the component fetches the first one)
- The contact image should be high quality and professional
- Email and phone fields have validation
- The form includes modern UI effects from Aceternity UI
- Form submission is currently simulated (you can integrate with your preferred email service)

## Integration Options:
The contact form can be easily integrated with:
- EmailJS for client-side email sending
- Netlify Forms
- Vercel's form handling
- Custom API endpoints
- Third-party services like Formspree