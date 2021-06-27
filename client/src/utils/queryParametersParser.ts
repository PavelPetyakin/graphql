interface IQueryParams {
  lang?: "en";
  size?: "Large";
  color?: string;
  plotter?: boolean;
  cutter?: boolean;
}

export function getQueryParams(searchParams: string): IQueryParams {
  const params: {[key: string]: string} = {};
  const vars = searchParams.substring(1).split("&");

  vars.forEach(elem => {
    const [ key, value ] = elem.split("=");
    params[key] = value;
  });

  return params as IQueryParams;
}
