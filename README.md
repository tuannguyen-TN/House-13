## Inspiration

In traditional Eastern medicine, every ingredient carries an energetic property **hot, cold, or neutral**, and every season affects the human body differently.
Modern people, however, have lost touch with this natural rhythm. We eat whatever is convenient, regardless of season or balance.

Our team wanted to bring this ancient wisdom into a modern mobile experience. **House 13** helps users choose foods that harmonize with their bodies and the season instantly and intuitively.

## What it does

**House 13** is a mobile app built with **Expo** that guides users toward healthier eating through **seasonal recommendations**, **food energy recognition**, **food combo analysis**, and where to find the recommended ingredients in their local areas.

- 🏞️ **Seasonal Food Recommender** – Tap any season to discover foods that balance your body’s energy during that time of year.
- 🍉 **Energetic Property Detector** – Take or upload a photo of a fruit or vegetable, and the app classifies it as _hot, cold, or neutral_, explaining its effects.
- 🥗 **Food Combination Analyzer** – Upload a photo of multiple ingredients, add a short note about your condition, and receive insights on which combinations are beneficial or harmful.
- 🍽️ **Local Market** – Find local markets that have the ingredient you need in stock.

All in one clean, intuitive mobile interface optimized for hackathon speed and clarity.

## How we built it

- **Frontend:** [Expo](https://expo.dev) + React Native Paper + React Navigation (Stack + Drawer)
- **State Management:** React hooks (`useState`, `useContext`)
- **Image Handling:** Expo ImagePicker for upload/camera input
- **Deployment:**
  - Expo Go (QR demo)

## Challenges we ran into

- **Time pressure:** Balancing AI image recognition setup with building three major features in under 24 hours.
- **Dataset inconsistency:** Many public datasets label foods visually but not by energetic property, so we had to manually curate mock results.
- **UI constraints:** Designing a minimal yet polished interface that feels natural on mobile while skipping all complex animations.
- **API integration:** Getting Supabase functions, AI API integrations, and Expo network calls to sync reliably during local testing.

## Accomplishments that we're proud of

- Built and demoed a **fully working Expo app** within 24 hours.
- Delivered **four distinct features** (seasonal foods, food energy detection, combination analysis, and local market ingredient finder) on one consistent UI.
- Integrated **AI image recognition + traditional health wisdom** into one smooth, intuitive experience.
- Achieved a **polished, production-like demo** deployable via a single Expo QR code.

## What we learned

- **Expo’s ecosystem** allows surprisingly fast mobile prototyping without sacrificing design quality.
- **Supabase** is perfect for rapid API and database setup — no backend stress.
- Combining **AI-based food recognition** with **cultural health knowledge** opens new directions for preventative wellness apps.
- Simplicity wins in hackathons — focusing on the _happy path_ delivered a more impressive, reliable demo than chasing every extra feature.

## What's next for House 13

We’re excited to continue developing **House 13** beyond the hackathon by:

- Integrating a **real image recognition API** fine-tuned on food datasets.
- Building **personalized seasonal diet recommendations** using user health inputs.
- Adding a **wellness dashboard** with daily balance tracking.
- Partnering with nutritionists and traditional medicine experts to refine data accuracy.

## How to run the project

1. Clone to the project to your local machine.
2. Install the necessary `node-modules`.
3. Run `npx expo start` to start the application.
4. Install `Expo Go` on your phone and scan the QR code prompted in the command line.
