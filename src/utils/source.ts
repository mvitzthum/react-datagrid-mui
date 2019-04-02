export const createSource = (
  get: (url: string) => Promise<any>,
  url: string
) => (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  desc: boolean,
  filter?: { [key: string]: any }
) => {
  const urlSep = url.indexOf("?") === -1 ? "?" : "&";
  const p = new Promise<{ total: number; data: any[] }>((res, rej) => {
    get(
      `${url}${urlSep}page=${page}&count=${rowsPerPage}&orderBy=${orderBy}&desc=${desc}${serializeFilter(
        filter || {}
      )}`
    )
      .then(resp => res({ data: resp.data, total: resp.total }))
      .catch(rej);
  });

  return p;
};

function serializeFilter(filter: { [key: string]: any }) {
  let query = "";
  // tslint:disable-next-line:forin
  for (const x in filter) {
    query += `&${x}=${filter[x]}`;
  }

  return query;
}