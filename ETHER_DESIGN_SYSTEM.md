# ETHER UI DESIGN SYSTEM v1.0
## Fee Management Application Design System

### 🎨 COLOR PALETTE

#### Primary Colors
```css
/* Brand Purple */
--primary-100: #6C63FF;
--primary-200: #5A52E8;
--primary-300: #4A42D1;
--primary-gradient: linear-gradient(135deg, #6C63FF 0%, #A57BFF 100%);

/* Secondary Colors */
--secondary-100: #EDEBFF;
--secondary-200: #E0DDFF;
--secondary-300: #D1CCFF;
```

#### Neutral Colors
```css
/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F8F8FB;
--bg-tertiary: #F3F2FF;

/* Text Colors */
--text-primary: #2D2A32;
--text-secondary: #676879;
--text-tertiary: #A1A1B1;
--text-disabled: #C4C4D4;

/* Borders */
--border-primary: #E2E2EA;
--border-secondary: #F0F0F5;
--border-focus: #6C63FF;
```

#### Status Colors
```css
--success: #4CAF50;
--success-light: #E8F5E8;
--warning: #FFB300;
--warning-light: #FFF8E1;
--error: #E53935;
--error-light: #FFEBEE;
--info: #03A9F4;
--info-light: #E3F2FD;
```

### 🔤 TYPOGRAPHY SYSTEM

#### Font Families
```css
/* Primary Font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* Secondary Font - Inter */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

--font-primary: 'Poppins', sans-serif;
--font-secondary: 'Inter', sans-serif;
```

#### Text Styles
```css
/* Headings */
.h1 {
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  color: var(--text-primary);
}

.h2 {
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 24px;
  line-height: 140%;
  color: var(--text-primary);
}

.h3 {
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  color: var(--text-primary);
}

/* Body Text */
.body-1 {
  font-family: var(--font-secondary);
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--text-secondary);
}

.body-2 {
  font-family: var(--font-secondary);
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: var(--text-secondary);
}

/* Labels & Buttons */
.label {
  font-family: var(--font-secondary);
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: var(--text-primary);
}

.caption {
  font-family: var(--font-secondary);
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: var(--text-tertiary);
}
```

### 🧩 COMPONENT LIBRARY

#### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-family: var(--font-secondary);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(108, 99, 255, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(108, 99, 255, 0.2);
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: var(--primary-100);
  border: 2px solid var(--primary-100);
  border-radius: 12px;
  padding: 10px 20px;
  font-family: var(--font-secondary);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--secondary-100);
  transform: translateY(-1px);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-family: var(--font-secondary);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-ghost:hover {
  background: var(--bg-secondary);
  color: var(--primary-100);
}
```

#### Cards
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.08);
  border: 1px solid var(--border-secondary);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(108, 99, 255, 0.12);
  transform: translateY(-2px);
}

.card-analytics {
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.05) 0%, rgba(165, 123, 255, 0.05) 100%);
  border: 1px solid var(--border-focus);
}
```

#### Inputs
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-primary);
  border-radius: 12px;
  font-family: var(--font-secondary);
  font-size: 14px;
  color: var(--text-primary);
  background: white;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}
```

#### Tables
```css
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.08);
}

.table th {
  background: var(--bg-secondary);
  padding: 16px;
  text-align: left;
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-primary);
}

.table td {
  padding: 16px;
  border-bottom: 1px solid var(--border-secondary);
  font-family: var(--font-secondary);
  font-size: 14px;
  color: var(--text-secondary);
}

.table tbody tr:hover {
  background: var(--bg-tertiary);
}
```

#### Status Badges
```css
.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-family: var(--font-secondary);
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-paid {
  background: var(--success-light);
  color: var(--success);
}

.badge-due {
  background: var(--warning-light);
  color: var(--warning);
}

.badge-overdue {
  background: var(--error-light);
  color: var(--error);
}
```

### 📏 SPACING SYSTEM

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 40px;
  --space-3xl: 64px;
}
```

### 🎭 ANIMATIONS

```css
/* Smooth transitions */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover animations */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(108, 99, 255, 0.15);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading {
  animation: spin 1s linear infinite;
}

/* Success animation */
@keyframes checkmark {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.success-animation {
  animation: checkmark 0.6s ease-out;
}
```

### 🎨 DESIGN PRINCIPLES

1. **80/20 Rule**: 80% white space with 20% purple accents
2. **Accessibility**: WCAG 2.1 AA compliant contrast ratios
3. **Consistency**: Unified spacing, typography, and color usage
4. **Clarity**: Clear visual hierarchy and information architecture
5. **Empathy**: User-friendly interactions for both admins and parents

### 🔧 IMPLEMENTATION NOTES

- Use CSS custom properties for easy theming
- Implement responsive design with mobile-first approach
- Include hover states and micro-interactions for better UX
- Ensure all interactive elements have proper focus states
- Use semantic HTML for accessibility
