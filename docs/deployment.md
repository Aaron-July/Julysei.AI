# Deployment Guide for Julysei.AI

This guide covers how to deploy the Julysei.AI application using **Google Cloud Run** and **Vercel** (via GitHub).

## Prerequisites

1.  **Google Gemini API Key:** You need a valid API key from [Google AI Studio](https://aistudio.google.com/).
2.  **Project Code:** Ensure your code is pushed to a Git repository (e.g., GitHub).

---

## Option 1: Deploy via GitHub on Vercel
*Best for: Quick, automated deployments with CI/CD.*

"Verbal" likely refers to **Vercel**, which is the industry standard for deploying React apps directly from GitHub.

1.  **Push to GitHub:**
    Ensure your latest code is pushed to a public or private GitHub repository.

2.  **Create Vercel Project:**
    *   Log in to [Vercel](https://vercel.com/).
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your `Julysei.AI` repository.

3.  **Configure Build Settings:**
    Vercel automatically detects Vite.
    *   **Framework Preset:** Vite
    *   **Root Directory:** `./` (default)
    *   **Build Command:** `npm run build` (default)
    *   **Output Directory:** `dist` (default)

4.  **Environment Variables:**
    *   Expand the **"Environment Variables"** section.
    *   Add the following variable:
        *   **Key:** `API_KEY`
        *   **Value:** `your_actual_gemini_api_key_here`

5.  **Deploy:**
    *   Click **"Deploy"**.
    *   Vercel will build your application and provide a live URL (e.g., `https://julysei-ai.vercel.app`).

---

## Option 2: Deploy to Google Cloud Run
*Best for: Enterprise scaling, containerized environments, and staying within the Google Cloud ecosystem.*

Since this is a static frontend application, we will serve it using Nginx within a Docker container.

### 1. Create a `Dockerfile`
Create a file named `Dockerfile` in the root of your project:

```dockerfile
# Stage 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Pass the API key during build time (Note: For static sites, env vars are baked in at build)
ARG API_KEY
ENV API_KEY=$API_KEY

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (optional, see below)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 2. Create an Nginx Config (Recommended for SPAs)
Create a file named `nginx.conf` in the root to handle client-side routing (React Router):

```nginx
server {
    listen 80;
    
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
*Note: Uncomment the `COPY nginx.conf` line in the Dockerfile above if you use this.*

### 3. Build and Deploy using Google Cloud CLI

1.  **Initialize SDK:**
    Make sure you have the Google Cloud CLI installed and authenticated.
    ```bash
    gcloud auth login
    gcloud config set project YOUR_PROJECT_ID
    ```

2.  **Build the Container Image:**
    Submit the build to Cloud Build. You must pass the API Key as a build argument so it gets baked into the static files.
    ```bash
    gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/julysei-ai --substitutions=_API_KEY="your_actual_api_key" .
    ```
    *Note: You may need to modify your cloudbuild.yaml or Docker command to accept the ARG if using automated triggers.*

3.  **Deploy to Cloud Run:**
    ```bash
    gcloud run deploy julysei-app \
      --image gcr.io/YOUR_PROJECT_ID/julysei-ai \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated
    ```

4.  **Access:**
    The command output will provide a Service URL (e.g., `https://julysei-app-uc.a.run.app`).

---

## Important Note on Environment Variables

Because this is a **Client-Side (Vite/React)** application:
1.  **Build Time:** Environment variables like `API_KEY` are usually replaced and "baked in" to the JavaScript bundle during the `npm run build` process.
2.  **Runtime:** Changing the environment variable in Vercel or Cloud Run *after* the build usually triggers a re-build in Vercel. In Docker/Cloud Run, you must rebuild the image if the API Key changes.
