import * as client from "../../../src/client.js";

export const getPrompt = (repoSrc: string) => `Consider this library:

Please create a documentation that explains everything very explicitly and using some small examples. Strike a great balance between understanding and keeping it short. The documentation should be complete enough for an LLM to use  this library.

${repoSrc}`;

/** Creates docs for an LLM and caches it until the next version appears so that the LLM knows how to use the library. */
export const GET = async (request: Request) => {
  const githubUrl = new URL(request.url).searchParams.get("githubUrl");
  if (!githubUrl) {
    return;
  }

  const chunks = githubUrl.split("/");

  const repo = chunks.pop();
  const user = chunks.pop();

  const repoSrc = (await client.githubReader("read", {
    repo,
    user,
  })) as unknown as string;

  const prompt = getPrompt(repoSrc);

  const docString = (await client.groq("chatCompletion", {
    model: "llama-3.1-70b-versatile",
    messages: [{ role: "user", message: prompt }],
  })) as unknown as string;

  return new Response(docString, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
