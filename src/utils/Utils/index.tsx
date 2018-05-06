import { isNumber } from 'lodash';

export function parseInitValue(value) {
  let ret;
  if (value !== 0 && !value) {
    ret = undefined;
  }

  if (isNumber(value)) {
    ret = String(value);
  }

  return ret;
}

function getError(option, xhr) {
  var msg = 'cannot post ' + option.action + ' ' + xhr.status;
  var err = new Error(msg);
  var newError = {
    ...err,
    status: xhr.status,
    method: 'post',
    url: option.action,
  };

  return newError;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  data: Object,
//  filename: String,
//  file: File,
//  withCredentials: Boolean,
//  action: String,
//  headers: Object,
// }
export function customRequest(option) {
  var xhr = new XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      var newEvent = {};
      if (e.total > 0) {
        newEvent = { ...e, percent: e.loaded / e.total * 100 };
      }
      option.onProgress(newEvent);
    };
  }

  var formData = new FormData();

  if (option.data) {
    Object.keys(option.data).map(function(key) {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };

  xhr.open('post', option.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {};

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  // if (headers['X-Requested-With'] !== null) {
  //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // }

  for (var h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  return {
    abort: function abort() {
      xhr.abort();
    },
  };
}
