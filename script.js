// ============================================
// SPOTIFY CLONE - COMBINED JAVASCRIPT
// ============================================

// ============================================
// AUTHENTICATION CHECK
// ============================================
function checkAuthentication() {
    const user = localStorage.getItem('spotifyUser');
    const landingPage = document.getElementById('landingPage');
    const appPage = document.getElementById('appPage');
    
    if (!user) {
        // Show landing page
        if (landingPage) landingPage.style.display = 'block';
        if (appPage) appPage.style.display = 'none';
        return null;
    }
    
    // Show app page
    if (landingPage) landingPage.style.display = 'none';
    if (appPage) appPage.style.display = 'block';
    return JSON.parse(user);
}

const currentUser = checkAuthentication();

// ============================================
// LANDING PAGE - DOM ELEMENTS
// ============================================
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// ============================================
// APP PAGE - DOM ELEMENTS
// ============================================
const playButtons = document.querySelectorAll('.card');
const premiumBtn = document.querySelector('[data-action="premium"]');
const installBtn = document.querySelector('[data-action="install"]');
const userIcon = document.querySelector('[data-action="user"]');
const forwardBtn = document.querySelector('[data-action="forward"]');
const backwardBtn = document.querySelector('[data-action="backward"]');
const playPauseBtn = document.querySelector('[data-action="play-pause"]');
const nextBtn = document.querySelector('[data-action="next"]');
const prevBtn = document.querySelector('[data-action="prev"]');
const shuffleBtn = document.querySelector('[data-action="shuffle"]');
const repeatBtn = document.querySelector('[data-action="repeat"]');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.curr-time');
const totalTimeEl = document.querySelector('.tot-time');
const homeNav = document.querySelector('[data-nav="home"]');
const searchNav = document.querySelector('[data-nav="search"]');
const createPlaylistBtn = document.querySelector('[data-action="create-playlist"]');
const browsePodcastsBtn = document.querySelector('[data-action="browse-podcasts"]');
const cardContainers = document.querySelectorAll('.cards-container');

// ============================================
// MUSIC PLAYER STATE
// ============================================
const playerState = {
    isPlaying: false,
    isShuffle: false,
    repeatMode: 0,
    currentTime: 0,
    duration: 213,
    volume: 100,
    currentTrack: null,
    queue: [],
    currentTrackIndex: 0
};

