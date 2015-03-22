import requests
from requests.auth import HTTPBasicAuth
import json

## Global variables:
api_key = '76f715aa0bd101c29c550c11b598f819'
api_secret = '4a1a1d477855bef04543c6d92a22bcef'

## Query AMEE api for companies infog
def get_amee_data(res_limit=2000, city='London', min_employees=10):
    '''Returns json data from call to amee api.'''
    url_api = 'http://www.amee.com/api/companies?'
    r, c, e = str(res_limit), '&city=' + city, '&min_employees=' + str(min_employees)
    url = url_api + r + c + e
    r = requests.get(url, auth=HTTPBasicAuth(api_key, api_secret))
    if r.status_code == 200:
        json_data = r.json()
        #with open('data.txt', 'w') as outfile:
            #json.dump(json_data, outfile)
        return json_data
    else:
        print 'Error: status code ', r.status_code

        
def filter_sustainability(json_data):
    '''Filters data and creates a json dump'''
    data = []
    for j in json_data['companies']:
        if j.get('amee_industry_score'):
            data.append({'name' : j.get('name'),
                         'amee_industry_score' : j.get('amee_industry_score'),
                         'line_of_business' : j.get('line_of_business'),
                         'employees_total' : j.get('employees_total'),
                         'sustainability_report_url' : j.get('sustainability_report_url'),
                         'lat' : j.get('lat'),
                         'lon' : j.get('lon')})
    d = {'data' : data}
    return json.dumps(d)

# def filter_emissions(json_data):
#     '''Filters data and creates a json dump'''
#     data = []
#     for j in json_data['companies']:
#         if j.get('waste_hazardous '):
#             data.append({'name' : j.get('name'),
#                          'waste_hazardous ' : j.get('waste_hazardous'),
#                          'line_of_business' : j.get('line_of_business'),
#                          'employees_total' : j.get('employees_total'),
#                          'sustainability_report_url' : j.get('sustainability_report_url'),
#                          'lat' : j.get('lat'),
#                          'lon' : j.get('lon')})
#             d = {'data' : data}
#             return json.dumps(d)


if __name__ == '__main__':
    d = get_amee_data()
    ##print filter_sustainability(d)

