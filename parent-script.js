// ETHER PARENT APP JAVASCRIPT

// Global Variables
let currentStep = 1;
let selectedPaymentMethod = null;
let paymentData = {
    studentId: 'AS2024001',
    studentName: 'Arjun Sharma',
    totalAmount: 13466,
    fees: [
        { name: 'Tuition Fee', period: 'April 2024', amount: 8500 },
        { name: 'Library Fee', period: 'Annual', amount: 2000 },
        { name: 'Sports Fee', period: 'Quarterly', amount: 1500 },
        { name: 'Transport Fee', period: 'Monthly', amount: 1200 },
        { name: 'Late Fee', period: 'Overdue 15 days', amount: 266 }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeParentApp();
    setupEventListeners();
    loadPaymentData();
});

// Initialize the parent app
function initializeParentApp() {
    // Set initial step
    setActiveStep(1);
    
    // Initialize mobile-specific features
    initializeMobileFeatures();
    
    // Setup payment flow
    setupPaymentFlow();
    
    console.log('Ether Parent App initialized');
}

// Setup event listeners
function setupEventListeners() {
    // Back button
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
    
    // Help button
    const helpBtn = document.querySelector('.help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', showHelp);
    }
    
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            setActiveNavItem(this);
        });
    });
    
    // Modal close handlers
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Prevent zoom on input focus (mobile)
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', preventZoom);
    });
}

// Step Management
function setActiveStep(stepNumber) {
    // Update progress indicator
    updateProgressIndicator(stepNumber);
    
    // Update step content
    document.querySelectorAll('.payment-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    currentStep = stepNumber;
    
    // Analytics tracking
    trackStepChange(stepNumber);
}

function updateProgressIndicator(stepNumber) {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < stepNumber) {
            step.classList.add('completed');
        } else if (stepNum === stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Update progress lines
    document.querySelectorAll('.progress-line').forEach((line, index) => {
        const lineNum = index + 1;
        line.classList.remove('active');
        
        if (lineNum < stepNumber) {
            line.classList.add('active');
        }
    });
}

// Payment Flow Functions
function loadPaymentData() {
    // Display student information
    updateStudentInfo();
    
    // Calculate and display fees
    updateFeeBreakdown();
    
    // Show payment options
    updatePaymentOptions();
}

function updateStudentInfo() {
    const studentAvatar = document.querySelector('.student-avatar');
    const studentName = document.querySelector('.student-info h3');
    const studentDetails = document.querySelector('.student-info p');
    
    if (studentAvatar) {
        studentAvatar.textContent = getInitials(paymentData.studentName);
    }
    
    if (studentName) {
        studentName.textContent = paymentData.studentName;
    }
    
    if (studentDetails) {
        studentDetails.textContent = `Grade 10-A • Student ID: ${paymentData.studentId}`;
    }
}

function updateFeeBreakdown() {
    const feeList = document.querySelector('.fee-list');
    const totalAmount = document.querySelector('.total-amount');
    
    if (feeList) {
        feeList.innerHTML = paymentData.fees.map(fee => `
            <div class="fee-item ${fee.name === 'Late Fee' ? 'late-fee' : ''}">
                <div class="fee-label">
                    <span class="fee-name">${fee.name}</span>
                    <span class="fee-period">${fee.period}</span>
                </div>
                <div class="fee-amount">₹${fee.amount.toLocaleString()}</div>
            </div>
        `).join('');
    }
    
    if (totalAmount) {
        totalAmount.textContent = `₹${paymentData.totalAmount.toLocaleString()}`;
    }
}

function updatePaymentOptions() {
    // This would typically load available payment methods from the server
    console.log('Payment options loaded');
}

// Payment Method Selection
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Update UI to show selected method
    updateSelectedMethodDisplay(method);
    
    // Analytics tracking
    trackEvent('payment_method_selected', { method: method });
}

function updateSelectedMethodDisplay(method) {
    const methodIcons = {
        upi: 'lucide-smartphone',
        card: 'lucide-credit-card',
        netbanking: 'lucide-building-2'
    };
    
    const methodNames = {
        upi: 'UPI Payment',
        card: 'Credit/Debit Card',
        netbanking: 'Net Banking'
    };
    
    const methodDescriptions = {
        upi: 'Pay using UPI apps',
        card: 'Visa, Mastercard, RuPay',
        netbanking: 'Direct bank transfer'
    };
    
    const selectedMethodElement = document.getElementById('selectedMethod');
    if (selectedMethodElement) {
        selectedMethodElement.innerHTML = `
            <div class="method-header">
                <div class="method-icon upi">
                    <i class="${methodIcons[method]}"></i>
                </div>
                <div class="method-info">
                    <h3>${methodNames[method]}</h3>
                    <p>${methodDescriptions[method]}</p>
                </div>
                <button class="change-method" onclick="changePaymentMethod()">
                    <i class="lucide lucide-edit"></i>
                    Change
                </button>
            </div>
        `;
    }
}

