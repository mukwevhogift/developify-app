# Developify Application Features

This document outlines the key features implemented in the Developify application, a platform for fractional property investment.

## 1. Authentication

- **Login Page (`/login`):** Allows existing users to sign in to their accounts.
- **Registration Page (`/register`):** Enables new users to create an account.
- **Auth Layout:** A dedicated layout for authentication pages, providing a clean and focused user experience.

## 2. Main Dashboard (`/dashboard`)

The dashboard serves as the central hub for users, providing a comprehensive overview of their investment activities.

- **Key Metrics:** Displays crucial financial information at a glance:
  - **Wallet Balance:** Shows the current funds available for investment.
  - **Portfolio Value:** The total current value of all investments.
  - **Portfolio Growth:** The percentage change in portfolio value over the last month.
- **Portfolio Performance Chart:** A visual representation of the portfolio's value over time.
- **Featured Properties:** A curated list of investment opportunities, showing key details and funding progress.

## 3. Property Exploration

- **Explore Properties Page (`/properties`):** A grid view of all available properties, allowing users to browse and discover investment opportunities. Each property is shown on a `PropertyCard`.
- **Property Details Page (`/properties/[id]`):** A dedicated page for each property, offering in-depth information:
  - **Image Gallery:** Displays multiple images of the property.
  - **Investment Overview:** Key stats like Estimated ROI, Target Funding Amount, and Developer.
  - **Funding Progress:** A visual progress bar showing how close the property is to being fully funded.
  - **Invest Now:** A call-to-action section for users to make an investment.

## 4. Portfolio Management (`/portfolio`)

This section allows users to track and manage their investments.

- **Tabbed View:** Investments can be filtered by their status:
  - **Active:** Ongoing investments in properties that are still funding or under construction.
  - **Completed:** Investments in properties that are fully funded and operational.
  - **Underfunded:** Investments that have not yet met their funding goals.
- **Investment Table:** A detailed list of all investments, showing the property, invested amount, date, and status.

## 5. Wallet Management (`/wallet`)

Users can manage their funds directly within the application.

- **Current Balance:** A prominent display of the user's wallet balance.
- **Fund Management:**
  - **Add Funds:** A form to deposit money into the wallet.
  - **Withdraw Funds:** A form to transfer money from the wallet to a linked bank account.
- **Transaction History:** A detailed table of all transactions, including type (Deposit, Withdrawal, Investment, Dividend), amount, date, and status.

## 6. AI Investment Advisor (`/advisor`)

Leverages Generative AI to provide personalized guidance.

- **User Input Form:** Collects information about the user's:
  - Financial Goals
  - Risk Tolerance
  - Investment History
- **AI-Powered Suggestions:** After submitting the form, the AI analyzes the user's profile and provides:
  - A list of personalized property investment suggestions.
  - A detailed reasoning behind the recommendations.

## 7. User Account & Settings (`/settings`)

- **Profile Management:** Allows users to update their personal information (name, email).
- **Bank Details:** A section to manage linked bank accounts for withdrawals.
- **Notification Preferences:** Users can toggle different types of notifications (Email, Push Notifications).

## 8. General UI/UX

- **Responsive Layout:** The application is designed with a responsive sidebar and layout that adapts to both desktop and mobile devices.
- **Dark Theme:** The entire application uses a modern, dark-themed UI.
- **Notifications Page (`/notifications`):** A centralized place to view all account and investment-related notifications.
- **Toaster Notifications:** Provides real-time feedback for actions, using a toast component for alerts.
