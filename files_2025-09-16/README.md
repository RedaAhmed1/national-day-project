# 95 قصة فخر - Saudi National Day 95 Interactive Wall

## Project Overview

"95 قصة فخر" (95 Stories of Pride) is an interactive website celebrating the 95th Saudi National Day. The platform allows users to share their pride stories about Saudi Arabia through text, images, or short videos, creating a virtual wall of national pride.

## Features

### 🏠 Landing Page
- **Hero Section**: Visually striking design with Saudi theme (green/white colors)
- **Countdown Timer**: Live countdown to National Day (September 23, 2025)
- **Statistics**: Real-time stats showing total stories, regions, and likes
- **Call-to-Action**: Prominent "Share Your Story" button

### 📝 Story Submission
- **Simple Form**: Easy-to-use form with Arabic support
- **File Uploads**: Support for photos and videos (up to 30 seconds)
- **Regional Selection**: Dropdown with all 13 Saudi regions
- **Character Limit**: 500 character limit for story text
- **Consent Checkbox**: User agreement for publishing stories

### 🎭 Interactive Wall
- **Dynamic Grid**: Responsive masonry layout for story cards
- **Filtering**: Filter by region and content type (text/photo/video)
- **Social Features**: Like and share functionality
- **Modal View**: Expanded view for full story reading
- **Load More**: Pagination for better performance

### 🎨 Design Features
- **Arabic Typography**: Modern Arabic fonts (Tajawal)
- **RTL Support**: Full right-to-left layout support
- **Saudi Colors**: Green and white color scheme with gold accents
- **Cultural Elements**: Palm trees, calligraphy, and national symbols
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🔊 Additional Features
- **Background Music**: Optional Saudi anthem toggle
- **Smooth Animations**: CSS animations and scroll effects
- **Progressive Loading**: Optimized content loading
- **Local Storage**: Remembers user likes and preferences

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Inline SVG icons
- **Fonts**: Google Fonts (Tajawal)
- **Storage**: LocalStorage for client-side data

## File Structure

```
saudi-national-day-95/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Main stylesheet
├── scripts/
│   └── main.js            # Main JavaScript functionality
├── assets/
│   ├── saudi-emblem.svg   # Saudi emblem icon
│   ├── favicon.ico        # Website favicon
│   └── og-image.jpg       # Social media preview image
└── README.md              # This file
```

## Key Classes and Components

### SaudiStoryWall Class
Main JavaScript class handling:
- Story management and filtering
- Form submission and validation
- UI interactions and animations
- Local storage operations
- Modal functionality

### CSS Components
- **Navigation**: Fixed header with smooth scroll
- **Hero Section**: Full-screen landing with animations
- **Story Cards**: Interactive cards with hover effects
- **Modal**: Popup for expanded story view
- **Forms**: Styled form elements with validation

## Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Adjusted grid)
- **Mobile**: < 768px (Single column, simplified nav)
- **Small Mobile**: < 480px (Optimized for small screens)

## Browser Support

- **Modern Browsers**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 70+
- **Features**: ES6+ support required for full functionality

## Setup Instructions

1. **Clone/Download**: Get the project files
2. **Local Server**: Use a local server (e.g., Live Server, Python SimpleHTTPServer)
3. **Open**: Navigate to index.html in your browser
4. **Test**: Try submitting stories and using all features

## Customization Options

### Colors (CSS Variables)
```css
--saudi-green: #0d7d2d;
--saudi-gold: #d4af37;
--saudi-white: #ffffff;
```

### Content
- Edit text content directly in HTML (data-editable attributes)
- Modify sample stories in main.js
- Update region list in both HTML select and JavaScript

### Features
- Enable/disable background music
- Adjust story character limits
- Modify filtering options
- Customize animation timings

## Performance Optimizations

- **CSS**: Efficient selectors and minimal reflows
- **JavaScript**: Lazy loading and event delegation
- **Images**: Optimized file sizes and formats
- **Animations**: GPU-accelerated transforms
- **Loading**: Progressive content loading

## Accessibility Features

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab-friendly interface
- **Color Contrast**: WCAG 2.1 compliant colors
- **Font Sizes**: Scalable text for readability
- **Focus Indicators**: Clear focus states

## Future Enhancements

- **Backend Integration**: API for story persistence
- **Admin Dashboard**: Content moderation panel
- **Social Sharing**: Enhanced sharing capabilities
- **Analytics**: Detailed usage statistics
- **Multi-language**: English version support
- **Push Notifications**: Story approval notifications

## Browser Console Commands

For testing and development:
```javascript
// Access the main app instance
window.app = new SaudiStoryWall();

// Add a test story
window.app.stories.push({
  id: Date.now(),
  name: "Test User",
  region: "الرياض",
  story: "Test story content",
  likes: 0,
  timestamp: new Date(),
  type: 'text'
});
```

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational and demonstration purposes. All Saudi national symbols and references are used respectfully to celebrate the Kingdom of Saudi Arabia.

---

**Built with ❤️ for Saudi National Day 95**