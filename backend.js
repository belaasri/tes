// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to download TikTok video
app.get('/api/download', async (req, res) => {
  try {
    const tiktokUrl = req.query.url;
    
    if (!tiktokUrl) {
      return res.status(400).json({ error: 'TikTok URL is required' });
    }

    // Call the RapidAPI endpoint
    const response = await axios({
      method: 'GET',
      url: 'https://tiktok-api23.p.rapidapi.com/api/download/video',
      params: { url: tiktokUrl },
      headers: {
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
        'x-rapidapi-key': 'd1c53133acmsh2e7c470c0bfbb2ep1a074cjsne9dd522da151'
      }
    });

    // Extract relevant information from the API response
    const data = response.data;
    
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    // Format the response
    const result = {
      title: data.title || '',
      author: data.author?.nickname || data.author || '',
      thumbnail: data.thumbnail || data.cover || '',
      videoUrl: data.play || '',
      videoUrlNoWatermark: data.video_no_watermark || data.play || '',
      audioUrl: data.music || '',
      likes: data.likes || 0,
      comments: data.comments || 0,
      shares: data.shares || 0
    };

    res.json(result);
  } catch (error) {
    console.error('Error downloading TikTok video:', error);
    
    let errorMessage = 'Failed to download TikTok video';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    
    res.status(500).json({ error: errorMessage });
  }
});

// Handle username requests
app.get('/api/user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    
    // Call the RapidAPI endpoint for user videos
    const response = await axios({
      method: 'GET',
      url: 'https://tiktok-api23.p.rapidapi.com/api/user/videos',
      params: { username: username },
      headers: {
        'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
        'x-rapidapi-key': 'd1c53133acmsh2e7c470c0bfbb2ep1a074cjsne9dd522da151'
      }
    });

    const data = response.data;
    
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ error: 'Failed to fetch user videos' });
  }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
