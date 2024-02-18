const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const client = new textToSpeech.TextToSpeechClient();
const SENTENCES_FILE_PATH = './src/assets/sentences/sentences.json';

if (process.argv.length < 3) {
  console.log("Usage: node add_sentence.js '<string>'");
  process.exit(1);
}
const sentence = process.argv[2];// The text to synthesize

async function synthesiseAndSave() {
  const json= await readFile(SENTENCES_FILE_PATH, 'utf8');
  const SENTENCES = JSON.parse(json);
  SENTENCES.push(sentence);
  await writeFile(SENTENCES_FILE_PATH, JSON.stringify(SENTENCES, null, 2), 'utf8');
  console.log(`Sentence added to file: ${SENTENCES_FILE_PATH}`);

  const request = {
    input: {text: sentence},
    voice: {languageCode: 'sr-RS'},
    audioConfig: {audioEncoding: 'MP3'},
  };
  const [response] = await client.synthesizeSpeech(request);
  const audioFilePath = `./src/assets/sentences/mp3/${sentence}.mp3`;
  await writeFile(audioFilePath, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${audioFilePath}`);
}

// noinspection JSIgnoredPromiseFromCall
synthesiseAndSave();
