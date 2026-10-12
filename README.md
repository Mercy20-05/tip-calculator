# Tip Calculator

An interactive, responsive Tip Calculator web application built with semantic HTML5, modern CSS3, and vanilla JavaScript.

---

## 🎯 Objective & Deliverables

- **Bill input**: Allows entering decimal amounts.
- **Tip percentages**: Predefined percentage buttons (5%, 10%, 15%, 25%, 50%) plus a custom input field.
- **Split bill / Number of people input**: Divides total and tip across multiple payers.
- **Real-time calculation**: Displays "Tip Amount per Person" and "Total per Person" dynamically.
- **Validation**: Guards against division by zero and invalid negative inputs.
- **Reset functionality**: Clears inputs and resets state back to default.

---

## 💡 Technical Approach

### 1. Semantic Markup (`index.html`)
- Structured with clean semantics using `<main>`, `<section>`, and `<label>` elements linked to inputs via matching `id`s for accessibility.
- Input fields enforce appropriate attributes (`min="0"`, `step="0.01"`).

### 2. Layout & Styling (`style.css`)
- **CSS Grid & Flexbox**: Used for layout management, including a split two-column design that wraps into a single column on mobile screens.
- **CSS Variables**: Centralized color palette and typography tokens for consistent styling and quick theme tweaks.
- **States & Micro-interactions**: Visual focus borders, hover highlights, active tip toggle states, and error borders.

### 3. Logic & State Management (`script.js`)
- **State Store**: Centralized state variables (`billAmount`, `tipPercent`, `peopleCount`) track input changes.
- **Live Event Listeners**: Inputs listen to the `'input'` event for real-time reactivity without needing a manual submit button.
- **Zero-Division Guard**:
  ```javascript
  if (value === '0' || parsedValue === 0) {
    errorMessage.classList.remove('hidden');
    peopleWrapper.classList.add('error-state');
    peopleCount = 0;
  }