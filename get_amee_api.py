import requests
from requests.auth import HTTPBasicAuth
import json

## Global variables:
api_key = ''
api_secret = ''


r = requests.get('http://www.amee.com/api/companies?limit=50&city=London&min_employees=1000', auth=HTTPBasicAuth(api_key, api_secret))
r.status_code
