// encodeURI, decodeURI
(function() {
  const FULL_URI = 'https://github.com:8080/Chocobe/?first-query=Hello World&second-query=333&third-query=초코비#title';

  const encodingURI = encodeURI(FULL_URI);

  // https://github.com:8080/Chocobe/?first-query=Hello%20World&second-query=333&third-query=%EC%B4%88%EC%BD%94%EB%B9%84#title
  console.log(encodingURI);

  const decodingURI = decodeURI(encodingURI);

  // https://github.com:8080/Chocobe/?first-query=Hello World&second-query=333&third-query=초코비#title
  console.log(decodingURI);
}());


console.log('');


(function() {
  const queryString = 'first-query=Hello World&second-query=333&third-query=초코비';
  const encodeURIComponentResult = encodeURIComponent(queryString);
  const encodeURIResult = encodeURI(queryString);

  // first-query%3DHello%20World%26second-query%3D333%26third-query%3D%EC%B4%88%EC%BD%94%EB%B9%84
  console.log('encodeURIComponent(queryString):\n\t', encodeURIComponentResult);

  // first-query=Hello%20World&second-query=333&third-query=%EC%B4%88%EC%BD%94%EB%B9%84
  console.log('encodeURI(queryString):\n\t', encodeURIResult);

  const decodeURIComponentResult = decodeURIComponent(encodeURIComponentResult);
  const decodeURIResult = decodeURI(encodeURIResult);

  console.log('decodeURIComponent(encodeURIComponentResult):\n\t', decodeURIComponentResult);
  console.log('decodeURI(encodeURIResult):\n\t', decodeURIResult);
}());