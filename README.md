# XP & Streak Card System

An advanced, highly interactive full-stack gamification prototype showing custom Web Audio synthesis, cursor velocity physics particles, glassmorphism visuals, and a responsive co-op tether.

## 🛠️ Tech Stack
* **Frontend:** HTML5, Vanilla CSS3, Vanilla ES6 JavaScript
* **Backend:** Node.js, Express
* **Database:** MongoDB / Mongoose (with automatic in-memory fallback if MongoDB is not running)

---

## 🚀 How to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Server:**
   ```bash
   npm start
   ```
   *The server runs by default on port `5000`.*

3. **Open the Interface:**
   Navigate to [http://localhost:5000](http://localhost:5000) in your browser.

---

## 🧠 Architectural Insights

### 1. 3D Tilt & Specular Web Audio Modulation
When the user hovers over the streak card, a mousemove listener calculates relative offsets $(dx, dy)$ centered on the card center:
$$\text{dx} = \frac{x_{\text{cursor}} - \frac{\text{width}}{2}}{\frac{\text{width}}{2}}, \quad \text{dy} = \frac{y_{\text{cursor}} - \frac{\text{height}}{2}}{\frac{\text{height}}{2}}$$
This yields a bounded domain of $[-1.0, 1.0]$. The total tilt magnitude is computed as:
$$\text{magnitude} = \sqrt{dx^2 + dy^2}$$

This magnitude directly modulates the sound pitch:
1. **Space Hum frequency:** Sweeps from $55\text{ Hz}$ (A1 note) up to $75\text{ Hz}$.
2. **Space Resonance frequency:** Sweeps from $110\text{ Hz}$ (A2 note) up to $150\text{ Hz}$.
3. **Lowpass Filter Cutoff:** Sweeps from $180\text{ Hz}$ to $550\text{ Hz}$, "opening" the filter and allowing brighter frequencies to pass through as the card tilts further.

### 2. Smooth CSS Theme Transitions
We implement the theme toggle by swapping classes on the `<body>` tag (`theme-deep-space`, `theme-cyberpunk`, `theme-solar-flare`). 

Each theme class overrides a common set of semantic variables defined under the body class (e.g. `--bg-color`, `--accent-primary`, `--card-bg`). By using standard CSS layout elements styled with `transition: background 0.8s ease, color 0.5s ease, border-color 0.5s ease;`, all components adjust their glow styles, colors, and shadows in a unified, hardware-accelerated transition.
