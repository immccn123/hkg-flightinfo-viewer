export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    url.host = "www.hongkongairport.com";
    url.pathname = "flightinfo-rest/rest/flights/past";

    const resp = await fetch(url);

    return new Response(resp.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": resp.headers.get('content-type'),
      },
      status: resp.status,
      statusText: resp.statusText,
    });
  },
};
