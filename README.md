# Backpack Clone

Backpack Clone is a web-based wallet application that allows you to manage multiple HD wallets for Solana. You can create new wallets, import existing ones, and view your wallet balances. Additionally, it integrates with the Kraken API to fetch real-time SOL/USD exchange rates.

## Features

1. **Create Multiple HD Wallets:** Generate and manage multiple wallets using Hierarchical Deterministic (HD) keys for Solana.
2. **Import Wallet:** Import existing Solana wallets using a mnemonic seed phrase.
3. **View Wallet Balance:** Check the balance of your Solana wallets.
4. **Fetch Exchange Rate:** Get real-time SOL/USD exchange rates from Kraken.

## Libraries Used

- **Vite**: For fast development and building.
- **React Router**: For routing and navigation.
- **Redux Toolkit**: For state management.
- **BIP-39**: For generating and validating mnemonic seed phrases.
- **Tailwind CSS**: For styling the user interface.
- **Solana/Web3.js**: For interacting with the Solana blockchain.
- **React Icons**: For incorporating various icons.
- **ed25519-hd-key**: For generating HD keys.
- **Kraken API**: For fetching exchange rates.

## Prerequisites

Before running this project, ensure you have the following installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **Text Editor/IDE**: Use a text editor like Visual Studio Code.

## Steps to Run the Project Locally

### 1. Clone the Repository

Open your terminal or command prompt.

Navigate to the directory where you want to clone the project.

Run the following command to clone the repository:

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory
Once the repository is cloned, navigate to the project directory:

```
cd backpack-clone
```
### 3. Install Dependencies
Install the required dependencies using npm (Node Package Manager) or yarn:

```
npm install
```
#### Or, if you're using yarn:

```
yarn install
```
### 4. Set Up Environment Variables
Create a .env file in the root directory of the project.

Add the following environment variables to configure the API keys and other settings:

```
VITE_API_KEY= your-alchemy-api-key
```
To get your api key signup to Alchemy 

### 5. Run the Development Server
Start the development server using the following command:


```
npm run dev
```
#### Or, if you're using yarn:

```
yarn dev
```
The application should now be running on http://localhost:5173 (or a different port as specified in the terminal).

### 6. Access the Application
Open your web browser and go to http://localhost:5173 to access the Backpack Clone application.
