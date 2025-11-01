// ETHER ADMIN DASHBOARD JAVASCRIPT

// Global Variables
let currentTab = 'dashboard';
let selectedStudents = new Set();
let isModalOpen = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadDashboardData();
});

// Initialize the application
function initializeApp() {
    // Set active tab
    setActiveTab('dashboard');
    
    // Initialize tooltips and interactions
    initializeTooltips();
    
    // Setup real-time updates
    setupRealTimeUpdates();
    
    console.log('Ether Admin Dashboard initialized');
}

// Setup event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            setActiveTab(tabName);
        });
    });
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            toggleSelectAll(this.checked);
        });
    }
    
    // Individual student checkboxes
    document.querySelectorAll('.table tbody input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateStudentSelection(this.id, this.checked);
        });
    });
    
    // Modal close on backdrop click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeAllModals();
        }
    });
}

// Tab Management
function setActiveTab(tabName) {
    // Update navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    
    currentTab = tabName;
    
    // Load tab-specific data
    switch(tabName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'defaulters':
            loadDefaultersData();
            break;
        case 'parents':
            loadParentAnalytics();
            break;
        case 'settings':
            loadSettings();
            break;
    }
    
    // Analytics tracking
    trackTabSwitch(tabName);
}

// Dashboard Functions
function loadDashboardData() {
    // Simulate loading dashboard data
    showLoadingState('.analytics-grid');
    
    setTimeout(() => {
        updateAnalyticsCards();
        loadRecentActivity();
        hideLoadingState('.analytics-grid');
    }, 1000);
}

