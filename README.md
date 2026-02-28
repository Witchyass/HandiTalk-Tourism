<div align="center">

# 🤟 HandiTalk

### *Travel is a human right. Communication is the key.*

**HandiTalk** is an AI-powered travel companion for deaf and hard-of-hearing tourists — turning any cultural destination into a fully accessible, deeply human experience.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20HandiTalk-E8185A?style=for-the-badge)](https://handitalk.vercel.app)
[![Built With React](https://img.shields.io/badge/Built%20With-React%20%2B%20Vite-61DAFB?style=for-the-badge)](https://react.dev)

</div>

---

## 🌍 The Problem We're Solving

466 million people worldwide are deaf or hard of hearing. When they travel, they face a tripled barrier:

- 🔇 **The Silence Barrier** — No way to communicate with local vendors and artisans.
- 🆘 **The Safety Gap** — Emergency alerts and safety info are delivered by audio, leaving them the most vulnerable.
- 🕌 **The Cultural Wall** — Museums, landmarks, and dining experiences remain inaccessible at their core.

> *Existing solutions offer ramps and subtitles. We offer connection.*

---

## 💡 Our Solution

HandiTalk is a **tourism suite** of three interconnected AI-powered tools:

| Product | Description |
|---|---|
| 🤟 **Sign Translate** | Real-time AI sign language recognition via webcam — translate signs instantly. |
| 📱 **HandiTablet** | A hotel/kiosk tablet interface for seamless vendor communication. |
| 🗺️ **HandiMaps** | Signed landmark guides replacing audio announcements. |
| ☕ **HandiMenu** | Signed dish explainers for an immersive dining experience. |
| 🚨 **Emergency SOS** | Instant signed life-saving protocols and bystander cards. |

---

## 🎨 Design Philosophy — "Warm Human Tech"

We reject the cold, clinical aesthetic of traditional accessibility tools.

HandiTalk is built on three design pillars:

1. **Emotional Storytelling** — The landing page takes users on a cinematic 5-act journey, from empathy to empowerment.
2. **Premium Aesthetics** — Blush, Rose, and Gold palette with silky micro-animations. Accessibility should be beautiful.
3. **Independence-First UX** — Every feature is designed so a deaf traveler can act entirely on their own terms.

---

## 🛠️ Technology Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React + Vite | Fast, modular, production-ready |
| AI Engine | MediaPipe Hands (Lite Model) | Lightning-fast skeleton tracking |
| Inference | Python + TensorFlow (FastAPI) | Sequence-based gesture classification |
| Deployment | Vercel (Frontend) | Zero-config, global CDN |

---

## 🤖 AI Feature: Real-Time Sign Translation

The Sign Translate engine processes a **rolling 16-frame buffer** of hand landmark coordinates (21 points × 3 axes per hand) at 300ms intervals. Only predictions with **>65% confidence** are surfaced to the user, eliminating noise.

- **Model**: TensorFlow sequence classifier trained on ISL/ASL gesture sequences.
- **Pipeline**: `Camera → MediaPipe Hands → Landmark Sequence → FastAPI → Prediction → UI`
- **Stability**: MediaPipe is loaded via Global Script Tags to bypass Vite bundler conflicts and ensure WASM runtime stability.

---

## 🌱 Our Values

- **Empathy First** — We start with the human story, not the technical spec.
- **Dignity in Design** — Every interaction should feel premium, not "special needs."
- **No One Left Behind** — Safety information is a human right, not a feature.

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Witchyass/HandiTalk-Tourism.git

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

> The Sign Translate feature also requires the Python Inference API to be running locally on port 8000. Contact the team for the inference package.

---

## 🎯 Vision

To transform Tunisia — and ultimately the world — into the most inclusive tourist destination on the planet, one sign at a time.

---

<div align="center">
  <i>Built with ❤️ and 🤟 for the 466 million people the tourism industry forgot.</i>
</div>
