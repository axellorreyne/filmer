import { handleIncomingRedirect, login, getDefaultSession } from '@inrupt/solid-client-authn-browser'

class SolidAuthService {

  async login(url) {
    await handleIncomingRedirect();

    url = url.split('/')

    // 2. Start the Login Process if not already logged in.
    if (!getDefaultSession().info.isLoggedIn) {
      // The `login()` redirects the user to their identity provider;
      // i.e., moves the user away from the current page.
      await login({
        // Specify the URL of the user's Solid Identity Provider; e.g., "https://broker.pod.inrupt.com" or "https://inrupt.net"
        oidcIssuer: url[0] + "//" + url[2],
        // Specify the URL the Solid Identity Provider should redirect to after the user logs in,
        // e.g., the current page for a single-page app.
        redirectUrl: window.location.protocol + '//' + window.location.host + '/home',
        // Pick an application name that will be shown when asked
        // to approve the application's access to the requested data.
        clientName: "Filmer"
      });
    }
  }

}

export default new SolidAuthService();