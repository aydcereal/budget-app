Software Requirements Specification
Project Name: DebtBuddy
Project Type: Web Application (Mobile later)
Author: Jordy Figueroa
Version: .01 (Draft)

1. Project Overview
   1.1. Purpose
   The purpose of this application is to help users with their personal finances via tracking spending, budgeting income, and optimizing debt payoff by using methods like Snowball and Avalanche. This app will allow users to upload transactions and credit card information manually (by uploading CSV files or manual input, but will eventually be automated with APIs)

1.2. Target Users
User Type Description
General users For people who want to organize their finances
People in debt People that need guidance and motivation to pay off debt
Budget Planners People looking for a category-based budget tracker

1.3. Goals
Provide a dashboard overview of the user’s current financial status
Help users become debt free faster
Display spending categories and trends
Automate payoff planning and projections
Live updates of transactions, and automatic updates to payoff projections
Eventually sync with bank information through APIs

2. Functional Requirements
   2.1. User Account and Authentication
   • Users can create an account
   • Users can Log in / out
   • Optional: Multi-device access using cloud database

2.2. Debt Tracking Module
Feature Description
Add new debt Name, balance, interest rate, min payment
Edit debt Change values of name, balance, interest rate, min payment
Delete debt Remove card or debt
View all debts Overview of totals and status, displayed in a table/list
Create payoff strategy Choose between Snowball or Avalanche

2.3. Transaction and Budget Module
Feature Description
Add transaction Manually Amount, date, description, category
Upload CSV Upload bank CSV transaction report for faster entry
Categorize expenses Create, modify, rename categories
Automated categorization Not yet defined
View reports Monthly spend, average per category

2.3..1. Automated Transaction Categorization
The system should automatically new transactions based on recognized patterns, merchant names, or learned behavior, Through use of AI or self-created algorithm. Users must be able to manually update category assignments to improve future accuracy

2.4. Payoff Calculation Engine
Requirement Detail
Snowball Pays smallest debt first
Avalanche Pays Highest interest debt first
Output Payoff schedule, total interest, debt-free date

2.5. Analytics and Reporting
• Monthly spending summary
• Category breakdown (pie/bar charts)
• Debt payoff projection timeline
• Total interest saved vs minimum payments

Future Expansion (Phase 2)
• Bank transaction sync (Plaid)
• AI budgeting assistant
• Mobile app version (React Native)

3. Non-Functional Requirements
   Category Requirement
   Performance App should load within 2 seconds
   Scalability Handle 10k+ transactions per user
   Security Passwords hashed, finance data encrypted
   Reliability Offline use support(sync later)
   Usability No finance knowledge required to use

4. Technology Stack
   Area Tech
   Front end UI Next.js(React + Typescript)
   Backend Next.js API Routes / Supabse
   Database Supabase PostgreSQL
   Styling TailwindCSS
   Charts Chart.js

5. Milestone Breakdown
   Sprint Deliverable
   Sprint 1 UI + Routing + layout
   Sprint 2 Debt CRUD system
   Sprint 3 Transaction entry + categories
   Sprint 4 Snowball/Avalanche engine
   Sprint 5 Analytics dashboard + charts
   Sprint 6 CSV import
   Sprint 7 Bank sync + AI integration
