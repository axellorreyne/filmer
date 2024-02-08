import hashlib
import json
import urllib.parse
from base64 import urlsafe_b64encode
from secrets import token_urlsafe

import requests
from rdflib import Graph, Namespace, URIRef

rene_pod = "https://pod.inrupt.com/renevds/profile/card#me"

CLIENT_ID = 'http://filmer.lorreyne.be/api/this'
SOLID_CALLBACK = 'http://filmer.lorreyne.be/solid_callback'


def solidOIDC(pod_url):
    SOLID = Namespace('http://www.w3.org/ns/solid/terms#')

    ME = URIRef(pod_url)

    '''Retrieve profile'''
    profile_graph = Graph()
    profile_graph.parse(pod_url)
    odcissuer = profile_graph.value(ME, SOLID.oidcIssuer)  # Get the oidcIssuer from the graph
    print(odcissuer)

    '''Retrieve OP Configuration'''
    op_config = json.loads(requests.get(odcissuer + '.well-known/openid-configuration').text)
    print(op_config['authorization_endpoint'])
    print(op_config)

    '''Generate PKCE code challenge and code verifier'''
    code_verifier = token_urlsafe(8).encode('utf-8')  # Random string encoded as uft-8
    # code_verifier = "JXPOuToEB7".encode('utf-8') # Example from the docs for testing
    m = hashlib.sha256()  # 6 hasher
    m.update(code_verifier)  # Add random string
    code_challenger = urlsafe_b64encode(m.digest()).decode("utf-8")  # Urlsafe B64 encode
    code_challenger = code_challenger[:-1]  # Remove '=' at end of coode verifier
    print(code_challenger)

    '''Authorization request'''
    auth_url = f'{op_config["authorization_endpoint"]}?' \
               f'response_type=code' \
               f'&redirect_uri={urllib.parse.quote_plus(SOLID_CALLBACK)}' \
               f'&scope=openid%20webid%20offline_access' \
               f'&client_id={urllib.parse.quote_plus(CLIENT_ID)}' \
               f'&code_challenge_method=S256' \
               f'&code_challenge={code_challenger}'

    print(requests.get(auth_url).text)


solidOIDC(rene_pod)
