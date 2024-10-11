const endpoints = {
  baseUrl: 'https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/',
  session: '/sessions',
  register: '/users',
  checkEmail: '/auth/check-email/',
  verify: '/auth/verify-account',
  resend: '/auth/resend-otp/',
};

type EndpointKey = keyof typeof endpoints;

export const getUrl = (
  route: Exclude<EndpointKey, 'baseUrl' | 'gg'>,
  path?: string,
  query?: Record<string, string | number | boolean | Array<string | number | boolean>>
): string => {
  const url = new URL(`${endpoints.baseUrl}${endpoints[route]}`);

  if (path) {
    url.pathname += path;
  }

  if (query) {
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach(val => url.searchParams.append(key, String(val)));
      } else {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
};


export default endpoints;