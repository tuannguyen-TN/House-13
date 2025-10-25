I'm in a 24-hour hackathon and need to build an MVP mobile application using Expo. Create a streamlined requirements document focused on rapid development that includes:

1. **Project Overview** (Keep it brief)

   - App name and one-sentence description
   - The ONE core problem this solves
   - Target demo audience
   - Single success metric for the hackathon demo

2. **MVP Scope** (Absolute essentials only)

   - Top 3-5 must-have features for the demo
   - ONE primary user flow (the happy path)
   - What we're explicitly NOT building (out of scope)

3. **User Flow & Screens** (Minimal viable journey)

   - List of screens (aim for 3-7 max)
   - Simple workflow diagram description
   - Key interactions per screen
   - No complex user journeys - just the core path

4. **Frontend Requirements**

   - Platform: Expo (latest stable)
   - UI approach: Use Expo's built-in components + minimal custom styling
   - Navigation: Simple stack/tab navigator
   - State management: React useState/useContext (no Redux)
   - Form handling: Basic controlled components
   - No complex animations or transitions

5. **API Requirements** (Fast implementation)

   - List of API endpoints needed (3-10 max)
   - Request/response format (JSON)
   - Authentication: Simple approach (basic auth or skip for demo)
   - Recommended quick backend: Supabase/Firebase/Vercel Postgres
   - Mock data strategy if backend isn't ready

6. **Data Models** (Keep it simple)

   - 2-4 core entities maximum
   - Essential fields only
   - Relationships (if absolutely necessary)
   - Sample data structure in JSON

7. **Quick Deploy Strategy**

   - Frontend: Expo Go for demo (no builds needed)
   - Backend: Vercel/Railway/Render for instant deploy
   - Database: Supabase free tier
   - No CI/CD setup - just manual deployment

8. **24-Hour Development Timeline**
   - Hour 0-2: Setup & architecture
   - Hour 2-8: Core feature implementation
   - Hour 8-16: API integration & data flow
   - Hour 16-20: Polish & bug fixes
   - Hour 20-22: Testing & edge cases
   - Hour 22-24: Demo preparation & slides

For context, my hackathon app idea is: this first screen when users first access is pictures of 4 seasons, and recommendations of foods for each season that can benefit your health. Upper left corner is a hamburger menu with access to the other two features. The first one serves like an assistant for users to recognize if a fruit/vegetable/type of food is cold, warm, or neutral by its energetic property. Users are going to scan an ingredient, and the app is going to detect what food that is, then figure out its energetic characteristic. Another feature is that users can take a picture of all the ingredients they are going to cook, and the app is going to detect which combinations are great, which are not, and which will harm their health based on the notes taken along with the pictures.

Workflow: for the seasonal food recommendation feature, it is straightforward that whenever a users clicks on a season, the app gives a list of its recommended foods for that specific season that will generally benefit their health. For the energetic property detection, users will have two choices: uploading an image or taking an image. After an image is retrieved either from the library or camera, the app will detect if the considered food is cold, warm, or neutral, and spits out some general information about the food along with recipes. The other feature is the food combinations one. Like the previous feature, users can either upload an image or take a picture, but this time, of all the ingredients they want to consider. After that, a "notes" prompt is shown for the users to detail any specifics on their current condition. The app goes on to check if there are any combinations that go well with each other, and any combinations that cannot be mixed. The app then suggests replacements or recommendations based on the users' specifics on their current health condition.

Please prioritize speed and simplicity. Suggest the fastest tech choices that still look professional for the demo.
