import * as Utils from "../utils/index.js";

const notFound = Utils.Response.response(404, `Endpoint not found on this server`);

export { notFound };
