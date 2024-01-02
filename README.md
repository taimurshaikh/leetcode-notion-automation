# leetcode-notion-automation

# Leetcode Notion Automation

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/taimurshaikh/leetcode-notion-automation/blob/main/LICENSE)

> Work in Progress

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project aims to automate the process of tracking your Leetcode problem completion using Notion. It uses JacobLinCool's [leetcode-query API](https://github.com/JacobLinCool/LeetCode-Query) to periodically fetch recent problem submissions and the [Notion API](https://developers.notion.com/) to update the database with completionss.

## Features

- [ x ] Leetcode problem completion tracking
- [ x ] Notion database integration
- [ ] Periodic updates
- [ ] Automatically update problem status
- [ ] Track your progress and statistics
- [ ] Customizable settings and configurations
- [ ] Frontend UI

## Installation

To use this automation tool, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/taimurshaikh/leetcode-notion-automation.git
   ```

2. Install the required dependencies:

   ```shell
   npm install
   ```

3. Enter your `NOTION_TOKEN` in a newly created `.env` file in the root directory. See https://developers.notion.com/docs/authorization for how to generate a token.

4. Enter your `NOTION_DATBASE_ID`

5. Run the automation script:

   ```shell
   npm start
   ```

## Usage

To use this tool, follow the instructions above to start the server and it will update your selected Notion database with Leetcode problems.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/taimurshaikh/leetcode-notion-automation/blob/main/LICENSE).
