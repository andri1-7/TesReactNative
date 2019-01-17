import english from './en';
import indonesian from './id';
// import { consoleLog } from '../Hooks';

const TAG = 'LANGUAGE HELPER';

// Imported Language
const en = 'en'; // English
const id = 'id'; // Indonesian

// Available Language
export const availLang = [ en, id ];
let currentLang = id; // Default language is id

/**
 * Get JSON Index value from language JSON variable
 * @param {Object} obj - Language JSON variable
 * @param {String} prop - JSON index name (separate nested object with pointmark (.))
 * @return {String} - Object index value
 */
function fetchObject(obj, prop) {
  if(!obj) {
    return false;
  }

  // split prop
  var _index = prop.indexOf('.');

  // prop split found
  if(_index > -1) {
    // re-execute this function to get property inside other property
    return fetchObject(obj[prop.substring(0, _index)], prop.substr(_index+1));
  }

  return obj[prop];
}

/**
 * Set app language (Void)
 * @param {string} lang - Language encode (eg. id, en, fr etc.)
 */
export function setLanguage(lang) {
  console.log(`${TAG} Set Lang`, `${currentLang} => ${lang}`);

  if(lang)
    currentLang = lang;
}

/**
 * Get app current language
 * @return {string} - Language encode (eg. id, en, fr etc.)
 */
export function getLanguage() {
  return currentLang;
}

/**
 * Lang displayer
 * @param {string} index - JSON Index
 *
 * @return {string} JSON Index value
 */
export default function Strings(index) {
  let lang = {};

  switch (currentLang) {
    case en:
      lang = english;
      break;
    case id:
      lang = indonesian;
      break;
  }

  let langValue = fetchObject(lang, index);

  if(typeof langValue !== 'string') {
    return index;
  } else {
    return langValue || '';
  }
}
