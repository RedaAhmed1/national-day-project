// Saudi National Day 95 - Interactive Wall
// Main JavaScript functionality

class SaudiStoryWall {
    constructor() {
        this.stories = [];
        this.filteredStories = [];
        this.currentPage = 1;
        this.storiesPerPage = 6;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startCountdown();
        this.loadSampleStories();
        this.updateStats();
        this.initializeAudio();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.scrollToSection(target);
                this.updateActiveNavLink(link);
            });
        });

        // Story form submission
        const storyForm = document.getElementById('story-form');
        if (storyForm) {
            storyForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // File upload previews
        const photoInput = document.getElementById('photo');
        const videoInput = document.getElementById('video');
        if (photoInput) photoInput.addEventListener('change', (e) => this.handleFilePreview(e, 'photo'));
        if (videoInput) videoInput.addEventListener('change', (e) => this.handleFilePreview(e, 'video'));

        // Character counter
        const storyTextarea = document.getElementById('story');
        if (storyTextarea) {
            storyTextarea.addEventListener('input', this.updateCharCounter);
        }

        // Filters
        const regionFilter = document.getElementById('region-filter');
        const typeFilter = document.getElementById('type-filter');
        if (regionFilter) regionFilter.addEventListener('change', () => this.applyFilters());
        if (typeFilter) typeFilter.addEventListener('change', () => this.applyFilters());

        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => this.loadMoreStories());

        // Modal functionality
        this.setupModal();

        // CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => this.scrollToSection('submit'));
        }

        // Audio toggle
        const audioBtn = document.getElementById('audio-btn');
        if (audioBtn) {
            audioBtn.addEventListener('click', () => this.toggleAudio());
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = section.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    startCountdown() {
        const targetDate = new Date('2025-09-23T00:00:00');
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                document.getElementById('days').textContent = '0';
                document.getElementById('hours').textContent = '0';
                document.getElementById('minutes').textContent = '0';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
        };

        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const story = {
            id: Date.now(),
            name: formData.get('name') || 'مواطن سعودي',
            region: formData.get('region'),
            story: formData.get('story'),
            photo: null,
            video: null,
            likes: 0,
            timestamp: new Date(),
            type: 'text'
        };

        // Handle file uploads
        const photoFile = formData.get('photo');
        const videoFile = formData.get('video');

        if (photoFile && photoFile.size > 0) {
            story.photo = URL.createObjectURL(photoFile);
            story.type = 'photo';
        }

        if (videoFile && videoFile.size > 0) {
            story.video = URL.createObjectURL(videoFile);
            story.type = 'video';
        }

        // Add story to collection
        this.stories.unshift(story);
        this.filteredStories = [...this.stories];
        
        // Show success message
        this.showSuccessMessage();
        
        // Reset form
        e.target.reset();
        this.clearFilePreview();
        this.updateCharCounter({ target: { value: '' } });
        
        // Refresh wall
        this.renderStories();
        this.updateStats();
        
        // Scroll to wall
        setTimeout(() => {
            this.scrollToSection('wall');
        }, 1500);
    }

    handleFilePreview(e, type) {
        const file = e.target.files[0];
        const preview = document.getElementById('file-preview');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'photo') {
                    preview.innerHTML = `<img src="${e.target.result}" alt="معاينة الصورة" style="max-width: 200px; border-radius: 10px;">`;
                } else if (type === 'video') {
                    preview.innerHTML = `<video src="${e.target.result}" controls style="max-width: 200px; border-radius: 10px;"></video>`;
                }
            };
            reader.readAsDataURL(file);
        } else {
            this.clearFilePreview();
        }
    }

    clearFilePreview() {
        const preview = document.getElementById('file-preview');
        if (preview) preview.innerHTML = '';
    }

    updateCharCounter(e) {
        const charCount = document.getElementById('char-count');
        if (charCount) {
            charCount.textContent = e.target.value.length;
        }
    }

    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg class="success-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>تم إرسال قصتك بنجاح! شكراً لمشاركتك معنا.</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #0d7d2d, #10a537);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(13, 125, 45, 0.3);
            z-index: 2000;
            animation: slideIn 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // Add animation styles
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .success-notification .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .success-notification .success-icon {
                    width: 24px;
                    height: 24px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    loadSampleStories() {
        const sampleStories = [
            {
                id: 1,
                name: 'فاطمة الأحمدي',
                region: 'الرياض',
                story: 'أفتخر بكوني جزءاً من هذا الوطن العظيم. رؤية 2030 غيّرت حياتنا وفتحت أمامنا آفاقاً جديدة للنجاح والإبداع. المملكة اليوم تشهد نهضة حقيقية في جميع المجالات.',
                photo: null,
                video: null,
                likes: 42,
                timestamp: new Date('2024-09-10'),
                type: 'text'
            },
            {
                id: 2,
                name: 'محمد السالم',
                region: 'جدة',
                story: 'من طفولتي وأنا أحلم برؤية المملكة تتقدم وتزدهر. اليوم أشعر بالفخر عندما أرى إنجازاتنا في مختلف المجالات من التقنية إلى الرياضة إلى السياحة.',
                photo: null,
                video: null,
                likes: 38,
                timestamp: new Date('2024-09-12'),
                type: 'text'
            },
            {
                id: 3,
                name: 'نورا القحطاني',
                region: 'الدمام',
                story: 'كمرأة سعودية، أفتخر بالدعم الكبير الذي تقدمه القيادة لتمكين المرأة. اليوم نحن جزء فعّال في بناء مستقبل الوطن في كافة القطاعات.',
                photo: null,
                video: null,
                likes: 56,
                timestamp: new Date('2024-09-08'),
                type: 'text'
            },
            {
                id: 4,
                name: 'عبدالله المطيري',
                region: 'المدينة المنورة',
                story: 'أفتخر بتراثنا العريق وحضارتنا الأصيلة. المملكة تجمع بين الأصالة والمعاصرة بشكل مميز، وهذا ما يجعلها فريدة بين دول العالم.',
                photo: null,
                video: null,
                likes: 31,
                timestamp: new Date('2024-09-11'),
                type: 'text'
            },
            {
                id: 5,
                name: 'سارة الزهراني',
                region: 'أبها',
                story: 'مناظرنا الطبيعية الخلابة في عسير تعكس جمال وطننا الساحر. من الجبال الخضراء إلى السهول الذهبية، المملكة جنة على الأرض.',
                photo: null,
                video: null,
                likes: 29,
                timestamp: new Date('2024-09-09'),
                type: 'text'
            },
            {
                id: 6,
                name: 'خالد العتيبي',
                region: 'الطائف',
                story: 'كشاب سعودي، أفتخر بالفرص اللامحدودة التي توفرها بلادي للشباب. من ريادة الأعمال إلى الابتكار والتقنية، السعودية تستثمر في شبابها.',
                photo: null,
                video: null,
                likes: 44,
                timestamp: new Date('2024-09-13'),
                type: 'text'
            }
        ];

        this.stories = sampleStories;
        this.filteredStories = [...this.stories];
        this.renderStories();
    }

    renderStories() {
        const grid = document.getElementById('stories-grid');
        if (!grid) return;

        const startIndex = (this.currentPage - 1) * this.storiesPerPage;
        const endIndex = startIndex + this.storiesPerPage;
        const storiesToShow = this.filteredStories.slice(0, endIndex);

        if (this.currentPage === 1) {
            grid.innerHTML = '';
        }

        storiesToShow.slice(startIndex).forEach(story => {
            const storyCard = this.createStoryCard(story);
            grid.appendChild(storyCard);
        });

        // Update load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= this.filteredStories.length ? 'none' : 'block';
        }
    }

    createStoryCard(story) {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.setAttribute('data-story-id', story.id);

        let mediaHtml = '';
        if (story.photo) {
            mediaHtml = `<img src="${story.photo}" alt="صورة القصة" class="story-media">`;
        } else if (story.video) {
            mediaHtml = `<video src="${story.video}" class="story-media" muted></video>`;
        } else {
            mediaHtml = `<div class="story-media" style="background: var(--gradient-green); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">📖</div>`;
        }

        card.innerHTML = `
            ${mediaHtml}
            <div class="story-content">
                <div class="story-header">
                    <span class="story-author">${story.name}</span>
                    <span class="story-region">${story.region}</span>
                </div>
                <p class="story-text">${story.story}</p>
                <div class="story-actions">
                    <button class="like-button ${this.isLiked(story.id) ? 'liked' : ''}" data-story-id="${story.id}">
                        <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>${story.likes}</span>
                    </button>
                    <button class="share-button" data-story-id="${story.id}">
                        <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        مشاركة
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.story-actions')) {
                this.openStoryModal(story);
            }
        });

        const likeBtn = card.querySelector('.like-button');
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleLike(story.id);
        });

        const shareBtn = card.querySelector('.share-button');
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.shareStory(story);
        });

        return card;
    }

    applyFilters() {
        const regionFilter = document.getElementById('region-filter').value;
        const typeFilter = document.getElementById('type-filter').value;

        this.filteredStories = this.stories.filter(story => {
            const regionMatch = !regionFilter || story.region === regionFilter;
            const typeMatch = !typeFilter || story.type === typeFilter;
            return regionMatch && typeMatch;
        });

        this.currentPage = 1;
        this.renderStories();
    }

    loadMoreStories() {
        this.currentPage++;
        this.renderStories();
    }

    toggleLike(storyId) {
        const story = this.stories.find(s => s.id === storyId);
        if (!story) return;

        const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
        const isLiked = likedStories.includes(storyId);

        if (isLiked) {
            story.likes--;
            const index = likedStories.indexOf(storyId);
            likedStories.splice(index, 1);
        } else {
            story.likes++;
            likedStories.push(storyId);
        }

        localStorage.setItem('likedStories', JSON.stringify(likedStories));

        // Update UI
        const likeBtn = document.querySelector(`[data-story-id="${storyId}"] .like-button`);
        if (likeBtn) {
            likeBtn.classList.toggle('liked', !isLiked);
            likeBtn.querySelector('span').textContent = story.likes;
        }

        this.updateStats();
    }

    isLiked(storyId) {
        const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
        return likedStories.includes(storyId);
    }

    shareStory(story) {
        if (navigator.share) {
            navigator.share({
                title: '95 قصة فخر',
                text: `قصة من ${story.name} من ${story.region}: ${story.story}`,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            const text = `قصة من ${story.name} من ${story.region}: ${story.story}\n\n${window.location.href}`;
            navigator.clipboard.writeText(text).then(() => {
                alert('تم نسخ القصة إلى الحافظة!');
            });
        }
    }

    openStoryModal(story) {
        const modal = document.getElementById('story-modal');
        const content = document.getElementById('modal-story-content');
        
        let mediaHtml = '';
        if (story.photo) {
            mediaHtml = `<img src="${story.photo}" alt="صورة القصة" style="width: 100%; max-width: 400px; border-radius: 10px; margin-bottom: 20px;">`;
        } else if (story.video) {
            mediaHtml = `<video src="${story.video}" controls style="width: 100%; max-width: 400px; border-radius: 10px; margin-bottom: 20px;"></video>`;
        }

        content.innerHTML = `
            <div style="text-align: center;">
                ${mediaHtml}
                <h3 style="color: var(--saudi-green); margin-bottom: 10px;">${story.name}</h3>
                <p style="color: var(--text-light); margin-bottom: 20px;">${story.region}</p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-dark);">${story.story}</p>
                <div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
                    <span style="color: var(--text-light);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-left: 5px;">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        ${story.likes} إعجاب
                    </span>
                    <span style="color: var(--text-light);">
                        ${story.timestamp.toLocaleDateString('ar-SA')}
                    </span>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    setupModal() {
        const modal = document.getElementById('story-modal');
        const closeBtn = modal.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    updateStats() {
        const totalStoriesEl = document.getElementById('total-stories');
        const totalLikesEl = document.getElementById('total-likes');

        if (totalStoriesEl) {
            totalStoriesEl.textContent = this.stories.length;
        }

        if (totalLikesEl) {
            const totalLikes = this.stories.reduce((sum, story) => sum + story.likes, 0);
            totalLikesEl.textContent = totalLikes;
        }
    }

    initializeAudio() {
        const audio = document.getElementById('bg-audio');
        const audioBtn = document.getElementById('audio-btn');
        let isPlaying = false;

        if (!audio || !audioBtn) return;

        // Set initial volume
        audio.volume = 0.3;

        audioBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                audioBtn.style.opacity = '0.6';
                isPlaying = false;
            } else {
                audio.play().catch(e => console.log('Audio play failed:', e));
                audioBtn.style.opacity = '1';
                isPlaying = true;
            }
        });
    }

    toggleAudio() {
        const audio = document.getElementById('bg-audio');
        const audioBtn = document.getElementById('audio-btn');
        
        if (audio.paused) {
            audio.play();
            audioBtn.style.opacity = '1';
        } else {
            audio.pause();
            audioBtn.style.opacity = '0.6';
        }
    }
}

// Form submission handler for integration with backend
window.form = {
    async submit(data) {
        try {
            // This would typically send data to a backend
            console.log('Form data submitted:', data);
            
            // For demo purposes, we'll just simulate a successful submission
            return { success: true, message: 'Data submitted successfully' };
        } catch (error) {
            console.error('Form submission error:', error);
            return { success: false, message: 'Submission failed' };
        }
    }
};

// Global scroll function
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SaudiStoryWall();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.story-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Export for potential use in other modules
export default SaudiStoryWall;