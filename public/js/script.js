// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab triggers
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabsContainer = this.closest('.tabs');
            
            // Remove active class from all triggers in this tabs container
            tabsContainer.querySelectorAll('.tab-trigger').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked trigger
            this.classList.add('active');
            
            // Hide all tab contents in this tabs container
            tabsContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab content
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        });
    });
    
    // Animate progress bars on page load
    animateProgressBars();
});

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Optional: Add card hover effects
document.querySelectorAll('.dinosaur-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
