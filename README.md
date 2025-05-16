# 2048-Game-Test-Automation-with-Playwright

# 2048 Game - Test Automation with Playwright

This project uses [Playwright](https://playwright.dev/) to automate end-to-end tests for the popular [2048 game](https://play2048.co/).

## 🧪 Technologies

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/talitamarin/2048-Game-Test-Automation-with-Playwright.git
cd 2048-Game-Test-Automation-with-Playwright

```bash
npm install

```bash

npx playwright test

```bash

npx playwright show-report

✅ What is tested?
Navigation to the 2048 game

Menu options and text validation

Dialog box behavior when starting a new game

Game movement using arrow keys

Game grid and tile checks (in progress)

📁 Project Structure

bash
Copiar
Editar
tests/
  └── menuTest.spec.ts        # UI/menu tests
  └── gamePlay.spec.ts        # Arrow key gameplay tests
playwright.config.ts          # Playwright configuration

🤝 Contributions
Contributions and suggestions are welcome!

📜 License
This project is open source and available under the MIT License.