// ============================================
// PLAYLIST DATA WITH UNSPLASH IMAGES
// ============================================
const playlistsData = [
    // Recently Played
    { id: 1, title: 'Blinding Lights', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', description: 'The Weeknd - Latest Hits' },
    { id: 2, title: 'Levitating', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80', description: 'Dua Lipa - Dance Hits' },
    { id: 3, title: 'Anti-Hero', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', description: 'Taylor Swift - Trending Now' },
    { id: 4, title: 'Flowers', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&q=80', description: 'Miley Cyrus - Pop Sensation' },
    { id: 5, title: 'Shape of You', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80', description: 'Ed Sheeran - All Time Favorite' },
    { id: 6, title: 'Bohemian Rhapsody', image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&q=80', description: 'Queen - Classic Rock' },
    
    // Trending Now
    { id: 7, title: 'Espresso', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', description: 'Sabrina Carpenter - Viral Hit' },
    { id: 8, title: 'Cruel Summer', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80', description: 'Olivia Rodrigo - Pop Chart Topper' },
    { id: 9, title: 'Vampire', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', description: 'Olivia Rodrigo - Dark Pop' },
    { id: 10, title: 'Beautiful Things', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&q=80', description: 'Benson Boone - Emotional Ballad' },
    { id: 11, title: 'Pink + White', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80', description: 'Frank Ocean - Modern Classic' },
    { id: 12, title: 'Uptown Funk', image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&q=80', description: 'Mark Ronson ft. Bruno Mars' },
    
    // Featured Charts
    { id: 13, title: 'Heat Waves', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', description: 'Glass Animals - Indie Pop' },
    { id: 14, title: 'Good as Hell', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80', description: 'Lizzo - Feel Good Anthem' },
    { id: 15, title: 'Starboy', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', description: 'The Weeknd ft. Daft Punk' },
    { id: 16, title: 'Kill Bill', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&q=80', description: 'SZA - R&B Hit' },
    { id: 17, title: 'Industry Baby', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80', description: 'Lil Nas X - Hip Hop Anthem' },
    { id: 18, title: 'Watermelon Sugar', image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&q=80', description: 'Harry Styles - Summer Vibes' },
    { id: 19, title: 'drivers license', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', description: 'Olivia Rodrigo - Heartbreak Song' },
    { id: 20, title: 'Bad Habits', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80', description: 'Ed Sheeran - Latest Single' },
    { id: 21, title: 'As It Was', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', description: 'Harry Styles - Chart Buster' },
    { id: 22, title: 'Unholy', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&q=80', description: 'Sam Smith & Kim Petras' },
    { id: 23, title: 'SNOOZE', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80', description: 'SZA - Smooth R&B' },
    { id: 24, title: 'Break My Soul', image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&q=80', description: 'Beyoncé - Dance Track' }
];

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    populateCards();
    setupLandingPageEvents();
    console.log('Spotify Clone loaded successfully!');
});

// ============================================
// LANDING PAGE - MODAL MANAGEMENT
// ============================================
function showLoginPage() {
    if (authModal) authModal.classList.add('show');
    if (loginForm) loginForm.classList.add('show');
    if (signupForm) signupForm.classList.remove('show');
}

function showSignupPage() {
    if (authModal) authModal.classList.add('show');
    if (signupForm) signupForm.classList.add('show');
    if (loginForm) loginForm.classList.remove('show');
}

function closeAuthModal() {
    if (authModal) authModal.classList.remove('show');
    if (loginForm) loginForm.classList.remove('show');
    if (signupForm) signupForm.classList.remove('show');
}

function switchToSignup() {
    if (loginForm) loginForm.classList.remove('show');
    if (signupForm) signupForm.classList.add('show');
}

function switchToLogin() {
    if (signupForm) signupForm.classList.remove('show');
    if (loginForm) loginForm.classList.add('show');
}

// ============================================
// LANDING PAGE - FORM HANDLING
// ============================================
function handleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    if (!emailInput || !passwordInput) return;
    
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }

    showToast('Logging in...', 'info');
    
    setTimeout(() => {
        const user = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toLocaleString()
        };
        localStorage.setItem('spotifyUser', JSON.stringify(user));
        
        showToast('Login successful!', 'success');
        
        setTimeout(() => {
            closeAuthModal();
            checkAuthentication();
        }, 1000);
    }, 1000);
}

function handleSignup(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmInput = document.getElementById('signup-confirm');
    
    if (!nameInput || !emailInput || !passwordInput || !confirmInput) return;
    
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }

    if (password.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    showToast('Creating your account...', 'info');
    
    setTimeout(() => {
        const user = {
            name: name,
            email: email,
            signupTime: new Date().toLocaleString(),
            premium: false
        };
        localStorage.setItem('spotifyUser', JSON.stringify(user));
        
        showToast('Account created successfully!', 'success');
        
        setTimeout(() => {
            closeAuthModal();
            checkAuthentication();
        }, 1000);
    }, 1000);
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    if (!document.getElementById('toastStyles')) {
        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: rgba(29, 185, 84, 0.9);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                z-index: 10000;
                animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s forwards;
                max-width: 300px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(29, 185, 84, 0.3);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }

            .toast-error {
                background: rgba(220, 38, 38, 0.9) !important;
                border-color: rgba(220, 38, 38, 0.3) !important;
            }

            .toast-info {
                background: rgba(59, 130, 246, 0.9) !important;
                border-color: rgba(59, 130, 246, 0.3) !important;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @media (max-width: 640px) {
                .toast {
                    bottom: 20px;
                    right: 20px;
                    left: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ============================================
// LANDING PAGE - SETUP
// ============================================
function setupLandingPageEvents() {
    // Close modal on outside click
    if (authModal) {
        window.addEventListener('click', function(event) {
            if (event.target === authModal) {
                closeAuthModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAuthModal();
        }
    });

    // Social buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            showToast(`${provider} login coming soon!`, 'info');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// PLAYER - EVENT LISTENERS
// ============================================
function initializeEventListeners() {
    // Navigation
    if (homeNav) homeNav.addEventListener('click', handleNavigation);
    if (searchNav) searchNav.addEventListener('click', handleSearch);

    // Premium & Installation
    if (premiumBtn) premiumBtn.addEventListener('click', handlePremiumClick);
    if (installBtn) installBtn.addEventListener('click', handleInstallApp);
    if (userIcon) userIcon.addEventListener('click', handleUserProfile);

    // Playlist Actions
    if (createPlaylistBtn) createPlaylistBtn.addEventListener('click', handleCreatePlaylist);
    if (browsePodcastsBtn) browsePodcastsBtn.addEventListener('click', handleBrowsePodcasts);

    // Player Controls
    if (playPauseBtn) playPauseBtn.addEventListener('click', handlePlayPause);
    if (nextBtn) nextBtn.addEventListener('click', handleNext);
    if (prevBtn) prevBtn.addEventListener('click', handlePrevious);
    if (shuffleBtn) shuffleBtn.addEventListener('click', handleShuffle);
    if (repeatBtn) repeatBtn.addEventListener('click', handleRepeat);
    if (forwardBtn) forwardBtn.addEventListener('click', handleForward);
    if (backwardBtn) backwardBtn.addEventListener('click', handleBackward);

    // Progress Bar
    if (progressBar) {
        progressBar.addEventListener('input', handleProgressChange);
    }

    // Card Click Events
    cardContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                playTrackFromCard(card);
            }
        });
    });
}

// ============================================
// PLAYER CONTROLS
// ============================================
function handlePlayPause() {
    playerState.isPlaying = !playerState.isPlaying;
    
    if (playerState.isPlaying) {
        console.log('▶ Playing:', playerState.currentTrack || 'Unknown Track');
        simulatePlayback();
    } else {
        console.log('⏸ Paused');
    }
    
    updatePlayerUI();
}

function handleNext() {
    if (playerState.queue.length > 0) {
        playerState.currentTrackIndex = (playerState.currentTrackIndex + 1) % playerState.queue.length;
        playTrack(playerState.queue[playerState.currentTrackIndex]);
    }
    console.log('⏭ Next track');
}

function handlePrevious() {
    if (playerState.queue.length > 0) {
        playerState.currentTrackIndex = (playerState.currentTrackIndex - 1 + playerState.queue.length) % playerState.queue.length;
        playTrack(playerState.queue[playerState.currentTrackIndex]);
    }
    console.log('⏮ Previous track');
}

function handleShuffle() {
    playerState.isShuffle = !playerState.isShuffle;
    if (shuffleBtn) shuffleBtn.style.opacity = playerState.isShuffle ? '1' : '0.7';
    console.log('🔀 Shuffle:', playerState.isShuffle ? 'ON' : 'OFF');
}

function handleRepeat() {
    playerState.repeatMode = (playerState.repeatMode + 1) % 3;
    updateRepeatUI();
    console.log('🔁 Repeat mode:', ['OFF', 'ALL', 'ONE'][playerState.repeatMode]);
}

function handleForward() {
    playerState.currentTime = Math.min(playerState.currentTime + 10, playerState.duration);
    updateProgressBar();
    console.log('⏩ Fast forward to:', formatTime(playerState.currentTime));
}

function handleBackward() {
    playerState.currentTime = Math.max(playerState.currentTime - 10, 0);
    updateProgressBar();
    console.log('⏪ Rewind to:', formatTime(playerState.currentTime));
}

function handleProgressChange(e) {
    playerState.currentTime = (e.target.value / 100) * playerState.duration;
    updateProgressBar();
}

// ============================================
// TRACK MANAGEMENT
// ============================================
function playTrackFromCard(card) {
    const title = card.querySelector('.card-title')?.textContent || 'Unknown Track';
    const image = card.querySelector('.card-img')?.src || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80';
    
    playerState.currentTrack = { title, image };
    playerState.isPlaying = true;
    playerState.currentTime = 0;
    
    console.log('🎵 Now playing:', title);
    updatePlayerUI();
    simulatePlayback();
}

function playTrack(trackData) {
    playerState.currentTrack = trackData;
    playerState.isPlaying = true;
    playerState.currentTime = 0;
    
    console.log('🎵 Now playing:', trackData.title);
    updatePlayerUI();
    simulatePlayback();
}

function simulatePlayback() {
    if (playerState.isPlaying && playerState.currentTime < playerState.duration) {
        setTimeout(() => {
            playerState.currentTime += 1;
            updateProgressBar();
            simulatePlayback();
        }, 1000);
    } else if (playerState.currentTime >= playerState.duration) {
        if (playerState.repeatMode === 2) {
            playerState.currentTime = 0;
            simulatePlayback();
        } else if (playerState.repeatMode === 1 || playerState.queue.length > 0) {
            handleNext();
        } else {
            playerState.isPlaying = false;
            updatePlayerUI();
        }
    }
}

// ============================================
// UI UPDATES
// ============================================
function updatePlayerUI() {
    const albumDiv = document.querySelector('.album');
    if (playerState.currentTrack && albumDiv) {
        albumDiv.innerHTML = `
            <div style="display: flex; align-items: center; padding: 0 1rem;">
                <img src="${playerState.currentTrack.image}" alt="${playerState.currentTrack.title}" 
                     style="width: 56px; height: 56px; border-radius: 4px; margin-right: 1rem;">
                <div>
                    <p style="margin: 0; font-size: 0.9rem;">${playerState.currentTrack.title}</p>
                    <p style="margin: 0; font-size: 0.75rem; opacity: 0.7;">Artist Name</p>
                </div>
            </div>
        `;
    }
}

function updateProgressBar() {
    if (progressBar && currentTimeEl && totalTimeEl) {
        const percent = (playerState.currentTime / playerState.duration) * 100;
        progressBar.value = percent;
        currentTimeEl.textContent = formatTime(playerState.currentTime);
    }
}

function updateRepeatUI() {
    if (repeatBtn) {
        repeatBtn.style.opacity = playerState.repeatMode === 0 ? '0.7' : '1';
        repeatBtn.style.color = playerState.repeatMode === 2 ? '#1bd760' : '#fff';
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ============================================
// MODAL DIALOGS
// ============================================
function handlePremiumClick() {
    const modal = createModal({
        title: '✨ Go Premium',
        content: `
            <p style="font-size: 1.1rem; margin: 1rem 0;">Unlock unlimited music and ad-free listening!</p>
            <div style="margin: 1.5rem 0;">
                <p style="font-weight: 600; margin: 0.5rem 0;">Premium Features:</p>
                <ul style="margin: 0.5rem 0;">
                    <li>📵 No ads</li>
                    <li>🎵 Offline downloads</li>
                    <li>🔊 High audio quality</li>
                    <li>🔀 Skip unlimited songs</li>
                </ul>
            </div>
            <p>Starting at <strong>$10.99/month</strong></p>
        `,
        buttons: [
            { text: 'Start Free Trial', class: 'badge', callback: () => { showToast('Free trial activated! 🎉', 'success'); modal.close(); } },
            { text: 'See Plans', class: 'badge dark-badge', callback: () => { showToast('Opening plans page...', 'info'); } }
        ]
    });
}

function handleInstallApp() {
    const modal = createModal({
        title: '⬇️ Install Spotify App',
        content: `
            <p>Get the Spotify app for a better experience!</p>
            <div style="margin: 1.5rem 0;">
                <p style="font-weight: 600;">Available on:</p>
                <ul>
                    <li>🍎 iOS</li>
                    <li>🤖 Android</li>
                    <li>🖥️ Desktop (Windows/Mac)</li>
                </ul>
            </div>
        `,
        buttons: [
            { text: 'Download Now', class: 'badge', callback: () => { showToast('Redirecting to download page...', 'info'); modal.close(); } },
            { text: 'Cancel', class: 'badge dark-badge', callback: () => { modal.close(); } }
        ]
    });
}

function handleUserProfile() {
    const userName = currentUser?.name || 'User';
    const userEmail = currentUser?.email || 'user@example.com';
    const subscriptionType = currentUser?.premium ? 'Premium' : 'Free';
    
    const modal = createModal({
        title: '👤 User Profile',
        content: `
            <div style="text-align: center; margin: 1.5rem 0;">
                <div style="font-size: 3rem; margin: 1rem 0;">👋</div>
                <p><strong>Welcome, ${userName}!</strong></p>
                <p>Email: ${userEmail}</p>
                <p>Subscription: <span style="color: #1bd760; font-weight: 600;">${subscriptionType} Plan</span></p>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 1rem;">
                    Joined ${currentUser?.signupTime || 'Recently'}
                </p>
            </div>
        `,
        buttons: [
            { text: 'Settings', class: 'badge', callback: () => { showToast('Opening settings...', 'info'); } },
            { text: 'Logout', class: 'badge dark-badge', callback: () => { 
                localStorage.removeItem('spotifyUser');
                showToast('You have been logged out!', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1500);
            } }
        ]
    });
}

function handleCreatePlaylist() {
    const modal = createModal({
        title: '🎵 Create Playlist',
        content: `
            <div style="margin: 1.5rem 0;">
                <input type="text" placeholder="Playlist name" id="playlist-name" 
                       style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #404040; 
                              background-color: #232323; color: #fff; margin-bottom: 1rem; box-sizing: border-box;">
                <textarea placeholder="Add description (optional)" id="playlist-desc" 
                          style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #404040; 
                                 background-color: #232323; color: #fff; resize: none; height: 80px; box-sizing: border-box;"></textarea>
            </div>
        `,
        buttons: [
            { text: 'Create', class: 'badge', callback: () => { 
                const name = document.getElementById('playlist-name').value || 'My Playlist';
                showToast(`Playlist "${name}" created! 🎉`, 'success'); 
                modal.close(); 
            }},
            { text: 'Cancel', class: 'badge dark-badge', callback: () => { modal.close(); } }
        ]
    });
}

function handleBrowsePodcasts() {
    const modal = createModal({
        title: '🎙️ Browse Podcasts',
        content: `
            <p>Discover amazing podcasts:</p>
            <div style="margin: 1rem 0;">
                <p>📻 <strong>The Joe Rogan Experience</strong></p>
                <p>🎤 <strong>TED Talks Daily</strong></p>
                <p>🔬 <strong>Stuff You Should Know</strong></p>
                <p>💼 <strong>The Daily</strong></p>
            </div>
        `,
        buttons: [
            { text: 'Browse All', class: 'badge', callback: () => { showToast('Opening podcasts library...', 'info'); modal.close(); } },
            { text: 'Close', class: 'badge dark-badge', callback: () => { modal.close(); } }
        ]
    });
}

// ============================================
// PRICING PLAN HANDLERS
// ============================================
function handlePremiumTrialClick() {
    const modal = createModal({
        title: '✨ Start Your Free Trial',
        content: `
            <p style="font-size: 1.1rem; margin: 1rem 0;">Get 1 month free trial of Premium!</p>
            <div style="margin: 1.5rem 0;">
                <p style="font-weight: 600; margin: 0.5rem 0;">Premium includes:</p>
                <ul style="margin: 0.5rem 0;">
                    <li>✓ Ad-free listening</li>
                    <li>✓ High quality audio</li>
                    <li>✓ Offline downloads</li>
                    <li>✓ Skip unlimited songs</li>
                </ul>
            </div>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                <strong>$10.99/month</strong> after free trial. Cancel anytime.
            </p>
        `,
        buttons: [
            { text: 'Start Free Trial', class: 'badge', callback: () => { 
                showToast('Free trial activated! Enjoy premium for 30 days 🎉', 'success'); 
                modal.close(); 
            }},
            { text: 'Cancel', class: 'badge dark-badge', callback: () => { modal.close(); } }
        ]
    });
}

function handleFamilyPlanClick() {
    const modal = createModal({
        title: '👨‍👩‍👧‍👦 Family Plan',
        content: `
            <p style="font-size: 1.1rem; margin: 1rem 0;">Share music with your family</p>
            <div style="margin: 1.5rem 0;">
                <p style="font-weight: 600; margin: 0.5rem 0;">Family Plan Features:</p>
                <ul style="margin: 0.5rem 0;">
                    <li>✓ Up to 6 accounts</li>
                    <li>✓ Ad-free listening for all</li>
                    <li>✓ Offline downloads</li>
                    <li>✓ Family Mix playlist</li>
                    <li>✓ Parental controls available</li>
                </ul>
            </div>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">
                <strong>$15.99/month</strong> - Includes 1 month free trial
            </p>
        `,
        buttons: [
            { text: 'Start Free Trial', class: 'badge', callback: () => { 
                showToast('Family plan trial activated! 👨‍👩‍👧‍👦', 'success'); 
                modal.close(); 
            }},
            { text: 'View Pricing', class: 'badge dark-badge', callback: () => { showToast('Redirecting to pricing details...', 'info'); } }
        ]
    });
}

// ============================================
// NAVIGATION & SEARCH
// ============================================
function handleNavigation(e) {
    e.preventDefault();
    const navItem = e.target.closest('.nav-option');
    if (navItem) {
        document.querySelectorAll('.nav-option').forEach(item => item.classList.remove('nav-option-active'));
        navItem.classList.add('nav-option-active');
        console.log('Navigated to:', navItem.textContent.trim());
    }
}

function handleSearch(e) {
    e.preventDefault();
    const searchTerm = prompt('🔍 Search songs, artists, or playlists:');
    if (searchTerm) {
        console.log('Searching for:', searchTerm);
        showToast(`Searching for "${searchTerm}"...`, 'info');
    }
}

// ============================================
// CARD POPULATION
// ============================================
function populateCards() {
    const containers = document.querySelectorAll('.cards-container');
    
    containers.forEach((container, index) => {
        const existingCards = container.querySelectorAll('.card');
        const startIndex = index * 3;
        
        existingCards.forEach((card, cardIndex) => {
            const dataIndex = (startIndex + cardIndex) % playlistsData.length;
            const playlist = playlistsData[dataIndex];
            
            const img = card.querySelector('.card-img');
            const title = card.querySelector('.card-title');
            const info = card.querySelector('.card-info');
            
            if (img) img.src = playlist.image;
            if (img) img.alt = playlist.title;
            if (title) title.textContent = playlist.title;
            if (info) info.textContent = playlist.description;
        });
    });
}

// ============================================
// MODAL FACTORY FUNCTION
// ============================================
function createModal(options) {
    const { title, content, buttons } = options;
    
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalBox = document.createElement('div');
    modalBox.style.cssText = `
        background-color: #282828;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
    `;
    
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    titleEl.style.cssText = 'margin: 0 0 1rem 0; font-size: 1.5rem;';
    
    const contentEl = document.createElement('div');
    contentEl.innerHTML = content;
    contentEl.style.cssText = 'margin: 1rem 0; color: #fff;';
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.cssText = 'display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: flex-end;';
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.className = btn.class;
        button.onclick = btn.callback;
        button.style.cssText = 'cursor: pointer;';
        buttonsDiv.appendChild(button);
    });
    
    modalBox.appendChild(titleEl);
    modalBox.appendChild(contentEl);
    modalBox.appendChild(buttonsDiv);
    modalOverlay.appendChild(modalBox);
    document.body.appendChild(modalOverlay);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    return {
        close: () => {
            modalOverlay.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => modalOverlay.remove(), 300);
        }
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function getLoggedInUser() {
    const user = localStorage.getItem('spotifyUser');
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem('spotifyUser');
    location.reload();
}

console.log('Spotify Clone JavaScript loaded successfully!');
