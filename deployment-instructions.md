# TikTok Downloader Website Deployment Instructions

## Project Structure
```
tiktok-downloader/
├── public/
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## Setup Instructions

### 1. Create Project Structure
First, create the project structure as shown above:

```bash
mkdir -p tiktok-downloader/public
cd tiktok-downloader
```

### 2. Copy Files
- Copy the HTML code from the frontend artifact to `public/index.html`
- Copy the backend code from the backend artifact to `server.js`
- Copy the package.json content to `package.json`

### 3. Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

### 4. Start the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will run on port 3000 by default. You can access the website at http://localhost:3000

## API Details

The backend server communicates with the RapidAPI TikTok API using the credentials provided. The following endpoints are available:

- **GET /api/download?url=TIKTOK_URL**: Download a TikTok video by URL
- **GET /api/user/:username**: Get videos from a TikTok user by username

## Customization

You can customize the website by:
1. Modifying the HTML and CSS in `public/index.html`
2. Adding additional API endpoints in `server.js`
3. Changing the port by setting the PORT environment variable

## Deployment to Production

### Hosting on Heroku
1. Create a Heroku account and install the Heroku CLI
2. Initialize a Git repository and commit your code
3. Create a new Heroku app: `heroku create`
4. Deploy your app: `git push heroku main`

### Hosting on DigitalOcean
1. Create a Droplet with Node.js pre-installed
2. Upload your code to the server
3. Install dependencies: `npm install --production`
4. Set up a process manager like PM2: `npm install -g pm2`
5. Start your app with PM2: `pm2 start server.js`
6. Set up Nginx as a reverse proxy to your Node.js app

### Hosting on AWS
1. Create an EC2 instance
2. Install Node.js on the instance
3. Upload your code to the server
4. Install dependencies: `npm install --production`
5. Set up a process manager like PM2
6. Configure security groups to allow traffic on port 80/443

## Important Security Note
The API key is exposed in the server-side code. In a production environment, you should:
1. Store the API key as an environment variable
2. Implement rate limiting
3. Add additional security measures to prevent abuse