function updateAnalyticsCards() {
    // Animate metric updates
    document.querySelectorAll('.metric-value').forEach(metric => {
        animateCounter(metric);
    });
    
    // Update trend indicators
    updateTrendIndicators();
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        if (element.textContent.includes('₹')) {
            element.textContent = `₹${current.toLocaleString()}`;
        } else if (element.textContent.includes('%')) {
            element.textContent = `${current}%`;
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function updateTrendIndicators() {
    // Add pulse animation to positive trends
    document.querySelectorAll('.metric-change.positive').forEach(indicator => {
        indicator.style.animation = 'pulse 2s infinite';
    });
}

// Recent Activity
function loadRecentActivity() {
    const activities = [
        {
            type: 'success',
            title: 'Payment Received',
            description: '₹12,500 from Rajesh Kumar (Grade 10-A)',
            time: '2 minutes ago'
        },
        {
            type: 'warning',
            title: 'Reminder Sent',
            description: 'Fee reminder sent to 15 parents',
            time: '1 hour ago'
        },
        {
            type: 'error',
            title: 'Payment Failed',
            description: '₹8,200 payment failed for Priya Sharma (Grade 8-B)',
            time: '3 hours ago'
        },
        {
            type: 'info',
            title: 'New Student Enrolled',
            description: 'Amit Patel enrolled in Grade 9-A',
            time: '5 hours ago'
        }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    <i class="lucide lucide-${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

function getActivityIcon(type) {
    const icons = {
        success: 'check-circle',
        warning: 'clock',
        error: 'alert-triangle',
        info: 'info'
    };
    return icons[type] || 'info';
}

// Defaulter Management
function loadDefaultersData() {
    showLoadingState('.table-container');
    
    setTimeout(() => {
        // Add row hover effects
        addTableRowEffects();
        hideLoadingState('.table-container');
    }, 800);
}

function addTableRowEffects() {
    document.querySelectorAll('.table tbody tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(108, 99, 255, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Student Selection
function toggleSelectAll(checked) {
    const checkboxes = document.querySelectorAll('.table tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = checked;
        updateStudentSelection(checkbox.id, checked);
    });
}

function updateStudentSelection(studentId, checked) {
    if (checked) {
        selectedStudents.add(studentId);
    } else {
        selectedStudents.delete(studentId);
    }
    
    updateBulkActionButton();
    updateSelectAllState();
}

function updateSelectAllState() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const allCheckboxes = document.querySelectorAll('.table tbody input[type="checkbox"]');
    const checkedCheckboxes = document.querySelectorAll('.table tbody input[type="checkbox"]:checked');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = allCheckboxes.length === checkedCheckboxes.length;
        selectAllCheckbox.indeterminate = checkedCheckboxes.length > 0 && checkedCheckboxes.length < allCheckboxes.length;
    }
}

function updateBulkActionButton() {
    const bulkButton = document.querySelector('[onclick="sendBulkReminders()"]');
    if (bulkButton) {
        if (selectedStudents.size > 0) {
            bulkButton.disabled = false;
            bulkButton.textContent = `Send Reminders (${selectedStudents.size})`;
            bulkButton.classList.add('btn-primary');
            bulkButton.classList.remove('btn-secondary');
        } else {
            bulkButton.disabled = true;
            bulkButton.textContent = 'Send Bulk Reminders';
            bulkButton.classList.add('btn-secondary');
            bulkButton.classList.remove('btn-primary');
        }
    }
}

// Reminder Functions
function openReminderModal() {
    const modal = document.getElementById('reminderModal');
    modal.classList.add('active');
    isModalOpen = true;
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
    }, 100);
    
    // Analytics tracking
    trackEvent('reminder_modal_opened');
}

function closeReminderModal() {
    const modal = document.getElementById('reminderModal');
    modal.classList.remove('active');
    isModalOpen = false;
    
    // Reset form
    resetReminderForm();
}

function resetReminderForm() {
    const modal = document.getElementById('reminderModal');
    modal.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    modal.querySelector('select').selectedIndex = 0;
    modal.querySelector('textarea').value = '';
}

function sendReminders() {
    const selectedRecipients = Array.from(document.querySelectorAll('#reminderModal input[type="checkbox"]:checked'));
    
    if (selectedRecipients.length === 0) {
        showNotification('Please select at least one recipient', 'warning');
        return;
    }
    
    // Show loading state
    const sendButton = document.querySelector('#reminderModal .btn-primary');
    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = '<i class="lucide lucide-loader-2 loading"></i> Sending...';
    sendButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        closeReminderModal();
        showSuccessToast();
        
        // Update activity feed
        addNewActivity({
            type: 'success',
            title: 'Reminders Sent',
            description: `${selectedRecipients.length} reminders sent successfully`,
            time: 'Just now'
        });
        
        // Analytics tracking
        trackEvent('reminders_sent', { count: selectedRecipients.length });
        
        // Reset button
        sendButton.innerHTML = originalText;
        sendButton.disabled = false;
    }, 2000);
}

function sendBulkReminders() {
    if (selectedStudents.size === 0) {
        showNotification('Please select students to send reminders', 'warning');
        return;
    }
    
    // Auto-populate modal with selected students
    populateReminderModal();
    openReminderModal();
}

function populateReminderModal() {
    // This would populate the modal with selected students
    // For demo purposes, we'll just open the modal
    console.log(`Sending reminders to ${selectedStudents.size} students`);
}

function sendReminder(studentId) {
    // Show loading state on the specific button
    const button = document.querySelector(`[onclick="sendReminder('${studentId}')"]`);
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="lucide lucide-loader-2 loading"></i>';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.innerHTML = '<i class="lucide lucide-check"></i> Sent';
        button.classList.add('success');
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
            button.classList.remove('success');
        }, 2000);
        
        showNotification('Reminder sent successfully', 'success');
    }, 1500);
}

// Toast Notifications
function showSuccessToast() {
    const toast = document.getElementById('successToast');
    toast.classList.add('active');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 5000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="lucide lucide-${getNotificationIcon(type)}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="lucide lucide-x"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('active'), 100);
    
    // Auto-remove
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        warning: 'alert-triangle',
        error: 'x-circle',
        info: 'info'
    };
    return icons[type] || 'info';
}

// Activity Management
function addNewActivity(activity) {
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item new-activity';
        activityElement.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="lucide lucide-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        
        activityList.insertBefore(activityElement, activityList.firstChild);
        
        // Remove oldest activity if more than 5
        const activities = activityList.querySelectorAll('.activity-item');
        if (activities.length > 5) {
            activities[activities.length - 1].remove();
        }
        
        // Animate new activity
        setTimeout(() => activityElement.classList.add('active'), 100);
    }
}

