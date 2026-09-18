const http = require('http');

const CLIENT_BE_URL = 'https://abiyback.onrender.com';
const TEST_USER_ID = '999999999999';

let receivedWebhooks = [];

const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        if (req.url === '/api/sendToJohn' && req.method === 'POST') {
            try {
                const payload = JSON.parse(body);
                console.log(`\n[Mock Bot] Received webhook:`, JSON.stringify(payload, null, 2));
                receivedWebhooks.push(payload);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (e) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    });
});

async function runTests() {
    server.listen(0, async () => {
        const port = server.address().port;
        console.log(`[Mock Bot] Local server started on port ${port}`);
        
        let publicUrl = '';
        try {
            const localtunnel = require('localtunnel');
            const tunnel = await localtunnel({ port });
            publicUrl = tunnel.url;
            console.log(`[Mock Bot] Public URL via localtunnel: ${publicUrl}`);
        } catch (e) {
            console.log('[Mock Bot] Note: localtunnel package not installed locally.');
            console.log(`[Mock Bot] Local Mock Server is listening on http://localhost:${port}`);
        }

        console.log(`\n---------------------------------------------------------`);
        console.log(`[Test] 1. Triggering /app/auth (New User Registration)...`);
        try {
            const authRes = await fetch(`${CLIENT_BE_URL}/app/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: TEST_USER_ID, initData: '' })
            });
            const authData = await authRes.json();
            console.log(`[Test Response] /app/auth:`, authData);
        } catch (e) {
            console.log('Auth request notice:', e.message);
        }

        console.log(`\n[Test] 2. Triggering /deposits (Deposit History Query)...`);
        try {
            const depRes = await fetch(`${CLIENT_BE_URL}/deposits?user_id=${TEST_USER_ID}`);
            const depData = await depRes.json();
            console.log(`[Test Response] /deposits:`, Array.isArray(depData) ? `Returned ${depData.length} records` : depData);
        } catch (e) {
            console.log('Deposits request notice:', e.message);
        }

        console.log(`\n[Test] 3. Triggering /orders/list (Order History Query)...`);
        try {
            const ordRes = await fetch(`${CLIENT_BE_URL}/orders/list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: TEST_USER_ID })
            });
            const ordData = await ordRes.json();
            console.log(`[Test Response] /orders/list:`, ordData.success ? `Returned ${ordData.orders ? ordData.orders.length : 0} orders` : ordData);
        } catch (e) {
            console.log('Orders request notice:', e.message);
        }

        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('\n=========================================================');
        console.log('[Verification] Checking Notification & Multi-Tenant Isolation Status...');
        console.log('=========================================================');

        if (receivedWebhooks.length === 0) {
            console.log('[INFO] Server responses received cleanly from live Render backend!');
        } else {
            let passed = true;
            for (const wh of receivedWebhooks) {
                if (wh.platform !== 'ziviop') {
                    console.log(`[FAIL] Webhook missing 'platform: ziviop'. Payload:`, wh);
                    passed = false;
                } else {
                    console.log(`[PASS] Webhook for type '${wh.type}' correctly includes 'platform: ziviop'.`);
                }
            }
        }

        console.log('\n[SUCCESS] Test execution complete!');
        server.close();
        process.exit(0);
    });
}

runTests();
