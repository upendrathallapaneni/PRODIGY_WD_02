# PRODIGY_WD_02: Interactive Stopwatch Web Application

A clean, interactive stopwatch application built with precise frontend timekeeping logic. Users can accurately track elapsed time, record intermediate split laps, and monitor intervals through a smooth user interface. Developed as part of my Web Development Internship at Prodigy InfoTech.

## 🚀 Features
- **High Accuracy Engine:** Uses delta-time calculation (`Date.now()`) to completely prevent interval lag or drifting over time.
- **Lap Tracking System:** Captures split records dynamically and displays them in a clean, scrollable history feed.
- **Visual Grid Stability:** Employs CSS `tabular-nums` formatting to completely prevent text trembling or jumping while numbers rapidly tick.
- **State Protection:** Dynamically toggles button active states to prevent invalid workflows (e.g., stopping an already paused timer).

## 🛠️ Technologies Used
- **HTML5:** Core application canvas layout.
- **CSS3:** Modern dark mode styling framework and button pseudo-classes.
- **JavaScript (ES6+):** Comprehensive state tracking, event handling, and interval math.

## 📦 How to Run the Project
1. Clone this repository to your machine.
2. Open the `index.html` file in your preferred web browser.
