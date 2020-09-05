// eslint-disable-next-line no-unused-vars
const myFetch = async (args) => {
  const {
    url,
    endpoint = '',
    headers = {},
    args: queryArgs = {},
  } = args;

  const argString = Object
    .keys(queryArgs)
    .map((key, i) => `${!i ? '?' : ''}${key}=${
      !isArray(queryArgs[key])
        ? queryArgs[key]
        : queryArgs[key].join(`&${key}=`)}`)
    .join('&');

  try {
    const response = await fetch(encodeURI(`${url}${endpoint}${argString}`, headers));
    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};
