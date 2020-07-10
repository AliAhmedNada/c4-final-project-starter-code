// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 't8tdlwr7qj'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-pnsdm3hf.us.auth0.com',            // Auth0 domain
  clientId: 'oSmS4qzJJ4Qj4nv8mTCmOg194oDDqGlT',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
