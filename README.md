# Participant Availability Scheduling System

This project is a scheduling system that identifies overlapping meeting slots across multiple participants, considering their weekly availability, daily thresholds, and existing schedules.

---

## Features

1. Identify overlapping time slots (30-minute durations) across multiple participants.
2. Ensure that meetings are planned only when all participants are free and within their daily meeting thresholds.
3. Avoid conflicts with existing participant schedules.

---

## Prerequisites

Make sure you have the following installed:

1. **Redis** (For caching)
2. **Node.js** (Backend server)
3. **npm** or **yarn** (Package manager)
4. **Next.js** (Frontend framework)

---

## Installation Instructions

Follow these instructions to set up the application on **Windows**, **Ubuntu**, or **Mac**.

---

### 1. Install Redis

#### **Windows**

1. Download the Redis MSI installer from [Memurai](https://memurai.com/) (a Redis-compatible solution for Windows).
2. Install the MSI package by following the setup wizard.
3. Start the Redis server:
   ```bash
   redis-server
   ```

#### **Ubuntu**

1. sudo apt install redis-server -y
2. sudo systemctl restart redis
3. redis-cli ping

#### **macOS**

1. Install Homebrew if not already installed
2. brew install redis
3. brew services start redis
4. redis-cli ping

### 2. Install Node

### 3. Install npm

### 4. run 'npm install' from project folder

### 5. npm run dev

open `http://127.0.0.1/participant/availability` in browser