// Step Navigation
function proceedToPayment() {
    if (!selectedPaymentMethod) {
        showNotification('Please select a payment method', 'warning');
        return;
    }
    
    setActiveStep(2);
    
    // Analytics tracking
    trackEvent('payment_step_2_entered');
}

function goToPreviousStep() {
    if (currentStep > 1) {
        setActiveStep(currentStep - 1);
        
        // Analytics tracking
        trackEvent('payment_step_back', { from: currentStep + 1, to: currentStep });
    }
}

function goToNextStep() {
    if (currentStep < 3) {
        setActiveStep(currentStep + 1);
        
        // Analytics tracking
        trackEvent('payment_step_forward', { from: currentStep - 1, to: currentStep });
    }
}

// Payment Processing
function initiateUPI(app) {
    // Show payment status
    showPaymentStatus();
    
    // Simulate UPI app opening
    showNotification(`Opening ${app}...`, 'info');
    
    // Track UPI app selection
    trackEvent('upi_app_selected', { app: app });
    
    // Simulate payment processing
    setTimeout(() => {
        simulatePaymentProcessing();
    }, 3000);
}

function showPaymentStatus() {
    const paymentStatus = document.getElementById('paymentStatus');
    const upiInterface = document.getElementById('upiInterface');
    
    if (paymentStatus && upiInterface) {
        upiInterface.style.display = 'none';
        paymentStatus.style.display = 'block';
        
        // Start loading animation
        startPaymentLoading();
    }
}

function startPaymentLoading() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.style.display = 'block';
    }
}

function simulatePaymentProcessing() {
    // Simulate payment success
    setTimeout(() => {
        showPaymentSuccess();
    }, 5000);
}

function showPaymentSuccess() {
    // Hide payment status
    const paymentStatus = document.getElementById('paymentStatus');
    if (paymentStatus) {
        paymentStatus.style.display = 'none';
    }
    
    // Show success animation
    showSuccessAnimation();
    
    // Move to confirmation step
    setTimeout(() => {
        setActiveStep(3);
        updatePaymentSummary();
    }, 2000);
}

function showSuccessAnimation() {
    const successAnimation = document.getElementById('successAnimation');
    if (successAnimation) {
        successAnimation.classList.add('active');
        
        // Hide after animation
        setTimeout(() => {
            successAnimation.classList.remove('active');
        }, 3000);
    }
}

function updatePaymentSummary() {
    const summaryElement = document.querySelector('.payment-summary');
    if (summaryElement) {
        // Update with actual payment data
        const transactionId = generateTransactionId();
        const paymentTime = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        // Update transaction details
        const detailItems = summaryElement.querySelectorAll('.detail-item');
        if (detailItems.length >= 5) {
            detailItems[0].querySelector('.detail-value').textContent = transactionId;
            detailItems[1].querySelector('.detail-value').textContent = 'UPI - Google Pay';
            detailItems[2].querySelector('.detail-value').textContent = `₹${paymentData.totalAmount.toLocaleString()}`;
            detailItems[3].querySelector('.detail-value').textContent = paymentTime;
            detailItems[4].querySelector('.detail-value').textContent = `${paymentData.studentName} (Grade 10-A)`;
        }
    }
}

function generateTransactionId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `TXN${timestamp}${random}`;
}

// UPI Functions
function showUPIId() {
    const upiIdSection = document.getElementById('upiIdSection');
    if (upiIdSection) {
        upiIdSection.style.display = 'block';
        
        // Analytics tracking
        trackEvent('upi_qr_code_viewed');
    }
}

function copyUPIId() {
    const upiId = 'school@paytm';
    
    // Copy to clipboard
    navigator.clipboard.writeText(upiId).then(() => {
        showNotification('UPI ID copied to clipboard', 'success');
        
        // Analytics tracking
        trackEvent('upi_id_copied');
    }).catch(() => {
        showNotification('Failed to copy UPI ID', 'error');
    });
}

// Modal Functions
function changePaymentMethod() {
    const modal = document.getElementById('paymentMethodModal');
    if (modal) {
        modal.classList.add('active');
        
        // Analytics tracking
        trackEvent('payment_method_change_modal_opened');
    }
}

