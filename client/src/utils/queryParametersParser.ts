export function getQueryParams(searchParams: string): {[key: string]: string} {
  const params: {[key: string]: string} = {};
  const vars = searchParams.substring(1).split("&");

  vars.forEach(elem => {
    const [ key, value ] = elem.split("=");
    params[key] = value;
  });

  return params;
}
