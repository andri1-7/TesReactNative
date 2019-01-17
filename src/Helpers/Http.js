import * as Hooks from './Hooks';
import lang from './Language';
import * as Session from './Session';

// The Local
export const API = 'https://your.com/api';
const TAG = 'HTTP Helper';

/**
 * Create Request onto API
 * Inside Params:
 *    - Link {string} link - API endpoints (eg: "api/login")
 *    - Custom Link {string} custom_link - Full Http URL
 *    - Request Method {string} method - Http request method (eg: POST, GET, PUT or etc.)
 *    - Http Data {object} data - Data as Http request body
 *
 * @param {object} params - Contains parameters about Request
 *
 * @return {Promise}
 */
export default function createRequest(params:Object) {
  return new Promise((resolve, reject) => {
    let full_url = API;
    let message;

    // *** Set HTTP Link *** //
    if(!params.link) {
      if(!params.custom_link) {
        reject({message: lang('error.url_not_set')});
      } else {
        full_url = params.custom_link;
      }
    } else {
      full_url += params.link;
    }
    // *** /Set HTTP Link *** //

    let fetchOptions = {};
    // *** Set HTTP Headers *** //
    if(params.headers) {
      fetchOptions.headers = params.headers;
    } else {
      fetchOptions.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    }

    fetchOptions.headers['Authorization'] = Session.getValue(Session.API_TOKEN, '');
    // *** /Set HTTP Headers *** //

    // *** Set HTTP Method *** //
    if(params.method) {
      fetchOptions.method = params.method;
    } else {
      fetchOptions.method = 'GET'; // default is GET
    }
    // *** /Set HTTP Method *** //

    // *** Decide HTTP Data Container *** //
    if(params.data) {
      if (fetchOptions.method === 'GET') {
        let extend_url = [];
        for (var par in params.data) {
          if (params.data.hasOwnProperty(par)) {
            let param_get = par + "=" + params.data[par];
            extend_url = [...extend_url, param_get]; // push new param into extend_url
          }
        }

        full_url += `?${extend_url.join('&')}`;
      } else {
        if(/form/.test(fetchOptions.headers['Content-Type'])) {
          // Header type is form, so we need convert the json into Form Data
          // Used for uploading image/file, (Single and Multi)
          let formData = new FormData();
          for (let first_lvl in params.data) {
            if (params.data.hasOwnProperty(first_lvl)) {
              let first_lvl_data = params.data[first_lvl];

              if (Array.isArray(first_lvl_data)) { // Check if object value is an array
                // Multi Files
                for (let second_lvl in first_lvl_data) {
                  let second_lvl_data = first_lvl_data[second_lvl];
                  formData.append(`${first_lvl}[]`, second_lvl_data);
                }
              } else {
                // Single File
                formData.append(first_lvl, first_lvl_data);
              }
            }
          }

          fetchOptions.body = formData;
        } else {
          fetchOptions.body = JSON.stringify(params.data);
        }
      }
    }
    // *** /Decide HTTP Data Container *** //

    if(params.data)
      Hooks.consoleLog(TAG + ' "' + fetchOptions.method + '" REQUEST to ' + full_url, params.data);
    else
      Hooks.consoleLog(TAG + ' "' + fetchOptions.method + '" REQUEST to ' + full_url, '');

    // Set Timeout
    fetchOptions.timeout = 100; // 5000ms

    let response = fetch(full_url, fetchOptions)
    .then((response) => {
      Hooks.consoleLog(TAG + ' "' + fetchOptions.method + '" RESPONSE from ' + full_url, response);
      if(response.status === 200) {
        return response.json();
      } else {
        if(response.statusText) {
          message = response.statusText;
        } else {
          message = lang('error.http_' + response.status);
        }

        reject({message});
      }
    })
    .then((response) => {
      // Hooks.consoleLog(TAG + ' "' + fetchOptions.method + '" RESPONSE BODY from ' + full_url, response);
      if(response.status === true) {
        resolve(response.data);
      } else {
        if(response.message) {
          message = response.message;
        } else {
          message = lang('error.http_unknown');
        }
        reject({message});
      }
    })
    .catch((error) => {
      Hooks.consoleLog(TAG + ' "' + fetchOptions.method + '" CATCH \n' + full_url, error);
      reject(error);
    });
  });
}
