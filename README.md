# Weather App

This is a weather forecast application built as a technical test. It allows users to search for cities, view current weather data, and a 3-day forecast. Users can also save favorite cities for quick access.

## 🌟 Features

- **Search Weather by City**: Get the current weather and a 3-day forecast for any city.
- **Favorites**: Save cities to a favorites list for easy access.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dark Mode Ready**: Future-ready for implementing dark mode.
- **Deployed on Vercel**: View the live app at [Deployed Weather App](#).

## 🛠️ Technologies Used

- **Next.js 15.1.5**: Framework for React with Server-Side Rendering (SSR) and Static Site Generation (SSG).
- **React 19.0.0**: JavaScript library for building user interfaces.
- **Styled Components 6.1.14**: For styling components with CSS-in-JS.
- **TypeScript 5**: Static typing for better development experience.
- **React Icons 5.4.0**: For scalable vector icons.
- **Jest & Testing Library**: For unit and integration testing.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GemaBarrera/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Add your OpenWeather API key:
   Create a `.env.local` file in the root directory and add the following line:

   ```env
   NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser at `http://localhost:3000`.

## 🧪 Tests

This app uses Jest and React Testing Library for testing.

### Running Tests

Run all tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 🛠️ Points of Improvement

1. **Performance**:
   - Optimize the Largest Contentful Paint (LCP).
   - Cache API responses to reduce redundant calls.
2. **Dark Mode**:
   - Styles for dark mode.
   - Implement a toggle for dark mode using `ThemeProvider` and `styled-components`.
3. **Error Handling**:
   - Error styles.
   - Improve user feedback for API errors and loading states.
4. **Accessibility**:
   - Enhance accessibility with proper ARIA attributes and keyboard navigation.
5. **Testing Coverage**:
   - As I ran out of time, I implemented just a few tests, but every component should be tested, covering all the functionality and user interactions.
   - Add end-to-end tests with tools like Playwright or Cypress.

## 🌐 Deployment

The app is deployed on [Vercel](https://vercel.com/), offering serverless SSR and SSG out of the box.

Visit the live app: [Weather App on Vercel](#)

## 📂 Project Structure

This project is built using the **Next.js App Router** structure, which organizes routes and layouts under the `app/` directory. The `favorites` page is located in its own folder under `app/favorites/`, while the `home` page is defined directly in the root of the `app/` directory. Reusable components, hooks, and contexts are organized outside the `app/` directory for better modularity.

### 🙏 Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons/) for the favorite card icon.
- [OpenWeatherMap API](https://openweathermap.org/api) for providing the weather data.
