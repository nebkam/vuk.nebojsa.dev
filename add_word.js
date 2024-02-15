const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();

if (process.argv.length < 3) {
  console.log("Usage: node add_word.js <string>");
  process.exit(1);
}
const word = process.argv[2];// The text to synthesize

async function add_word() {
  const request = {
    input: {text: word},
    voice: {languageCode: 'sr-RS'},
    audioConfig: {audioEncoding: 'MP3'},
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`${word}.mp3`, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${word}.mp3`);
}

await add_word();
