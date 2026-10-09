<div align="center">
  <img src="./site/public/llm-benchmark.svg" alt="LLM Benchmark Logo" width="240" />
  <h1>Awesome LLM Benchmarks</h1>
  <p>
    <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks/actions"><img src="https://img.shields.io/github/actions/workflow/status/Studio1-OSS/awesome-llm-benchmarks/ci.yml?style=flat-square" alt="Build Status"></a>
    <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Studio1-OSS/awesome-llm-benchmarks?style=flat-square" alt="License"></a>
    <a href="https://github.com/Studio1-OSS/awesome-llm-benchmarks/stargazers"><img src="https://img.shields.io/github/stars/Studio1-OSS/awesome-llm-benchmarks?style=flat-square" alt="Stars"></a>
  </p>
</div>

---

Welcome to the **Awesome LLM Benchmarks** repository—a rigorous, open-source leaderboard and interactive evaluation environment engineered to push frontier AI models to their absolute limits.

As Large Language Models rapidly achieve super-human performance on traditional static exams (like MMLU and HumanEval), the AI industry requires a new standard of measurement. We are moving beyond static multiple-choice questions. This arena evaluates true model agency, stress-testing capabilities against complex, procedurally generated game loops, multi-step bespoke UI workflows, and dynamic coding challenges.

## ✨ Core Features

*   **Interactive Agentic Benchmarks:** Models are subjected to deterministic, real-time evaluation environments. From rendering 3D graphics in HTML5 Canvas to executing logic in Flappy Bird and 2D Breakout, models are forced to demonstrate true generalized reasoning.
*   **Dynamic Leaderboard Dashboard:** A meticulously designed, fully responsive React/Vite web application that visualizes performance metrics, Elo rankings, and cost-to-latency ratios across all tested models.
*   **Comprehensive Model Aggregation:** Unbiased side-by-side comparisons of the industry's most advanced frontier models from OpenAI, Anthropic, Google, Meta, Mistral, xAI, and open-weight community submissions.
*   **Transparent & Open Architecture:** 100% open-source evaluation logic. No hidden test sets. Every environment is completely transparent, allowing researchers to run, verify, and reproduce the results locally.

## 🏗️ Repository Architecture

This repository is structured as a modern monorepo, prioritizing clean separation of concerns:

*   **`/site`**: The frontend web application built with React, Vite, and Tailwind CSS. It powers our modern interactive dashboard, comprehensive data visualizers, and the landing page.
*   **`/site/public/awesome-llm-benchmarks`**: The source of truth for our evaluation results. Contains detailed markdown reports and raw JSON data from individual game loops and simulated evaluations.
*   **`/benchmarks`** *(Coming soon)*: The core automated runner infrastructure, evaluation scripts, and Elo aggregation math models.

## 🤝 Community & Contributing

We believe that the future of artificial intelligence requires an open, community-driven evaluation standard. We welcome contributions from researchers, engineers, and hobbyists alike!

Whether you are submitting performance results for a newly released model, engineering a wildly complex interactive test environment, or contributing UX refinements to our leaderboard dashboard, your work is valued here. 

Please review our [Contribution Guidelines](./CONTRIBUTING.md) to understand our pull request workflow and schema requirements.

## 📜 License

This project is open-source software licensed under the [MIT License](LICENSE).
