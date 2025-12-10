# 📄 API Specification

**Project Name:** DebtBuddy
**Version:** 0.1 — Draft
**Author:** Jordy Figueroa

---

## Overview

This document defines the REST API endpoints for the DebtBuddy budgeting + debt payoff application.
It covers:

- Authentication
- Debt CRUD + payoff plans
- Transaction entry + import
- Categories + budgeting
- Analytics + reporting

All endpoints return JSON unless otherwise noted.

---

## 🧑‍💻 Authentication Endpoints

| Method | Endpoint             | Purpose                 | Body                  | Response              |
| ------ | -------------------- | ----------------------- | --------------------- | --------------------- |
| POST   | `/api/auth/register` | Create new user account | `{ email, password }` | `userId, token`       |
| POST   | `/api/auth/login`    | Authenticate user       | `{ email, password }` | `token, user profile` |
| POST   | `/api/auth/logout`   | Invalidate user session | none                  | status only           |

---

## 💳 Debt Endpoints

| Method | Endpoint                | Purpose                                        |
| ------ | ----------------------- | ---------------------------------------------- |
| POST   | `/api/debts/create`     | Add new debt to user profile                   |
| GET    | `/api/debts`            | List all debts for user                        |
| GET    | `/api/debts/:id`        | Get details for a single debt                  |
| PUT    | `/api/debts/update/:id` | Update debt fields (balance, APR, min payment) |
| DELETE | `/api/debts/delete/:id` | Remove a debt                                  |

**Request Format Example**

```json
POST /api/debts/create
{
  "name": "Chase Credit Card",
  "balance": 4200.50,
  "interestRate": 19.99,
  "minPayment": 120
}
```

**Response Format Example**

```json
{
  "debtId": "uuid",
  "name": "Chase Credit Card",
  "balance": 4200.5,
  "interestRate": 19.99,
  "minPayment": 120
}
```

---

## 📉 Payoff Strategy Endpoints

| Method | Endpoint               | Purpose                                       |
| ------ | ---------------------- | --------------------------------------------- |
| POST   | `/api/debts/snowball`  | Return payoff schedule (lowest balance first) |
| POST   | `/api/debts/avalanche` | Return payoff schedule (highest APR first)    |

**Request**

```json
{
  "extraPayment": 200,      // optional extra amount applied monthly
  "debts": [ ... ]          // full user debt list
}
```

**Response**

```json
{
  "method": "snowball",
  "monthsToFreedom": 22,
  "totalInterestPaid": 1800.45,
  "schedule": [
    { "month": 1, "debt": "Chase",  "balance": 4000 },
    { "month": 2, "debt": "Chase",  "balance": 3800 },
    ...
  ]
}
```

---

## 💰 Transaction Endpoints

| Method | Endpoint                       | Purpose                           |
| ------ | ------------------------------ | --------------------------------- |
| POST   | `/api/transactions/add`        | Add a spending/income transaction |
| GET    | `/api/transactions`            | List transactions (with filters)  |
| GET    | `/api/transactions/:id`        | View single transaction           |
| PUT    | `/api/transactions/update/:id` | Edit transaction                  |
| DELETE | `/api/transactions/delete/:id` | Remove transaction                |

**Request Example**

```json
POST /api/transactions/add
{
  "amount": 45.90,
  "date": "2025-01-10",
  "categoryId": "uuid",
  "description": "Gas station"
}
```

---

## 📂 CSV Import Endpoint

| Method | Endpoint                   | Purpose                                |
| ------ | -------------------------- | -------------------------------------- |
| POST   | `/api/transactions/import` | Upload CSV file to import transactions |

Example Usage:

```
file upload: transactions.csv
```

CSV Format Example:

```
date,amount,merchant,category
2025-01-02,12.99,McDonald's,Food
2025-01-03,60.00,Shell,GAS
```

---

## 🏷 Category Endpoints

| Method | Endpoint                     | Purpose                            |
| ------ | ---------------------------- | ---------------------------------- |
| POST   | `/api/categories/create`     | Create new spending category       |
| GET    | `/api/categories`            | List user categories               |
| PUT    | `/api/categories/update/:id` | Edit category name or budget limit |
| DELETE | `/api/categories/delete/:id` | Remove a category                  |

Example:

```json
{
  "name": "Food & Dining",
  "monthlyBudget": 350
}
```

---

## 📊 Budget & Analytics Endpoints

| Method | Endpoint                 | Purpose                                     |
| ------ | ------------------------ | ------------------------------------------- |
| GET    | `/api/budget/summary`    | Monthly spending summary                    |
| GET    | `/api/budget/report`     | Category totals, averages, charts           |
| GET    | `/api/budget/projection` | Estimate time to debt freedom using budgets |

Example Response:

```json
{
  "month": "January",
  "totalSpent": 1200.4,
  "categoryBreakdown": {
    "Food": 350.0,
    "Bills": 580.0,
    "Gas": 120.5
  }
}
```

---

# Status & Versioning

| Field           | Value                                   |
| --------------- | --------------------------------------- |
| Current Version | 0.1                                     |
| Status          | Draft — Not yet implemented             |
| Next Update     | Database connections + auth integration |
