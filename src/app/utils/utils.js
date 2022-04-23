import React from 'react';

export const getEndOfWord = (number, endOfWord) => {
  if (!isNaN(number)) {
    number = Math.abs(number); // Возможно в будующем вынесем эту функцию в утилиты. Задел на универсальность
    if (String(number).length <= 1) {
      /*
      2 человека
      3 человека
      4 человека
       */
      if (number >= 2 && number <= 4) {
        return endOfWord;
      }
    } else {
      const numberToString = String(number).split('');
      const digit = String(number).length >= 3
        ? Number(numberToString.splice(numberToString.length - 2, numberToString.length).join(''))
        : number;
      /*
      22 23 24
      32 33 34
      42 43 44
      52 53 54
      62 63 64
      72 73 74
      82 83 84
      92 93 94
      */
      for (let d = 2; d < 10; d += 1) {
        if (digit === Number(d + '2')
          || digit === Number(d + '3')
          || digit === Number(d + '4')) {
          return endOfWord;
        }
      }
    }
  }
  return null;
};

/**
 * Function create headers columns of table
 * @param headers: Array of string
 * @param callBackFunc: Event handler
 * @returns <jsx>
 */
export const createHeaders = (headers, callBackFunc) => {
  return Object.keys(headers)
    .map((key, index) =>
      key !== 'exceptions'
        ? <th
          scope="col"
          key={`id-${index}`}
          onClick={!headers.exceptions.some(el => el === key)
            ? () => callBackFunc(key)
            : null
          }
        >
          {headers[key]}
        </th>
        : null
    );
};
