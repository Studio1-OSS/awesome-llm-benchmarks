<div align="center">
  <img src="./site/public/icon.png" alt="LLM Arena Logo" width="120" />
  <h1>Awesome LLM Benchmarks</h1>
  <p><strong>The Definitive Open-Source AI Model Evaluation Platform</strong></p>
</div>

<br />

Welcome to the **Awesome LLM Benchmarks** repository! This project serves as an open-source, interactive leaderboard and testing environment designed to push the world's most capable AI models to their absolute limits.

Rather than relying on static multiple-choice questions, this arena stress-tests models against complex interactive game loops, bespoke UI scenarios, and dynamic coding tasks.

## 🚀 Features

- **Interactive Benchmarks:** Models are evaluated on their ability to generate, debug, and interact with complex game loops (e.g., 3D Snake, Flappy Bird, 2D Breakout) and rich UIs.
- **Dynamic Leaderboard:** A fully responsive, modern web dashboard showcasing the top-performing models and their benchmark results across different capabilities.
- **Provider Aggregation:** Compare frontier models from leading AI labs including OpenAI, Anthropic, Google, Meta, Mistral, xAI, and more.
- **Open-Source Architectures:** Fully transparent evaluation environments that any researcher can run and verify.

## 📂 Repository Structure

This repository is organized as a monorepo to ensure clean separation of concerns and easy extensibility:

- **`/site`**: The React + Vite + Tailwind frontend that powers the beautiful interactive dashboard and landing page.
- **`/examples`**: The evaluation environments, containing interactive games, procedural tests, and bespoke UIs that the models are stress-tested against.
- **`/benchmarks`**: (Coming soon) The core evaluation logic, runners, and data aggregation scripts.

## 🤝 Contributing

We strongly believe that open evaluation is critical for the future of AI. We welcome contributions from the community!

Whether you want to add a new model's benchmark results, create a wildly complex new testing environment in the `/examples` folder, or improve the dashboard UI, please see our [CONTRIBUTING.md](./CONTRIBUTING.md) guide for details on how to submit a Pull Request.

## 📜 License

This project is fully open-source and released under the [MIT License](LICENSE). 
