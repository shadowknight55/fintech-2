# FinTech Application

## Overview

This is a simple **FinTech** application that allows users to manage their transactions, including deposits and withdrawals. The app tracks user balances and transaction details using a MySQL database. Users can sign up, log in, and view their transaction history. This project uses **Sequelize** ORM to interact with the database and **Express.js** to build the API.

## Features

- **User Registration**: Users can create accounts by providing a name, username, email, and password.
- **User Authentication**: Users can log in to access their accounts.
- **Transaction Management**: Users can create transactions (deposits or withdrawals) to manage their balance.
- **Database Management**: Sequelize is used for defining models and syncing tables to MySQL.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework to handle HTTP requests and server-side logic.
- **Sequelize**: ORM (Object Relational Mapping) for interacting with the MySQL database.
- **MySQL**: Relational database for storing user and transaction data.
- **dotenv**: A package to load environment variables from `.env` files (for sensitive data such as DB credentials).
- **bcrypt**: A library for hashing passwords securely.

## Setup & Installation

### Prerequisites
- **Node.js** installed on your machine (version >= 14.x).
- **MySQL** or a MySQL-compatible database running.

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd fintech
