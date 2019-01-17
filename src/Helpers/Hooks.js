/**
 * Use this Helper to create your own custom functions
 */
import lang from './Language';
import moment from 'moment';
import { Alert } from 'react-native';

export const room_private = 1;
export const room_group = 2;
export const have_shop = 1;
export const isJSDebugEnable = (typeof atob !== 'undefined');

const waitDebug = 150; // 150ms
const waitProd = 10; // 10ms

const milInSecond = 1000;
const secondInMinutes = 60;
const minutesInHour = 60;
const hourInDay = 24;
const dayInWeeks = 7;
const weekInMonths = 4;
const monthInYear = 12;

export function consoleLog(TAG: String, message:String, force:Boolean = false){
  if(__DEV__ || force === true) { // if in Development mode
    console.log("###" + TAG + " => ", message);
  }
}
export function consoleError(TAG: String, message:String, force:Boolean = false){
  if(__DEV__ || force === true) { // if in Development mode
    console.error("###" + TAG + " => ", message);
  }
}

/**
 * Get & Formatting date
 *
 * @param {Object/String} date - contain JS Date Object, or formatted date string
 * @param {Boolean} time - wants to display time?
 * @param {String} - Date output format, using format like php
 *
 * @return {String} Formatted date
 */
export function getFormatDate(date = [], time = true, output_format = 'Y-m-d',  getDate = true) {
  // Convert to JS Date Object
  if(!date)
    date = moment().toDate();
  else
    date = moment(date).toDate();

  let year = date.getFullYear(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    hour = '' + date.getHours(),
    second = '' + date.getSeconds(),
    minute = '' + date.getMinutes();

  // Reformat to 2 digits
  month = (month.length < 2) ? '0' + month : month;
  day = (day.length < 2) ? '0' + day : day;
  hour = (hour.length < 2) ? '0' + hour : hour;
  minute = (minute.length < 2) ? '0' + minute : minute;
  second = (second.length < 2) ? '0' + second : second;

  // Formatting Date
  let dateArray = [];
  let dateSeparator = '-';
  let splitdate = output_format.split(/[^a-z]/gi);
  if(splitdate.length < 3) {
    return 'invalid format';
  }

  let get_separator = output_format.split(/[\w]/gi);

  for (var i = 0; i < splitdate.length; i++) {
    if(splitdate[i] == 'Y' || splitdate[i] == 'y') {
      dateArray.push(year);
    } else if(splitdate[i] == 'M' || splitdate[i] == 'm' || splitdate[i] == 'f' || splitdate[i] == 'F') {
      switch (splitdate[i]) {
        case 'M':
          month = lang('month_short.' + month);
          break;
        case 'f':
          month = lang('month_long.' + month);
          break;
        case 'F':
          month = lang('month_long.' + month);
          break;
      }

      dateArray.push(month);
    } else if(splitdate[i] == 'D' || splitdate[i] == 'd') {
      dateArray.push(day);
    }
  }

  let newDateSeparator = get_separator.filter(String);
  if(newDateSeparator.length > 0) {
    dateSeparator = newDateSeparator[0];
  }

  let newdatetime = dateArray.join(dateSeparator);
  if(time !== false) {
    newdatetime += ' ' + [hour, minute, second].join(':');
  }

  if (getDate === false) {

    let fullTime = [hour, minute, second].join(':');

    return fullTime;

  }else{

    return newdatetime;
  }

}

/**
 * to Calculate two date differences
 *
 * @param {string} newerDate - Newer Date
 * @param {string} olderDate - Older date
 * @param {string} unit - Output time unit (default 'second')
 * @param {boolean} withRemarks - Options for remark, will return string with remarks
 *
 * @return {integer/string} Date differences in unit
 */
export function calcDateDiff(newerDate, olderDate, unit = 'second', withRemarks = false) {
  // Convert date String into JS Date Object via moment
  newerDate = moment(newerDate).toDate();
  olderDate = moment(olderDate).toDate();
  let result = (newerDate.getTime() - olderDate.getTime()); // Differences in millisecond
  let langIndex = `time.${unit}`;

  switch (unit) {
    case 'millisecond':
      result = result;
    case 'minute':
      result = result / secondInMinutes;
    case 'hour':
      result = result / minutesInHour;
    case 'day':
      result = result / hourInDay;
    case 'week':
      result = result / dayInWeeks;
    case 'month':
      result = result / weekInMonths;
    case 'year':
      result = result / monthInYear;
    default:
      result = result / milInSecond;
  }

  if(withRemarks === true) {
    let remark = `${Math.round(result)} ${lang(langIndex)}`;
    if(result > 1)
      remark += 's';

    return remark;
  } else {
    return result;
  }
}

/**
 * to Print Post Date
 * Get age of post date
 *
 * @param {string} postDate - Post created date
 * @param {boolean} withRemarks - Options for remark, will return string with remarks
 *
 * @return {string} Results of post date age
 */
export function printPostDate(postDate, withRemarks = true) {
  let datenow = getFormatDate();
  let result = calcDateDiff(datenow, postDate);

  // Time Group, order from the smallest into biggest unit
  let timeGroup = {
    'second':secondInMinutes,
    'minute':minutesInHour,
    'hour':hourInDay,
    'day':dayInWeeks,
    'week':weekInMonths
  };

  if (result < 0) {
    // *** Post Date is in the Future *** //
    // remove the minus sign
    result = Math.abs(result);

    for (var unit in timeGroup) {
      if(result <= timeGroup[unit]) {
        let langIndex = (result > 1) ? `time_later.${unit}s` : `time_later.${unit}`;
        result = `${Math.round(result)} ${lang(langIndex)}`;

        break;
      }

      // Divide result into the next unit
      result = result / timeGroup[unit];
    }
  } else {
    // *** Post Date is in the Past *** //
    for (var unit in timeGroup) {
      if(result <= timeGroup[unit]) {
        let langIndex = (result > 1) ? `time_ago.${unit}s` : `time_ago.${unit}`;
        result = `${Math.round(result)} ${lang(langIndex)}`;

        break;
      }

      // Divide result into the next unit
      result = result / timeGroup[unit];
    }
  }

  // *** Others *** //
  if(withRemarks === true && typeof result === 'number') {
    // if result is more than 4 weeks
    return getFormatDate(moment(postDate).toDate(), false, 'd F Y');
  } else {
    return result;
  }
}

/**
 * Get Month String
 *
 * @param {integer} monthInInteger - Month in Integer
 * @param {string} type - Month output format (long | short)
 *
 * @return {string} Month output
 */
export function getMonthString(monthInInteger = null, type = 'long') {
  if(monthInInteger === null) {
    monthInInteger = moment.format('m');
  }

  monthInInteger = monthInInteger.toString();
  let month = monthInInteger <= 9 ? '0' + monthInInteger : monthInInteger;

  return lang(`month_${type}.${month}`);
}

// to Filter Array of Object and return new array fill by filtered value
export function filterArray(arrayOfObject: Array, filter: Object, count:Boolean = false) {
  let newArray = arrayOfObject.filter(
    (obj) => filterCallback(obj, filter)
  );

  if(count === true) {
    return newArray.length || 0;
  } else {
    return newArray || [];
  }
}

function filterCallback(obj, filter) {
  let tempResult = false;

  for (var key in filter) {
    if (filter.hasOwnProperty(key)) {
      let isNegation = /^!./.test(filter[key]);
      let newValue = filter[key].toString();
      newValue = newValue.replace("!", ""); // Remove negation code (!)

      if(isNegation && obj[key] != newValue) {
        tempResult = true;
      } else if(!isNegation && obj[key] == filter[key]) {
        tempResult = true;
      } else {
        tempResult = false;
        break;
      }
    } else {
      tempResult = false;
      break;
    }
  }

  return tempResult;
}

export function getTime(date, withSeconds = false) {
  date = date.split(' ');
  let time = date[1];
  let newdate = date[0];

  if(withSeconds == false) {
    time = time.slice(0, -3, '');
  }

  return time;
}

export function getIndexOf(arrayOfObject, filter) {
  let index = arrayOfObject.findIndex((person) => {
    let filterKey = Object.keys(filter)[0];
    return person[filterKey] == filter[filterKey];
  });

  return index;
}

export function popArray(arrayOfObject, filter) {
  let getIndex = getIndexOf(arrayOfObject, filter);
  if(getIndex !== -1) {
    let removedElem = arrayOfObject.splice(getIndex, 1);
    let returnValue = {
      new_array: arrayOfObject,
      removedElem
    }
    return returnValue;
  } else {
    let returnValue = {
      new_array: arrayOfObject,
      removedElem: {}
    }
    return returnValue;
  }
}

export function pushObj(currentArray = [], newObject, pushOnTop = false) {
  if(!Array.isArray(newObject)) {
    newObject = [newObject]; // put newObject to Array
  }

  if(pushOnTop != true) {
    return currentArray.concat(newObject);
  } else {
    return newObject.concat(currentArray);
  }
}

export function getWaitingTime() {
  // is JS Remote Debug enabled?
  const isDebuggingEnabled = isJSDebugEnable;
  if(isDebuggingEnabled === true) {
    return waitDebug;
  } else {
    return waitProd;
  }
}

/**
 * Format Currency
 * @param {Float/Int} price - contains number to be fomatted
 * @param {String} currency - currency, default is IDR
 * @param {Int} dec_digit - amount of decimal digit
 * @return {String} - Result of formatted currency
 */
export function formatCurrency(price, currency = 'IDR', dec_digit = 0) {
  let dec_sep;
  let th_sep;
  let currency_symbol;

  switch (currency) {
    case 'IDR':
      currency_symbol = 'Rp ';
      dec_sep = ',';
      th_sep = '.';
      break;
    case 'USD':
      currency_symbol = '$';
      dec_sep = '.';
      th_sep = ',';
      break;
    default:
      currency_symbol = (currency) ? currency + " " : '';
      dec_sep = ',';
      th_sep = '.';
      break;
  }

  let n = price,
  c = dec_digit,
  d = dec_sep,
  t = th_sep,
  s = n < 0 ? "-" : "",
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
  j = (j = i.length) > 3 ? j % 3 : 0;

  return currency_symbol + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - parseInt(i)).toFixed(c).slice(2) : "");
}

export function formValidation(formData, requiredData) {
  let passed = true;

  for (var field of requiredData) {
    if(!formData.hasOwnProperty(field) || !formData[field]) {
      passed = false;
      break;
    }
  }

  if(passed === false) {
    Alert.alert(
      `${lang('title.form_validation')}`,
      `${lang(`label.${field}`)} ${lang('error.input_required')}`
    );
  }

  return passed;
}

export function loadDefaultWebView() {
  let html = `<html>Testing From Hooks</html>`;

  return html;
}

/**
 * Remove HTML Tags from text
 * @param {string} text - Text to be filtered
 * @return {string} Text after filtered
 */
export function stripHTMLTags(text) {
  let regex = /<[^>]*>/g;
  return text.replace(regex, '');
}
