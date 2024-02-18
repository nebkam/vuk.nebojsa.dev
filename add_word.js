const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const {sort} = require("./src/app/shared/array");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const client = new textToSpeech.TextToSpeechClient();
const WORDS_FILE_PATH = './src/assets/words/words.json';

if (process.argv.length < 3) {
  console.log("Usage: node add_word.js <string>");
  process.exit(1);
}
const word = process.argv[2];// The text to synthesize

async function synthesiseAndSave() {
  const json= await readFile(WORDS_FILE_PATH, 'utf8');
  const WORDS = JSON.parse(json);
  WORDS.push(word);
  sort(WORDS);
  await writeFile(WORDS_FILE_PATH, JSON.stringify(WORDS, null, 2), 'utf8');
  console.log(`Word added to file: ${WORDS_FILE_PATH}`);

  const request = {
    input: {text: word},
    voice: {languageCode: 'sr-RS'},
    audioConfig: {audioEncoding: 'MP3'},
  };
  const [response] = await client.synthesizeSpeech(request);
  const audioFilePath = `./src/assets/words/mp3/${word}.mp3`;
  await writeFile(audioFilePath, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${audioFilePath}`);
}

// noinspection JSIgnoredPromiseFromCall
synthesiseAndSave();
