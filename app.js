// TEGAS 16:9 Presentation App JavaScript

class TEGAS16x9Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 21; // Updated for 16:9 content distribution
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideCounter = document.getElementById('slideCounter');
        
        // Data from the application_data_json - optimized for 16:9 charts
        this.data = {
            sessionRatings: [
                {"session": "Pitching & Story Telling", "trainer": "Richard Ker", "rating": 4.85, "attendance": "93%"},
                {"session": "Journey of Building & Scaling", "trainer": "Johan Nasir", "rating": 4.72, "attendance": "100%"},
                {"session": "Real-world Insights", "trainer": "Angel Low & Razlan", "rating": 4.63, "attendance": "93%"},
                {"session": "Digital Prototype Track", "trainer": "Various", "rating": 4.61, "attendance": "79%"},
                {"session": "Non-Digital Prototype Track", "trainer": "Various", "rating": 4.57, "attendance": "79%"},
                {"session": "Design Thinking", "trainer": "Sean Liew", "rating": 3.79, "attendance": "97%"},
                {"session": "Business Model", "trainer": "Sean Liew", "rating": 3.83, "attendance": "100%"}
            ],
            improvementAreas: [
                {"area": "Individual Mentorship", "mentions": 9, "priority": "High"},
                {"area": "Communication Style", "mentions": 6, "priority": "High"},
                {"area": "Practical Content", "mentions": 6, "priority": "High"},
                {"area": "Expert Knowledge", "mentions": 3, "priority": "Medium"},
                {"area": "Food & Facilities", "mentions": 4, "priority": "Medium"}
            ],
            focusAreas: [
                {"area": "Marketing & GTM", "requests": 8},
                {"area": "Business Model Development", "requests": 6},
                {"area": "Funding & Investment", "requests": 4},
                {"area": "Scaling Strategies", "requests": 3},
                {"area": "MVP Development", "requests": 1}
            ]
        };
        
        this.charts = {};
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateNavigationState();
        this.updateSlideCounter();
        
        // Initialize charts when the document is ready - optimized timing for 16:9
        setTimeout(() => {
            this.initializeCharts();
        }, 200);
    }
    
    setupEventListeners() {
        // Button navigation
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation - optimized for presentation mode
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case 'PageDown':
                case ' ': // Spacebar
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.showSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.showSlide(this.totalSlides);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.exitFullscreen();
                    break;
            }
        });
        
        // Touch/swipe support for mobile presentations
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.showSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    showSlide(slideNumber) {
        // Ensure slide number is valid
        if (slideNumber < 1 || slideNumber > this.totalSlides) {
            return;
        }
        
        // Hide current slide
        if (this.slides[this.currentSlide - 1]) {
            this.slides[this.currentSlide - 1].classList.remove('active');
        }
        
        // Show new slide
        this.currentSlide = slideNumber;
        if (this.slides[this.currentSlide - 1]) {
            this.slides[this.currentSlide - 1].classList.add('active');
        }
        
        // Update navigation state
        this.updateNavigationState();
        this.updateSlideCounter();
        
        // Initialize charts for slides that contain them
        this.initializeChartsForCurrentSlide();
        
        // Show navigation controls on slide change
        this.showNavigationControls();
    }
    
    updateNavigationState() {
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    updateSlideCounter() {
        this.slideCounter.textContent = `Slide ${this.currentSlide} of ${this.totalSlides}`;
    }
    
    initializeCharts() {
        this.createSessionRatingsChart();
        this.createImprovementChart();
        this.createFocusAreasChart();
    }
    
    initializeChartsForCurrentSlide() {
        // Re-initialize charts when slides become active - updated slide numbers for 16:9 layout
        setTimeout(() => {
            if (this.currentSlide === 2) {
                this.createSessionRatingsChart();
            } else if (this.currentSlide === 8) {
                this.createImprovementChart();
            } else if (this.currentSlide === 12) {
                this.createFocusAreasChart();
            }
        }, 150);
    }
    
    createSessionRatingsChart() {
        const ctx = document.getElementById('sessionRatingsChart');
        if (!ctx || this.charts.sessionRatings) return;
        
        // Destroy existing chart if it exists
        if (this.charts.sessionRatings) {
            this.charts.sessionRatings.destroy();
        }
        
        const labels = this.data.sessionRatings.map(item => item.session);
        const ratings = this.data.sessionRatings.map(item => item.rating);
        
        // Color-code by performance - 16:9 optimized colors
        const backgroundColors = this.data.sessionRatings.map(item => {
            if (item.rating >= 4.5) return '#1FB8CD'; // Excellent - Teal
            if (item.rating >= 4.0) return '#5D878F'; // Good - Blue-gray
            if (item.rating >= 3.5) return '#FFC185'; // Fair - Orange
            return '#DB4545'; // Poor - Red
        });
        
        this.charts.sessionRatings = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Session Rating (out of 5)',
                    data: ratings,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: (context) => {
                                const originalData = this.data.sessionRatings[context.dataIndex];
                                return [
                                    `Trainer: ${originalData.trainer}`,
                                    `Attendance: ${originalData.attendance}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 0.5,
                            font: {
                                size: 11
                            }
                        },
                        title: {
                            display: true,
                            text: 'Rating (1-5)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0,
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }
    
    createImprovementChart() {
        const ctx = document.getElementById('improvementChart');
        if (!ctx || this.charts.improvement) return;
        
        // Destroy existing chart if it exists
        if (this.charts.improvement) {
            this.charts.improvement.destroy();
        }
        
        const labels = this.data.improvementAreas.map(item => item.area);
        const mentions = this.data.improvementAreas.map(item => item.mentions);
        
        // Color code by priority - 16:9 optimized
        const backgroundColors = this.data.improvementAreas.map(item => 
            item.priority === 'High' ? '#DB4545' : '#FFC185'
        );
        
        this.charts.improvement = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Mentions',
                    data: mentions,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: (context) => {
                                const priority = this.data.improvementAreas[context.dataIndex].priority;
                                return `Priority: ${priority}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            font: {
                                size: 11
                            }
                        },
                        title: {
                            display: true,
                            text: 'Mentions',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0,
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }
    
    createFocusAreasChart() {
        const ctx = document.getElementById('focusAreasChart');
        if (!ctx || this.charts.focusAreas) return;
        
        // Destroy existing chart if it exists
        if (this.charts.focusAreas) {
            this.charts.focusAreas.destroy();
        }
        
        const labels = this.data.focusAreas.map(item => item.area);
        const requests = this.data.focusAreas.map(item => item.requests);
        
        this.charts.focusAreas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Requests',
                    data: requests,
                    backgroundColor: ['#1FB8CD', '#5D878F', '#B4413C', '#964325', '#944454'],
                    borderColor: ['#1FB8CD', '#5D878F', '#B4413C', '#964325', '#944454'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.label}: ${context.parsed.y} requests`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            font: {
                                size: 11
                            }
                        },
                        title: {
                            display: true,
                            text: 'Requests',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0,
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Enhanced chart management for 16:9 presentation
    refreshCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
        
        // Re-initialize charts based on current slide
        setTimeout(() => {
            this.initializeChartsForCurrentSlide();
        }, 100);
    }
    
    // Navigation control visibility for presentation mode
    showNavigationControls() {
        const controls = document.querySelector('.navigation-controls');
        if (controls) {
            controls.style.opacity = '1';
            controls.style.visibility = 'visible';
        }
        
        // Auto-hide after 3 seconds
        clearTimeout(this.hideControlsTimeout);
        this.hideControlsTimeout = setTimeout(() => {
            this.hideNavigationControls();
        }, 3000);
    }
    
    hideNavigationControls() {
        const controls = document.querySelector('.navigation-controls');
        if (controls) {
            controls.style.opacity = '0.3';
        }
    }
    
    // Fullscreen management
    enterFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
    
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }
    
    // Slide jump functionality
    jumpToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.showSlide(slideNumber);
        }
    }
    
    // Get current slide info
    getCurrentSlideInfo() {
        return {
            current: this.currentSlide,
            total: this.totalSlides,
            percentage: Math.round((this.currentSlide / this.totalSlides) * 100)
        };
    }
}

// Initialize the presentation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new TEGAS16x9Presentation();
    
    // Make presentation globally available for debugging and external control
    window.tegasPresentation = presentation;
    
    // Add fullscreen toggle on F key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            presentation.toggleFullscreen();
        }
    });
    
    // Handle window resize to refresh charts - important for 16:9 responsiveness
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            presentation.refreshCharts();
        }, 250);
    });
    
    // Mouse movement shows controls
    let mouseMoveTimeout;
    document.addEventListener('mousemove', () => {
        presentation.showNavigationControls();
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            presentation.hideNavigationControls();
        }, 3000);
    });
    
    // Initial control hiding
    setTimeout(() => {
        presentation.hideNavigationControls();
    }, 5000);
});

// Prevent context menu for cleaner presentation
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle visibility change (useful for presentations)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or timers when tab is hidden
        console.log('Presentation paused');
    } else {
        // Resume when tab becomes visible
        console.log('Presentation resumed');
        if (window.tegasPresentation) {
            window.tegasPresentation.refreshCharts();
        }
    }
});

// Add presentation utilities
window.presentationUtils = {
    jumpToSlide: (slideNumber) => {
        if (window.tegasPresentation) {
            window.tegasPresentation.jumpToSlide(slideNumber);
        }
    },
    
    getCurrentInfo: () => {
        return window.tegasPresentation ? 
               window.tegasPresentation.getCurrentSlideInfo() : 
               null;
    },
    
    toggleFullscreen: () => {
        if (window.tegasPresentation) {
            window.tegasPresentation.toggleFullscreen();
        }
    },
    
    refreshCharts: () => {
        if (window.tegasPresentation) {
            window.tegasPresentation.refreshCharts();
        }
    }
};

// Performance optimization for charts
Chart.defaults.font.family = 'var(--font-family-base)';
Chart.defaults.color = 'var(--color-text)';
Chart.defaults.backgroundColor = 'var(--color-surface)';

// Add smooth transitions for slide changes
const style = document.createElement('style');
style.textContent = `
    .slide {
        transition: opacity 0.3s ease-in-out;
    }
    
    .slide:not(.active) {
        opacity: 0;
        pointer-events: none;
    }
    
    .slide.active {
        opacity: 1;
        pointer-events: auto;
    }
`;
document.head.appendChild(style);

// Console commands for presentation control (useful for debugging)
console.log(`
TEGAS 16:9 Presentation loaded successfully!
Available commands:
- presentationUtils.jumpToSlide(n) - Jump to slide n
- presentationUtils.getCurrentInfo() - Get current slide info
- presentationUtils.toggleFullscreen() - Toggle fullscreen mode
- presentationUtils.refreshCharts() - Refresh all charts

Keyboard shortcuts:
- Arrow keys / Space / Page Up/Down: Navigate slides
- Home/End: Jump to first/last slide
- F: Toggle fullscreen
- Esc: Exit fullscreen
`);