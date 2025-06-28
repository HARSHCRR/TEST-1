const axios = require('axios');

async function testMatch() {
  // Using the real fingerprintTemplateHash from previous registration
  const fingerprintTemplate = 'QmQCJVpnMAf7P5J1aHacApuZR1XsV7h177tKb3AK3yPibU';

  try {
    const res = await axios.post('http://localhost:5050/api/match', {
      fingerprintTemplate
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Match found! Patient data:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('No match or error:', err.response.data);
    } else {
      console.error('Request failed:', err.message);
    }
  }
}

testMatch(); 