import requests
from requests.auth import HTTPBasicAuth
import json

from datetime import datetime

## Global variables:
api_key = '76f715aa0bd101c29c550c11b598f819'
api_secret = '4a1a1d477855bef04543c6d92a22bcef'

## Query AMEE api for companies info:
def get_amee_data(res_limit=2000, min_employees=10):
    '''Returns json data from call to amee api.'''
    url_api = 'http://www.amee.com/api/companies?'
    r, e = str(res_limit), '&min_employees=' + str(min_employees)
    url = url_api + r + e
    r = requests.get(url, auth=HTTPBasicAuth(api_key, api_secret))
    if r.status_code == 200:
        json_data = r.json()
        return json_data
    else:
        print 'Error: status code ', r.status_code


def get_sustainability_data(json_data):
    '''Filters data and creates a json dump'''
    data = []
    f = "%Y-%m-%d_%H:%M:%S"
    for j in json_data['companies']:
        if j.get('amee_industry_score'):
            data.append({'name' : j.get('name'),
                         'city' : j.get('city'),
                         'amee_industry_score' : j.get('amee_industry_score'),
                         'line_of_business' : j.get('line_of_business'),
                         'employees_total' : j.get('employees_total'),
                         'sustainability_report_url' : j.get('sustainability_report_url'),
                         'coord': (j.get('lat'), j.get('lon')),
                         'lat' : j.get('lat'),
                         'lon' : j.get('lon')})
        d = {'datetime': datetime.now().strftime(f),  
             'data': data}
    return json.dumps(d)

if __name__ == '__main__':
    d = get_amee_data()
    print get_sustainability_data(d)

