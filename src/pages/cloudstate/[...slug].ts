import type { APIRoute } from "astro";
import { cloudStateRequestHandler } from "freestyle-sh";

// in the future this route won't be necessary, but for now it's used to pass
// through client requests to cloudstate methods
export const POST: APIRoute = ({ request }) => {
  return cloudStateRequestHandler(request);
};
