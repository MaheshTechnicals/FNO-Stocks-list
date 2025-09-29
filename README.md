# NSE Symbols - Automated Derivatives List

![GitHub release](https://img.shields.io/github/v/release/MaheshTechnicals/F-O-Stocks-list)
![GitHub last commit](https://img.shields.io/github/last-commit/MaheshTechnicals/F-O-Stocks-list)
![GitHub workflow status](https://img.shields.io/github/actions/workflow/status/MaheshTechnicals/F-O-Stocks-list/release.yml?branch=main)

This repository automatically fetches the **latest derivatives symbols from NSE (National Stock Exchange of India)**, generates CSV and TradingView-ready text files, and uploads them to **GitHub Releases**.

The workflow is fully automated and runs monthly, while also supporting manual execution.

---

## 📌 Features

- Fetches **all NSE derivatives symbols** from the official NSE API.
- Generates two output files:
  - `derivatives_symbols({count}).csv` → CSV with `Sr. No.` and `Symbol`
  - `tradingview_symbols({count}).txt` → Text file for TradingView import with `NSE:SYMBOL` format
- Automatically sorts symbols alphabetically.
- Automatically deletes previous GitHub release before creating a new one.
- Fully automated via **GitHub Actions**:
  - Runs manually via workflow_dispatch
  - Runs on the **1st day of every month**
- Ready for **TradingView import** to watchlists.

---

## 🗂 Repository Structure

```
F-O-Stocks-list/
├─ index.js                  # Main script to fetch symbols and generate files
├─ package.json              # Node.js dependencies
├─ package-lock.json
├─ .github/
│  └─ workflows/
│      └─ release.yml        # GitHub Actions workflow
└─ README.md
```

---

## ⚡ Prerequisites

- Node.js v20+
- NPM
- GitHub repository with **GH_PAT** (Personal Access Token) stored in Secrets

---

## 🚀 Usage

### Manual Execution

1. Clone the repository:

```bash
git clone https://github.com/MaheshTechnicals/F-O-Stocks-list.git
cd F-O-Stocks-list
```

2. Install dependencies:

```bash
npm install
```

3. Run the script:

```bash
node index.js
```

4. The script will generate:

- `derivatives_symbols({count}).csv`  
- `tradingview_symbols({count}).txt`

---

### GitHub Actions Automation

The workflow runs **automatically on the 1st of every month** and can also be triggered manually:

```yaml
on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 1 * *'  # 1st day of every month at 00:00 UTC
```

- Deletes the previous release and tag named `latest`.
- Generates updated files.
- Uploads files as **assets** to a new release tagged `latest`.

---

## 📝 Output Files

### CSV Example (`derivatives_symbols(209).csv`)

| Sr. No. | Symbol  |
|---------|---------|
| 1       | 360ONE  |
| 2       | ABB     |
| 3       | APLAPOLLO |
| ...     | ...     |

### TradingView TXT Example (`tradingview_symbols(209).txt`)

```
1. NSE:360ONE
2. NSE:ABB
3. NSE:APLAPOLLO
...
```

> This file can be imported directly into TradingView watchlists.

---

## 🔧 Customization

- To change the schedule, edit `.github/workflows/release.yml` `cron` expression.
- To change Node.js version, edit `setup-node@v3` step in the workflow.
- Filenames automatically include the **symbol count**.

---

## ⚙️ License

This project is licensed under the **MIT License**.  
See [LICENSE](LICENSE) for details.

---

## 🙌 Contributions

Contributions, bug reports, and suggestions are welcome!  
Please open an issue or submit a pull request.

---

## 📫 Contact

**Mahesh Technicals**  
- GitHub: [@MaheshTechnicals](https://github.com/MaheshTechnicals)  
- Email: help@maheshtechnicals.com
