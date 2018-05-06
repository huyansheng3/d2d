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
