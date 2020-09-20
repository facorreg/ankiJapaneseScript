// eslint-disable-next-line no-unused-vars
const myFetch = async (args) => {
  const {
    url,
    endpoint = '',
    requestInit = {},
    args: queryArgs = {},
  } = args;

  const headers = new Headers();
  const { headerData = {} } = requestInit;
  Object.keys(headerData).forEach((prop) => headers.append(prop, headerData[prop]));
  const argString = Object
    .keys(queryArgs)
    .map((key, i) => `${!i ? '?' : ''}${key}=${!isArray(queryArgs[key])
      ? queryArgs[key]
      : queryArgs[key].join(`&${key}=`)}`)
    .join('&');

  const requestInfo = encodeURI(`${url}${endpoint}${argString}`);

  try {
    const response = await fetch(requestInfo, { ...requestInit, headers });
    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};
