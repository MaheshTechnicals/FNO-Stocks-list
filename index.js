const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

async function fetchSymbols() {
  const baseUrl = 'https://www.nseindia.com';
  const pageUrl = `${baseUrl}/products-services/equity-derivatives-list-underlyings-information`;
  const apiUrl = `${baseUrl}/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O`;

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                  '(KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Referer': baseUrl,
  };

  try {
    // Get NSE session cookies
    const pageResp = await axios.get(pageUrl, { headers });
    const cookies = pageResp.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ');

    if (!cookies) {
      console.error('❌ Could not get NSE session cookies');
      return;
    }

    // Request API with cookies
    const apiResp = await axios.get(apiUrl, {
      headers: {
        ...headers,
        'Accept': 'application/json,text/plain,*/*',
        'Cookie': cookies,
      },
    });

    const data = apiResp.data.data;
    if (!data || data.length === 0) {
      console.error('❌ No data received from NSE API');
      return;
    }

    const sorted = data.sort((a, b) => a.symbol.localeCompare(b.symbol));
    const count = sorted.length;

    // CSV and TXT filenames with count
    const csvFileName = path.join(process.cwd(), `derivatives_symbols(${count}).csv`);
    const txtFileName = path.join(process.cwd(), `tradingview_symbols(${count}).txt`);

    // CSV with Sr. No.
    const csvRecords = sorted.map((item, index) => ({
      SrNo: index + 1,
      symbol: item.symbol,
    }));

    const csvWriter = createObjectCsvWriter({
      path: csvFileName,
      header: [
        { id: 'SrNo', title: 'Sr. No.' },
        { id: 'symbol', title: 'Symbol' },
      ],
    });
    await csvWriter.writeRecords(csvRecords);
    console.log(`✅ CSV file saved: ${csvFileName}`);

    // TXT with Sr. No.
    const tradingViewSymbols = sorted.map((item, index) => `${index + 1}. NSE:${item.symbol}`);
    fs.writeFileSync(txtFileName, tradingViewSymbols.join('\n'));
    console.log(`✅ TradingView list saved: ${txtFileName}`);

    // Output filenames for GitHub Actions
    console.log(`::set-output name=csv_file::${csvFileName}`);
    console.log(`::set-output name=txt_file::${txtFileName}`);

  } catch (err) {
    console.error('❌ Error fetching data:', err.message);
  }
}

// Run
fetchSymbols();
