import requests
import json
import os
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv

def main():
  url = "https://api.third_party_site.com/oauth/v2/token"
  clientId = os.getenv('third_party_site_CLIENTID')
  secret = os.getenv('third_party_site_SECRET')
  parameters={
    'grant_type': 'client_credentials'
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  response = requests.request("POST", url, headers=headers,auth=HTTPBasicAuth(clientId,secret),data=parameters)

  return response.json()['access_token']

def v1_token():
  url = "https://api.third_party_site.com/analytics/work/v1/oauth/token"

  payload = {
    "username": os.getenv("third_party_site_USERNAME"),
    "password": os.getenv("third_party_site_PASSWORD")
  }
  headers = {
    "accept": "application/json",
    "content-type": "application/x-www-form-urlencoded",
    "third_party_site-apikey": os.getenv("third_party_site_CLIENTID")
  }

  response = requests.post(url, data=payload, headers=headers)
  return response.json()['access_token']

if __name__=="__main__":
  v1_token()
