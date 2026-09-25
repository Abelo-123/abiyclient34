const BOT_SERVICE_URL = 'https://abiybot34.onrender.com';

async function sendFakeOrderTest() {
    console.log(`=== Sending Sample Fake Order Notification to ${BOT_SERVICE_URL}/api/sendToJohn ===`);
    
    const payload = {
        type: 'neworder',
        platform: 'ziviop',
        uid: '5928771903',
        uuid: 'TestUser_John',
        service: '🚀 Sample Instagram Followers (Fake Order Test)',
        order: 'TEST-' + Math.floor(10000 + Math.random() * 90000),
        amount: '35.00',
        panel: 'GodOfPanel',
        pb: '200.00'
    };

    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(`${BOT_SERVICE_URL}/api/sendToJohn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log(`HTTP Status: ${response.status}`);
        console.log(`Response Body: ${text}`);

        if (response.ok) {
            console.log('\n[SUCCESS] Sample fake order notification sent successfully!');
        } else {
            console.log('\n[ERROR] Server returned error status.');
        }
    } catch (err) {
        console.error('\n[ERROR] Request failed:', err.message);
    }
}

sendFakeOrderTest();
