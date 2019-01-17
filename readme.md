# Ajhoel React Native Project Template

After Pull:<br>
1. <code>yarn install</code>
2. <code>react-native upgrade</code>
3. answer no (n) for all questions

Additional step (for iOS):<br>
4. <code>cd ios</code>
5. <code>pod install</code>
6. <code>cd ..</code>

7. <code>react-native run-ios</code> / <code>react-native run-android</code>

Project information:<br>
1. React Native v.0.56.1

Packages Include:<br>
1. [Native Base v.2.10](https://nativebase.io)
2. [React Native Vector Icons v.6.1.0](https://github.com/oblador/react-native-vector-icons)
3. [React Native Image Crop Picker](https://github.com/ivpusic/react-native-image-crop-picker)
4. [React Navigation v.3.x](https://reactnavigation.org/docs/en/getting-started.html)
5. Redux (Includes: react-redux, redux, redux-logger, redux-thunk)

Included Examples:<br>
1. Navigator Examples
2. Redux Action & Reducers Example + Redux Store Configuration
3. Separate Styles Example

Custom Libraries:
  * Language Helpers for multi languages app support<br>
  Code Example:<br>

  ```javascript
    /**
     * Load / Display registered label
     */
    ...
    import lang from 'path/to/Helpers/Language';
    ...

    ...
    render() {
      return(
        <Text>{ lang('title.home') }</Text>
      );      
    }
    ...
  ```
  ```javascript
    /**
     * Set current language
     */
    ...
    import { setLanguage } from 'path/to/Helpers/Language';
    ...

    ...
      changeLanguage() {
        setLanguage('id');
      }
    ...
  ```
  ```javascript
    /**
     * Get current language
     */
    ...
    import { getLanguage } from 'path/to/Helpers/Language';
    ...

    ...
      getCurrentLang() {
        let currentLang = getLanguage();
      }
    ...
  ```

  * Hooks helpers, helper for your own custom functions<br>Code Examples:<br>
  ```javascript
    // Import all
    import * as Hooks from 'path/to/Helpers/Hooks';

    ...
    let myValue = Hooks.yourCustomFunctionName(yourParams);
    let myOtherValue = Hooks.yourOtherCustomFunctionName(yourOtherParams);
    ...

    // Or

    import {
      yourCustomFunctionName,
      yourOtherCustomFunctionName
    } from 'path/to/Helpers/Hooks';

    ...
    let myValue = yourCustomFunctionName(yourParams);
    let myOtherValue = yourOtherCustomFunctionName(yourOtherParams);
    ...
  ```

  * Session Helpers, use to store detail of current session<br>Code Example:<br>
  ```javascript
    // Always Prepare Session when the app is started (usually in Splash Screen)
    import * as Session from 'path/to/Helpers/Session';

    ...
    Session.prepare().then((sessionData) => {
      // Do something with existed sessionData
    }).catch((err) => {
      console.log("Session Prepare Error", err.message);
    });
    ...
  ```
  ```javascript
    // Set Session Value
    ...
    let yourValue = 'my Name is Ajul';
    Session.setValue(Session.YOUR_KEY, yourValue);
    ...
    ```
    ```javascript
    // Get Session Value
    ...
    let myName = Session.getValue(Session.YOUR_KEY, 'default value');
    ...
  ```

  * Http Helpers, to handle Http Requests<br>Usage Example:<br>
  ```javascript
    ...
    import HttpRequest from 'path/to/Helpers/Http';
    ...

    ...
    let myRequest = {
      link: 'myapi/endpoints',
      method: 'POST',
      data: {
        id: 1,
        name: 'my name is'
      }
    }

    HttpRequest(myRequest).then((response) => {
      // Do something with the response
    }).catch((error) => {
      // Do something with the error
    });
    ...
  ```
