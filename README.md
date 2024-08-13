# Task Manager Application

This is a full-stack task management application built with a NestJS backend and a Vue.js frontend. The backend uses MongoDB as its database, which is hosted on MongoDB Atlas.

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  - [Initial Setup](#initial-setup)
  - [Using Docker](#using-docker)
  - [Using NPM](#using-npm)
- [Environment Variables](#environment-variables)
  - [With NPM](#with-npm)
- [Project Structure](#project-structure)

## Description

This repository contains two main projects:

- **Backend**: A RESTful API built with [NestJS](https://nestjs.com/), connected to MongoDB Atlas.
- **Frontend**: A single-page application (SPA) built with [Vue.js](https://vuejs.org/) and [Vue Router](https://router.vuejs.org/).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Git**: Installed
- **MongoDB Atlas Account**: For database setup

### If you are using Docker:

- **Docker**: Installed and running
- **Docker Compose**: Installed

### If you are not using Docker:
- **Git**: Installed
- **Node.js**: v18.x or higher

### For development:
- **Vue CLI**: Installed
- **NestJS CLI**: Installed

## Setup and Installation

### Initial Setup

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/yourusername/task-manager.git](https://github.com/aayush305/BrokerLift.git)
   cd task-manager
   ```

2. **Set up environment variables:**

   Create a .env file in task-manager-be directory with the following content:

   ```bash
   MONGO_CONNECTION_STRING=<your_mongo_atlas_connection_string>
   ACCESS_KEY=<your_access_key> EX: NOW!
   ```

   Create a .env file in task-manager-fe directory with the following content:

    ```bash
    VUE_APP_API_URL=http://localhost:3000
     ```

### Using Docker

- **Build and run the containers:**

   ```bash
   docker-compose up --build
   ```

- **Access the application:**

   Open your browser and navigate to `http://localhost:8080`.

- To stop the services, press Ctrl+C and then run:

   ```bash
   docker-compose down
   ```

### Using NPM

1.  **Install dependencies:**

    ```bash
    cd task-manager-be
    npm install
    cd ../task-manager-fe
    npm install
    ```

2.  **Run the backend:**

    ```bash
    cd ../task-manager-be
    npm run start:dev
    ```

3.  **Run the frontend:**

    ```bash
     cd ../task-manager-fe
     npm run dev
    ```
4. **Access the application:**

   Open your browser and navigate to `http://localhost:5173`.

## Environment Variables

The following environment variables are required to run the application:

- **MONGO_CONNECTION_STRING**: MongoDB Atlas connection string.
- **ACCESS_KEY**: Access key for the application.

## Project Structure

The project structure is as follows:

- **task-manager-be**: Contains the backend code.
- **task-manager-fe**: Contains the frontend code.
