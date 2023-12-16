export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    url.host = "www.hongkongairport.com";
    url.pathname = "flightinfo-rest/rest/flights/past";

    const resp = await fetch(url, request);

    return new Response(resp.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }
    });
  },
};
