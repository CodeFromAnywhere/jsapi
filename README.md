This api exposes .js files over CDN, coming from a public repo. It might not be as fast as [cdnjs](https://cdnjs.com) yet, but at least the API is userfriendly and it's easy to register your own repo and serve your library over a CDN.

How it works:

- Get CDN-served js of any public repo: https://jsapi.actionschema.com/[github-user]/[repo] ([example](public/CodeFromAnywhere/reactify.js/index.js))
- Get LLM-generated docs of any public repo: https://jsapi.actionschema.com/[github-user]/[repo]/docs.md ([example](public/CodeFromAnywhere/reactify.js/docs.md))
