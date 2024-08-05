- Fix SDK
- Ensure we have lastUpdated date for src
- Only generate docs when new, store result in kv
- For js endpoint: get it by looking at file structure and README and have LLM choose one, then add to kv
- List all kv docs + js at /index.ts
- POC is done if I can safely use https://jsapi.actionschema.com/CodeFromAnywhere/reactify.js in my src code.

# Improvement: find the fastest way to serve CDN, then automate CI/CD to that...

It could still be a KV-API. Not sure if we can serve the endpoints at the same address. Should definitely be as a fallback, not the other way around, therwise it's already slower and might have coldstarts