// Loading States
function showLoadingState(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add('loading');
        element.style.opacity = '0.6';
    }
}

function hideLoadingState(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.remove('loading');
        element.style.opacity = '1';
    }
}

// Parent Analytics
function loadParentAnalytics() {
    // Simulate loading parent analytics
    showLoadingState('.insights-grid');
    
    setTimeout(() => {
        animateParentMetrics();
        hideLoadingState('.insights-grid');
    }, 1000);
}

function animateParentMetrics() {
    // Animate drop-off percentages
    document.querySelectorAll('.dropoff-percentage').forEach(metric => {
        animateCounter(metric);
    });
}

// Settings
function loadSettings() {
    // Load current settings
    console.log('Loading settings...');
}

// Modal Management
function closeModal(modal) {
    modal.classList.remove('active');
    isModalOpen = false;
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    isModalOpen = false;
}

// Utility Functions
function initializeTooltips() {
    // Add tooltips to interactive elements
    document.querySelectorAll('[title]').forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    // Tooltip implementation
    console.log('Show tooltip for:', e.target.title);
}

function hideTooltip(e) {
    // Hide tooltip implementation
    console.log('Hide tooltip');
}

function setupRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        if (currentTab === 'dashboard') {
            updateRealTimeData();
        }
    }, 30000);
}

function updateRealTimeData() {
    // Update metrics with subtle animations
    document.querySelectorAll('.metric-value').forEach(metric => {
        metric.style.transform = 'scale(1.05)';
        setTimeout(() => {
            metric.style.transform = 'scale(1)';
        }, 200);
    });
}

// Analytics Tracking
function trackTabSwitch(tabName) {
    console.log(`Tab switched to: ${tabName}`);
    // Implement analytics tracking here
}

function trackEvent(eventName, data = {}) {
    console.log(`Event tracked: ${eventName}`, data);
    // Implement analytics tracking here
}

// Export Functions (for global access)
window.openReminderModal = openReminderModal;
window.closeReminderModal = closeReminderModal;
window.sendReminders = sendReminders;
window.sendBulkReminders = sendBulkReminders;
window.sendReminder = sendReminder;
window.showDefaulters = () => setActiveTab('defaulters');
window.viewDetails = (studentId) => {
    showNotification(`Viewing details for student: ${studentId}`, 'info');
};

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .loading {
        position: relative;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid var(--border-primary);
        border-top: 2px solid var(--primary-100);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .new-activity {
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    }
    
    .new-activity.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .success {
        background: var(--success-light) !important;
        color: var(--success) !important;
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: var(--space-xl);
        background: white;
        border-radius: var(--radius-lg);
        padding: var(--space-lg);
        box-shadow: var(--shadow-xl);
        border-left: 4px solid var(--primary-100);
        display: flex;
        align-items: center;
        gap: var(--space-md);
        z-index: 3000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    }
    
    .notification.active {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: var(--success);
    }
    
    .notification-warning {
        border-left-color: var(--warning);
    }
    
    .notification-error {
        border-left-color: var(--error);
    }
    
    .notification-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: var(--primary-100);
        background: var(--secondary-100);
    }
    
    .notification-success .notification-icon {
        background: var(--success-light);
        color: var(--success);
    }
    
    .notification-warning .notification-icon {
        background: var(--warning-light);
        color: var(--warning);
    }
    
    .notification-error .notification-icon {
        background: var(--error-light);
        color: var(--error);
    }
    
    .notification-content {
        flex: 1;
    }
    
    .notification-content p {
        font-family: var(--font-secondary);
        font-weight: 400;
        font-size: 14px;
        color: var(--text-primary);
        margin: 0;
    }
    
    .notification-close {
        width: 24px;
        height: 24px;
        background: transparent;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--text-tertiary);
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
    }
`;

document.head.appendChild(style);
