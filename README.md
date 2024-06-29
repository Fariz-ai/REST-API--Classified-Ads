# REST API: Classified Ads

Welcome to the **Classified Ads REST API** documentation. This API provides a platform for managing classified ads including user registration, login, ad creation, viewing, and searching.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Features](#features)
- [Error Handling](#error-handling)

## Introduction

The Classified Ads REST API is designed to facilitate the creation and management of classified advertisements. Users can register, and login. Advertisers can create, view, and search ads, as well as manage ad-related images.

## Getting Started

To get started with the API, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Fariz-ai/REST-API--Classified-Ads.git
    ```
2. **Install dependencies:**
    ```bash
    cd REST-API--Classified-Ads
    npm install
    ```
3. **Set up environment variables:** Create a `.env` file in the root directory and add your environment-specific variables.
4. **Run the server:**
    ```bash
    npm start
    ```
5. **Access the API:** The API will be accessible at `http://localhost:3006`.

## Features

- Authentication with JWT
- CRUD Ads
- Show product random for homepage
- Show detail product
- Search Product by Title

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Error responses will include a message field describing the error.

- **400 Bad Request:** The request was invalid or cannot be otherwise served.
- **401 Unauthorized:** Authentication is required and has failed or has not yet been provided.
- **404 Not Found:** The requested resource could not be found.
- **500 Internal Server Error:** An error occurred on the server.
