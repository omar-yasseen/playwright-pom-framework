# Playwright E-Commerce Automation Suite
## Overview
This repository contains a localized, high-speed End-to-End (E2E) automated testing framework built with Playwright. It is designed to verify the integrity of critical e-commerce revenue paths, ensuring that user authentication and checkout flows execute without failure.
The current test suite is configured against the standard Sauce Demo e-commerce architecture.
## Core Flows Automated
• Authentication Pipeline: Verifies successful user login, session state persistence, and error handling for invalid credentials.
• Checkout Pipeline: Automates the complete cart flow (adding items, verifying cart state, filling shipping details, and confirming order completion).
## Tech Stack
• Framework: Playwright
• Language: Typescript
• Assertions: Playwright Test Runner
## How to Run Locally
1. Clone the repository:
git clone https://github.com/omar-yasseen/playwright-pom-framework
2. Install dependencies:
npm install
3. Execute the test suite:
npx playwright test
4. View the UI report (optional):
npx playwright show-report
