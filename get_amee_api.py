import requests
from requests.auth import HTTPBasicAuth
import json

## Global variables:
api_key = '76f715aa0bd101c29c550c11b598f819'
api_secret = '4a1a1d477855bef04543c6d92a22bcef'

## Query AMEE api for companies infog
def get_amee_data(res_limit=100, city='London', min_employees=100):
    '''Returns json data from call to amee api.'''
    url_api = 'http://www.amee.com/api/companies?'
    r, c, e = str(res_limit), '&city=' + city, '&min_employees=' + str(min_employees)
    url = url_api + r + c + e
    r = requests.get(url, auth=HTTPBasicAuth(api_key, api_secret))
    if r.status_code == 200:
        json_data = r.json()
        return json_data
    else:
        print 'Error: status code ', r.status_code

def filter_sustainability(json_data):
    '''Filters data and creates a json dump'''
    d, companies, amee_scores, lat, lon = {}, [], [], [], []
    sustainability_report_url, line_of_business  = [], []
    employees_total = []
    for j in json_data['companies']:
        if j.get('amee_industry_score'):
            companies.append(j.get('name'))
            amee_scores.append(j.get('amee_industry_score'))
            lat.append(j.get('lat'))
            lon.append(j.get('lon'))
            line_of_business.append(j.get('line_of_business'))
            employees_total.append(j.get('employees_total'))
            sustainability_report_url.append(j.get('sustainability_report_url'))
    d['companies'], d['amee_scores'], d['lat'], d['lon'] = companies, amee_scores, lat, lon
    d['sustainability_report_url'] = sustainability_report_url 
    d['line_of_business'], d['employees_total'] = line_of_business, employees_total
    return json.dumps(d)


if __name__ == '__main__':
    d = get_amee_data()
    print filter_sustainability(d)