function closePaymentModal() {
    const modal = document.getElementById('paymentMethodModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function selectMethod(method) {
    selectPaymentMethod(method);
    closePaymentModal();
    
    // Analytics tracking
    trackEvent('payment_method_changed', { method: method });
}

function showHelp() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.classList.add('active');
        
        // Analytics tracking
        trackEvent('help_modal_opened');
    }
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Navigation Functions
function goBack() {
    if (currentStep > 1) {
        goToPreviousStep();
    } else {
        // Go to previous page or home
        showNotification('Navigating back...', 'info');
        
        // Analytics tracking
        trackEvent('back_button_clicked', { step: currentStep });
    }
}

function setActiveNavItem(item) {
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('active');
    });
    item.classList.add('active');
    
    // Analytics tracking
    trackEvent('bottom_nav_clicked', { item: item.textContent.trim() });
}

// Completion Functions
function completePayment() {
    // Show final success message
    showNotification('Payment completed successfully!', 'success');
    
    // Analytics tracking
    trackEvent('payment_completed', {
        amount: paymentData.totalAmount,
        method: selectedPaymentMethod,
        studentId: paymentData.studentId
    });
    
    // Redirect or show completion screen
    setTimeout(() => {
        // This would typically redirect to a success page or dashboard
        console.log('Payment flow completed');
    }, 2000);
}

// Mobile-Specific Functions
function initializeMobileFeatures() {
    // Add touch gestures
    setupTouchGestures();
    
    // Optimize for mobile viewport
    optimizeViewport();
    
    // Setup mobile-specific interactions
    setupMobileInteractions();
}

function setupTouchGestures() {
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const diffY = startY - currentY;
        const diffX = startX - currentX;
        
        // Swipe detection for navigation
        if (Math.abs(diffY) < Math.abs(diffX)) {
            if (diffX > 50 && currentStep > 1) {
                // Swipe left - go to previous step
                goToPreviousStep();
            } else if (diffX < -50 && currentStep < 3) {
                // Swipe right - go to next step
                goToNextStep();
            }
        }
    });
}

function optimizeViewport() {
    // Prevent zoom on input focus
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
}

function preventZoom() {
    // This is handled by the viewport meta tag
}

function setupMobileInteractions() {
    // Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
        document.querySelectorAll('.btn-primary, .payment-option').forEach(button => {
            button.addEventListener('click', function() {
                navigator.vibrate(50); // Short vibration
            });
        });
    }
    
    // Optimize button sizes for touch
    document.querySelectorAll('button').forEach(button => {
        if (button.offsetHeight < 44) {
            button.style.minHeight = '44px';
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="lucide lucide-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('active'), 100);
    
    // Auto-remove
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Analytics tracking
    trackEvent('notification_shown', { type: type, message: message });
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

// Utility Functions
function getInitials(name) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Analytics Functions
function trackStepChange(stepNumber) {
    console.log(`Step changed to: ${stepNumber}`);
    // Implement analytics tracking here
}

function trackEvent(eventName, data = {}) {
    console.log(`Event tracked: ${eventName}`, data);
    // Implement analytics tracking here
}

// Export Functions (for global access)
window.proceedToPayment = proceedToPayment;
window.goToPreviousStep = goToPreviousStep;
window.selectPaymentMethod = selectPaymentMethod;
window.initiateUPI = initiateUPI;
window.showUPIId = showUPIId;
window.copyUPIId = copyUPIId;
window.changePaymentMethod = changePaymentMethod;
window.closePaymentModal = closePaymentModal;
window.selectMethod = selectMethod;
window.showHelp = showHelp;
window.closeHelpModal = closeHelpModal;
window.completePayment = completePayment;
window.goBack = goBack;

// Add CSS for mobile optimizations
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border-radius: var(--radius-md);
        padding: var(--space-md) var(--space-lg);
        box-shadow: var(--shadow-xl);
        border-left: 4px solid var(--primary-100);
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        z-index: 3000;
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
        max-width: 90vw;
        font-size: 14px;
    }
    
    .notification.active {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    
    .notification-success {
        border-left-color: var(--success);
        color: var(--success);
    }
    
    .notification-warning {
        border-left-color: var(--warning);
        color: var(--warning);
    }
    
    .notification-error {
        border-left-color: var(--error);
        color: var(--error);
    }
    
    .notification-info {
        border-left-color: var(--info);
        color: var(--info);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
    }
    
    .notification-content i {
        font-size: 16px;
    }
    
    .notification-content span {
        font-family: var(--font-secondary);
        font-weight: 500;
    }
    
    /* Touch optimizations */
    @media (max-width: 768px) {
        button, .payment-option, .nav-item {
            min-height: 44px;
            min-width: 44px;
        }
        
        .input {
            font-size: 16px; /* Prevents zoom on iOS */
        }
        
        .card {
            margin-bottom: var(--space-md);
        }
    }
    
    /* Loading states */
    .loading {
        opacity: 0.6;
        pointer-events: none;
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
`;

document.head.appendChild(mobileStyle);
