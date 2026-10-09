# Contributing to LLM Arena

Welcome! We are thrilled that you are interested in contributing to LLM Arena. This project is community-driven, and your contributions—whether they be new benchmark environments, UI improvements, or adding new model results—help make this the definitive open-source AI leaderboard.

## Project Structure

This repository is organized as a monorepo to keep everything clean and modular:

*   **`/site`**: Contains the source code for the landing page and dashboard UI. This is built with React, Vite, and Tailwind CSS.
*   **`/examples`**: Contains all of our procedurally generated environments, games, and UI scenarios used to evaluate the models (e.g., 3d-snake, 2d-breakout, etc.).
*   **`/benchmarks`**: Contains the core logic, datasets, and execution scripts for running evaluations and aggregating results.

## How to Contribute

### 1. Adding a New Model or Benchmark Results
If you have run evaluations for a new model, you can submit a Pull Request to update the `AI_RELEASES` and `TOP_MODELS` data in the `/site` code, along with adding their logo to `/site/public/logos`. 

### 2. Adding a New Evaluation Environment
If you have created a new interactive game loop or UI scenario for testing models, please add it as a new folder inside the `/examples` directory. Ensure your folder includes its own README explaining the environment rules and the expected model behaviors.

### 3. Improving the Site
Navigate to the `/site` directory, run `npm install`, and then `npm run dev` to start the local development server. Once you've made your UI improvements, submit a Pull Request.

## Pull Request Process
1. Fork the repo and create your branch from `main`.
2. Make sure your code follows the existing style conventions.
3. Test your changes thoroughly.
4. Open a Pull Request with a clear title and description of your changes.

Thank you for helping us build the best open-source AI evaluation platform!
